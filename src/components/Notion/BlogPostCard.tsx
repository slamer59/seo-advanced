import Image from "next/image";
import Link from "next/link";

import Text from "@/components/Notion/Text";
import { urlToAltText } from "lib/util";

export async function BlogPostCard({ post }: { post: any }) {
    const { properties, last_edited_time, cover } = post;
    const date = new Date(last_edited_time).toLocaleString(
        "fr-FR",
        {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }
    );
    const slug = properties?.Slug?.rich_text[0].text.content;
    const src = cover?.type === "external" ? cover.external.url : cover?.file?.url || "https://saleor-assets.jokosun.biz/file/saleor-assets/_next/static/media/jokosun_-pierre-de-lisse_dec2022-146-h640-w640.webp";
    const alt = src ? urlToAltText(src) : "Someone installing a solar panel on a roof";

    /**
     * Return JSX content
     */
    const characterLimit = 100; // Set the character limit
    const truncatedContent = properties?.Description.rich_text.map((item: { text: { content: string; }; }) => ({ ...item, text: { ...item.text, content: item.text?.content.length > characterLimit ? `${item.text.content.substring(0, characterLimit)}...` : item.text.content } }));

    const bluredDataUrl = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcd1DmPwAGfAKcfyer6gAAAABJRU5ErkJggg==" // await getBase64(src)
    return (
        <Link
            className="max-w-lg mx-auto mb-5 bg-white border rounded-lg shadow-md hover:shadow-xl hover:scale-105"
            href={`/blog/${slug}`}
        >
            <Image
                className="transition duration-500 rounded-lg"
                src={src}
                alt={alt}
                width={300}
                height={150}
                placeholder="blur"
                blurDataURL={`data:image/png;base64,${bluredDataUrl}`}
                priority
            />

            <div className="p-5 m-2">
                <h3 className="mt-0 mb-3 text-2xl font-bold tracking-tight hover:underline text-primary hover:text-secondary">
                    <Text title={properties["Page principale"]?.title} />
                </h3>
                <p className="m-1 text-sm italic">{date}</p>
                <p className="p-1 font-normal opacity-70"><Text title={truncatedContent} /></p>
                <span className="justify-center inline-block px-2 mt-3 text-center align-middle rounded-full cursor-pointer md:mt-0 mt font-IBM bg-secondary text-primary border-secondary hover:text-white hover:bg-primary">
                    Continuer la lecture
                </span>
            </div>

        </Link>
    )
}

export default BlogPostCard;
