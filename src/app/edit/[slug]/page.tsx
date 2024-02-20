// @ts-nocheck

// import { STOREFRONT_NAME } from "@/lib/const";
import { PlateEditor } from "@/components/plate-editor";
import {
    getBlocks,
    getPageFromSlug
} from 'lib/notion';
import { urlToAltText } from 'lib/util';

export default async function Page({ params }) {
    const page = await getPageFromSlug(params?.slug);
    const blocks = await getBlocks(page?.id);

    // const siblingPages = await getSibblingsPublished(page);

    if (!page || !blocks) {
        return <div />;
    }
    let heroImage =
        page?.cover?.type === 'external'
            ? page?.cover.external.url
            : page?.cover?.file?.url;

    let alt = 'Someone installing a solar panel on a roof';

    if (heroImage) {
        alt = urlToAltText(heroImage);
    } else {
        heroImage =
            'https://saleor-assets.jokosun.biz/file/saleor-assets/_next/static/media/jokosun_-pierre-de-lisse_dec2022-146-h640-w640.webp';
    }
    // const bluredHeroDataUrl = await getBase64(heroImage);
    let lastmod = Date.parse(page.properties?.Updated.last_edited_time);

    if (!Number.isNaN(lastmod)) {
        lastmod = new Date(lastmod);
    } else {
        lastmod = new Date();
    }
    lastmod = lastmod.toLocaleString('fr-FR', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });

    let lastpub = Date.parse(page.properties.Published.date.start);

    if (!Number.isNaN(lastpub)) {
        lastpub = new Date(lastpub);
    } else {
        lastpub = new Date();
    }
    lastpub = lastpub.toLocaleString('fr-FR', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });


    // Editor initial content n2m
    // const mdblocks = await n2m.pageToMarkdown("688502396bb244158767108811193fba")
    // console.log("🚀 ~ Page ~ mdblocks:", mdblocks)
    // const slateBlocks = mdblocks.map((block) => {
    //     return {
    //         type: "paragraph",
    //         children: [{
    //             text: block.parent
    //         }]
    //     }
    // })

    // Editor initial from Notion API 
    console.log("🚀 ~ page:", page)
    console.log("🚀 ~ Page ~ blocks:", blocks)
    console.log("🚀 ~ Page ~ [block]:", blocks[0])
    // const renderElement = (block) => {
    //     return <Fragment key={block.id}>
    //         {renderBlock(block)}
    //     </Fragment>
    // }



    return (
        <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">

            <PlateEditor initialValue={[blocks[0]]} />

        </section>
    );
}

