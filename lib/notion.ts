// @ts-nocheck
import { Client } from "@notionhq/client";
import { cache } from "react";

export const revalidate = 3600; // revalidate the data at most every hour

const databaseId = process.env.NOTION_BLOG_DATABASE_ID;


export default async function paginateCall(call, params) {
  let startCursor;
  const results = []; // Initialize result as an empty array
  do {
    const callResult = await call({
      ...params,
      start_cursor: startCursor
    });
    startCursor = callResult.next_cursor;
    results.push(...callResult.results);
  } while (startCursor !== null);
  return { results }
}

/**
 * Returns a random integer between the specified values, inclusive.
 * The value is no lower than `min`, and is less than or equal to `max`.
 *
 * @param {number} minimum - The smallest integer value that can be returned, inclusive.
 * @param {number} maximum - The largest integer value that can be returned, inclusive.
 * @returns {number} - A random integer between `min` and `max`, inclusive.
 */
function getRandomInt(minimum: number, maximum: number) {
  const min = Math.ceil(minimum);
  const max = Math.floor(maximum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const getDatabasePublished = cache(async () => {
  const dateBefore = new Date().toISOString()
  const response = await paginateCall(notion.databases.query, {
    database_id: databaseId as string,
    // https://developers.notion.com/reference/post-database-query-filter
    filter: {
      and: [
        {
          property: "Public",
          checkbox: {
            equals: true
          },
        },
        {
          property: "Published",
          date: {
            on_or_before: dateBefore,
          },
        }
      ]
    }
  })
  return response.results;
})

export const getDatabase = cache(async () => {
  const response = await paginateCall(notion.databases.query, {
    database_id: databaseId as string
  })
  return response.results;
})
// export const queryChildDatabase = cache(async (childDatabaseId) => {
//   try {
//     const response = await notion.databases.query({
//       database_id: childDatabaseId,
//     });

//     // The response contains the data from the child database
//     const results = response.results;
//     for (const page of results) {
//       // You can access the properties of each page in the child database
//       console.log('Page Title:', page.properties.Name.title[0].plain_text);
//       console.log('Other Properties:', page.properties); // Access other properties as needed
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// });

export const getPage = cache(async (pageId: any) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
});

export const getPageFromSlug = cache(async (slug: any) => {
  const response = await notion.databases.query({
    database_id: databaseId as string,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });
  if (response?.results?.length) {
    return response?.results?.[0];
  }
  return {};
});

// @ts-ignore
export const getBlocks = cache(async (blockID: string) => {
  const blockId = blockID.replaceAll("-", "");

  const { results } = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });

  // Fetches all child blocks recursively
  // be mindful of rate limits if you have large amounts of nested blocks
  // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = results.map(async (block) => {
    if (block.has_children) {
      const children = await getBlocks(block.id);
      return { ...block, children };
    }
    return block;
  });

  return Promise.all(childBlocks).then((blocks) => blocks.reduce((acc, curr) => {
    if (curr.type === "bulleted_list_item") {
      if (acc[acc.length - 1]?.type === "bulleted_list") {
        acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
      } else {
        acc.push({
          id: getRandomInt(10 ** 99, 10 ** 100).toString(),
          type: "bulleted_list",
          bulleted_list: { children: [curr] },
        });
      }
    } else if (curr.type === "numbered_list_item") {
      if (acc[acc.length - 1]?.type === "numbered_list") {
        acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
      } else {
        acc.push({
          id: getRandomInt(10 ** 99, 10 ** 100).toString(),
          type: "numbered_list",
          numbered_list: { children: [curr] },
        });
      }
    } else {
      acc.push(curr);
    }
    return acc;
  }, []));
});

function traverseJSON(data: any[], subItemKey = "Pages Filles") {
  const siblings = {};

  function traverse(item: { properties: { [x: string]: { relation: any[]; }; }; id: string | number; }) {
    if (
      item.properties
      && item.properties[subItemKey]
      && item.properties[subItemKey].relation
    ) {
      const childIds = item.properties[subItemKey].relation.map(
        (child: { id: any; }) => child.id,
      );
      siblings[item.id] = childIds;
      item.properties[subItemKey].relation.forEach((child: any) => {
        traverse(child);
      });
    }
  }
  data.forEach((item: any) => {
    traverse(item);
  });

  return siblings;
}

export const getSibblings = cache(async (page: { properties: { [x: string]: { relation: { id: any; }[]; }; }; }) => {
  if (page.properties?.["Page Mere"]?.relation && page.properties["Page Mere"].relation.length > 0) {
    const parentPageId = page.properties["Page Mere"].relation[0].id;
    const data = await getDatabase();
    // date titre / image
    // created_time: '2023-10-25T18:24:00.000Z',
    // last_edited_time: '2023-10-26T07:54:00.000Z',
    // created_by: { object: 'user', id: 'eb623ab7-a530-4b7d-868f-b86f89bc7e25' },
    // last_edited_by: { object: 'user', id: 'eb623ab7-a530-4b7d-868f-b86f89bc7e25' },
    // properties.Date
    // properties["Page principale"]
    // cover: null,
    // icon: null,
    // console.log("data", data.map((d) => { return d.id }))
    const siblings = traverseJSON(data);
    // console.log("sibling", siblings, parentPageId)
    const properties = data.filter((sib) => siblings[parentPageId].includes(sib.id));
    return properties
  }
  return null
});

export const getSibblingsPublished = cache(async (page: { properties: { [x: string]: { relation: { id: any; }[]; }; }; }) => {
  const siblingPages = await getSibblings(page)

  if (siblingPages) {
    const dateBefore = new Date().toISOString()
    const filteredSiblingPages = siblingPages.filter(p => p.properties.Public.checkbox === true && p.properties.Published && p.properties.Published.date && p.properties.Published.date.start && new Date(p.properties.Published.date.start) < new Date(dateBefore));
    return filteredSiblingPages
  }
  return null
})
