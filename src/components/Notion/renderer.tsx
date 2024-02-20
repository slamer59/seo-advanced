// @ts-nocheck
import Link from 'next/link';
import { NotionToMarkdown } from 'notion-to-md';
import { Fragment } from 'react';

import NotionBlogButton from '@/components/Notion/NotionBlogButton';
import Text from '@/components/Notion/Text';
import { notion } from 'lib/notion';

// import CTAForm from "./CTAForm";
// import { HowTo } from "./HowTo";
// import ModalComponent from "./Modal";

// https://www.npmjs.com/package/notion-to-md
export const n2m = new NotionToMarkdown({ notionClient: notion });
n2m.setCustomTransformer('embed', async (block: any) => {
  const { embed } = block;
  if (!embed?.url) return '';
  return `<figure class="flex justify-center">
  <iframe src="${embed?.url}"></iframe>
  <figcaption>${await n2m.blockToMarkdown(embed?.caption)}</figcaption>
</figure>`;
});

export async function renderBlock(block: any) {
  const { type, id } = block;

  const value = block[type];

  const headingClasses = 'my-5 font-bold text-primary';

  switch (type) {
    case 'paragraph':
      return (
        <p className="p-2">
          <Text title={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h2 className={`${headingClasses} text-4xl`}>
          <Text title={value.rich_text} />
        </h2>
      );
    case 'heading_2':
      return (
        <h3 className={`${headingClasses} text-3xl`}>
          <Text title={value.rich_text} />
        </h3>
      );
    case 'heading_3':
      return (
        <h4 className={headingClasses}>
          <Text title={value.rich_text} />
        </h4>
      );
    case 'bulleted_list': {
      return (
        <ul className="container list-disc list-inside">
          {value.children.map((child: any) => renderBlock(child))}
        </ul>
      );
    }
    case 'numbered_list': {
      return (
        <ol className="container list-decimal list-inside">
          {value.children.map((child: any) => renderBlock(child))}
        </ol>
      );
    }
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li key={block.id}>
          <Text title={value.rich_text} />
          {/* eslint-disable-next-line no-use-before-define */}
          {!!value.children && renderNestedList(block)}
        </li>
      );
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            <Text title={value.rich_text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <Text title={value.rich_text} />
          </summary>
          {block.children?.map((child) => (
            <Fragment key={child.id}>{renderBlock(child)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return (
        <div className="{styles.childPage}">
          <strong>{value?.title}</strong>
          {block.children.map((child) => renderBlock(child))}
        </div>
      );
    case 'image': {
      const src =
        value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : '';
      const href = value.caption ? value.caption[0]?.href : '';
      return (
        <div className="flex justify-center">
          <figure className="max-w-md">
            <img src={src} alt={caption} />
            {caption && (
              <figcaption className="flex justify-center italic font-bold">
                {href ? ( // Check if href is not empty
                  <Link
                    href={href}
                    passHref
                    className="relative border-b-[0.1rem] bg-[50%_100%] bg-no-repeat bg-origin-border font-bold text-primary opacity-100 transition-[unset] hover:text-secondary"
                  >
                    {caption}
                  </Link>
                ) : (
                  <>{caption}</>
                )}
              </figcaption>
            )}
          </figure>
        </div>
      );
    }
    case 'divider':
      return <hr key={id} />;
    case 'quote':
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;
    case 'code':
      const { language } = value;

      switch (language) {
        case 'abap':
          return '<ModalComponent>';
        //   <CTAForm />
        // </ModalComponent>
        case 'json':
          const data = JSON.parse(value.rich_text[0].plain_text);
          return 'HowTo';
        //   (
        //   <>
        //     {(data["@type"] !== "FAQPage") && <HowTo howToData={data} />}
        //     {(data["@type"] === "FAQPage") &&
        //       <>
        //         {data.mainEntity.map((faq) => (
        //           <FAQ title={faq.name} content={faq.acceptedAnswer.text} className="text-3xl font-bold text-primary" key={uuidv4()} />
        //         ))}
        //       </>
        //     }

        //     <Script
        //       id="app-ld-json"
        //       type="application/ld+json"
        //       dangerouslySetInnerHTML={{
        //         __html: value.rich_text[0].plain_text,
        //       }}
        //     />
        //   </>
        // )
        case 'agda':
          const { type, text, href } = JSON.parse(
            value.rich_text[0].plain_text
          );
          return <NotionBlogButton type={type} text={text} href={href} />;
        default:
          break;
      }
      return (
        <pre className="{styles.pre}">
          <code className="{styles.code_block}" key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case 'file': {
      const srcFile =
        value.type === 'external' ? value.external.url : value.file.url;
      const splitSourceArray = srcFile.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const captionFile = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <div className="{styles.file}">
            📎{' '}
            <Link href={srcFile} passHref>
              {lastElementInArray.split('?')[0]}
            </Link>
          </div>
          {captionFile && <figcaption>{captionFile}</figcaption>}
        </figure>
      );
    }
    case 'bookmark': {
      const href = value.url;
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="relative border-b-[0.1rem] bg-[50%_100%] bg-no-repeat bg-origin-border font-bold text-primary opacity-100 transition-[unset] hover:text-secondary"
        >
          {href}
        </a>
      );
    }
    case 'table': {
      return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full table-auto">
            {block.children
              ?.filter(
                (child, index) => !!(value.has_column_header && index === 0)
              )
              .map((child, index) => {
                const RowElement = 'th';
                return (
                  <thead key={`thead-${index}`}>
                    <tr className="text-lg bg-gray-200 text-primary">
                      {child.table_row?.cells?.map((cell, i) => (
                        <RowElement
                          scope="col"
                          className="p-2"
                          key={`${cell.plain_text}-${i}`}
                        >
                          <Text title={cell} />
                        </RowElement>
                      ))}
                    </tr>
                  </thead>
                );
              })}
            <tbody>
              {block.children?.map((child, index) => {
                const RowElement =
                  value.has_column_header && index === 0 ? 'th' : 'td';
                return (
                  <>
                    {value.has_column_header && index === 0 ? null : (
                      <tr
                        className="odd:bg-white even:bg-gray-100"
                        key={`${index}`}
                      >
                        {child.table_row?.cells?.map((cell, i) => (
                          <RowElement
                            scope="row"
                            className="p-2 italic"
                            key={`${cell.plain_text}-${i}`}
                          >
                            <Text title={cell} />
                          </RowElement>
                        ))}
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    case 'column_list': {
      return (
        <div className="{styles.row}">
          {block.children.map((childBlock: any) => renderBlock(childBlock))}
        </div>
      );
    }
    case 'column': {
      return <div>{block.children.map((child) => renderBlock(child))}</div>;
    }
    case 'embed': {
      const result = await n2m.blockToMarkdown(block);
      return <div dangerouslySetInnerHTML={{ __html: result }} />;
    }
    case 'child_database': {
      //   console.log(type, "❌ Unsupported block")
      //   // const result = await n2m.blockToMarkdown(block);
      //   // console.log("result", result)
      return '';
    }
    case 'callout': {
      const icon = block.callout.icon.emoji;
      const content = block.callout.rich_text;
      const children = block?.children;
      return (
        <div className="box-border inline-flex items-center w-full p-4 m-2 border border-solid rounded-lg border-secondary-300 bg-amber-50">
          <div className="self-start text-lg leading-3 flex-start size-6">
            {icon}
          </div>
          <div className="">
            <Text title={content} />
            {children?.map((child) => renderBlock(child))}
          </div>
        </div>
      );
    }
    case 'text': {
      return <div>{block.text?.content}</div>;
    }
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
