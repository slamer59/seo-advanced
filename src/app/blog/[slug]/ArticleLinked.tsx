import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

export function ArticleLinked({ siblingPages, className }: { siblingPages: any[], className?: string }) {

    /**
     * Return JSX content
     */
    return (
        <section
            className={`container dark:border-gray-400 ${className} top-0`}
            key={uuidv4()}
        >
            <h2 className="text-2xl font-bold text-primary">
                Articles Similaires
            </h2>
            <ol className="list-disc">
                {siblingPages.map((post) => (
                    <Link
                        key={post.id}
                        className="text-primary"
                        href={`/blog/${post.properties?.Slug?.rich_text[0].text.content}`}
                    >
                        <li className="">
                            {post.properties["Page principale"]?.title[0].text.content}
                        </li>
                    </Link>))}
            </ol>
        </section>
    )
}
