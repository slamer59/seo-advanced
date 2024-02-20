import Text from '@/components/Notion/Text';
import Image from 'next/image';

export async function ArticleHeader({ heroImage, alt, bluredHeroDataUrl, page, lastpub, lastmod }:
    { heroImage: any, alt: string, bluredHeroDataUrl: any, page: any, lastpub: number, lastmod: number }
) {
    return <header className="relative flex items-center justify-center w-full overflow-hidden bg-black h-96">
        {heroImage && (
            <Image
                fetchPriority="high"
                loading="eager"
                decoding="async"
                data-nimg="fill"
                src={heroImage}
                alt={alt}
                className="opacity-70"
                // sizes={sizes}
                // srcset={imagesrcset}
                width={400}
                height={400}
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    inset: '0px',
                    objectFit: 'cover',
                    color: 'transparent',
                }}
                placeholder="blur"
                blurDataURL={`data:image/png;base64,${bluredHeroDataUrl}`}
                priority />
        )}
        <div className="flex flex-col items-center justify-center px-3">
            <div className="text-base italic font-bold leading-6 text-white opacity-90 ">
                Auteur : <Text title={page.properties.Author.rich_text} />
            </div>
            <div className="text-base italic font-bold leading-6 text-white opacity-90">
                Publiée : {lastpub}
            </div>
            <div className="text-base italic font-bold leading-6 text-white opacity-90">
                Mise à jour : {lastmod}
            </div>
            <h1 className="block mt-5 overflow-hidden text-5xl font-extrabold text-center text-white opacity-90">
                <Text title={page.properties['Page principale']?.title} />
            </h1>
            {/* <Button href="/">Get Started</Button> */}
        </div>
    </header>;
}
