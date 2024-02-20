import { BlogPostCard, renderBlock } from '@/components/Notion';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function Article(heroImage: any, alt: string, bluredHeroDataUrl: any, page: {}, lastpub: number, lastmod: number, blocks: any, siblingPages: any[] | null) {
    return <article>
        <section className="container bg-white border-gray-200" key={uuidv4()}>
            {blocks.map((block) => (
                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
        </section>
        {siblingPages && (
            <section
                className="container mt-10 border-t border-dashed dark:border-gray-400"
                key={uuidv4()}
            >
                <h2 className="my-5 text-4xl font-bold text-primary">
                    Articles Similaires
                </h2>
                <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-3 ">
                    {siblingPages.map((post) => (
                        <BlogPostCard key={uuidv4()} post={post} />
                    ))}
                </div>
            </section>
        )}
    </article>;
}

