// @ts-nocheck
import { NotionToMarkdown } from 'notion-to-md';

import { notion } from 'lib/notion';

export const n2m = new NotionToMarkdown({ notionClient: notion });
n2m.setCustomTransformer('embed', async (block: any) => {
  const { embed } = block;
  if (!embed?.url) return '';
  return `<figure class="flex justify-center">
  <iframe src="${embed?.url}"></iframe>
  <figcaption>${await n2m.blockToMarkdown(embed?.caption)}</figcaption>
</figure>`;
});

export async function renderNotionToPlateBlock(block: any) {
  const { type, id } = block;

  const value = block[type];

  switch (type) {
    case 'paragraph':
      return "paragraph";
    case 'heading_1':
      return "heading_1";
    case 'heading_2':
      return "heading_2";
    case 'heading_3':
      return "heading_3";
    case 'bulleted_list': {
      return "bulleted_list";
      // <ul className="container list-disc list-inside">
      //   {value.children.map((child: any) => renderBlock(child))}
      // </ul>
      // );
    }
    case 'numbered_list': {
      return "numbered_list";
    }
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return "numbered_list_item";
    //<li key={block.id}>
    //  <Text title={value.rich_text} />
    //  {/* eslint-disable-next-line no-use-before-define */}
    //  {!!value.children && renderNestedList(block)}
    //</li>
    case 'to_do':
      return "to_do";
    case 'toggle':
      return "toggle";
    case 'child_page':
      return "child_page";
    case 'image':
      return "image";

    case 'divider':
      return "divider";
    case 'quote':
      return "quote";
    case 'code':
      const { language } = value;

      switch (language) {
        case 'abap':
          return 'ABAP';
        case 'json':
          return 'HowTo';
        case 'agda':
          return 'Agda';
        default:
          break;
      }
      return "code";
    case 'file':
      return "file";
    case 'bookmark':
      return "bookmark";
    case 'table':
      return "table";
    case 'column_list':
      return "column_list";
    case 'column':
      return "column";
    case 'embed':
      return "embed";
    case 'child_database': {
      return "child_database";
    }
    case 'callout':
      return "callout";
    case 'text':
      return "text";
    default:
      return `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type
        })`;
  }
}

export function renderNestedList(blocks) {
  const { type } = blocks;
  const value = blocks[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item';

  if (isNumberedList) {
    return (
      <ol className="container list-decimal list-inside">
        {' '}
        {value.children.map((block: any) => renderBlock(block))}
      </ol>
    );
  }
  return (
    <ul className="container list-disc list-inside">
      {value.children.map((block: any) => renderBlock(block))}
    </ul>
  );
}
