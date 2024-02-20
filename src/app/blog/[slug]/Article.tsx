import { renderBlock } from '@/components/Notion';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function Article({ blocks, className }: { blocks: any[], className?: string }) {
    return <article className={className}>
        <section className="container bg-white border-gray-200" key={uuidv4()}>
            {blocks.map((block) => (
                <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
        </section>
    </article>;
}

