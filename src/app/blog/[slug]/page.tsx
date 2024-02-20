// @ts-nocheck

// import { STOREFRONT_NAME } from "@/lib/const";
import getBase64 from 'lib/getLocalBase64';
import {
    getBlocks,
    getPageFromSlug,
    getSibblingsPublished
} from 'lib/notion';
import { urlToAltText } from 'lib/util';
// import Hero from "@/components/Notion/Hero";
import { SEOKPICard } from '@/components/seokpicard';
import { Article } from './Article';
import { ArticleHeader } from './ArticleHeader';


export default async function Page({ params }) {
    const page = await getPageFromSlug(params?.slug);
    const blocks = await getBlocks(page?.id);
    const siblingPages = await getSibblingsPublished(page);

    if (!page || !blocks) {
        return <div />;
    }
    // const cdnUrl = process.env.NEXT_PUBLIC_IMAGE_CDN!;
    // const srcSet = [640, 750, 828, 1080, 1920]
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
    const bluredHeroDataUrl = await getBase64(heroImage);

    /**
     * Return JSX content
     */

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

    return (
        <>
            <ArticleHeader
                heroImage={heroImage}
                alt={alt}
                bluredHeroDataUrl={bluredHeroDataUrl}
                page={page}
                lastpub={lastpub}
                lastmod={lastmod}
            />

            <div className="flex flex-col items-center justify-center w-full h-full rounded-md m-4">
                <SEOKPICard />
            </div>
            {Article(heroImage, alt, bluredHeroDataUrl, page, lastpub, lastmod, blocks, siblingPages)}
        </>
    );
}

