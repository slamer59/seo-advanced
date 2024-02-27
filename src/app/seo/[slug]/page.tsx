// @ts-nocheck

// import { STOREFRONT_NAME } from "@/lib/const";

export default async function Page({ params }) {
    // const page = await getPageFromSlug(params?.slug);
    const results = [
        { id: 1, name: "Result 1" },
        { id: 2, name: "Result 2" },
        // Add more results as needed
    ];

    async function createTask(formData: FormData) {
        // https://docs.dataforseo.com/v3/on_page/task_post/?bash
        "use server"

        const post_array = [{
            "target": `https://www.jokosun.com/blog/${formData.get("target")}`,
            "max_crawl_pages": 1,
            "load_resources": true,
            "enable_javascript": true,
            // "custom_js": "",
            "tag": "ecommerce",
            "pingback_url": `https://seo-analytics.loca.lt/api/seo/task/notification?id=$id&tag=$tag`,
        }]
        const token = btoa(`${process.env.DATA_FOR_SEO_LOGIN}:${process.env.DATA_FOR_SEO_PASS}`)

        const response = await fetch("https://api.dataforseo.com/v3/on_page/task_post", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post_array)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🚀 ~ createTask ~ data:", data)

        // mutate data
        // revalidate cache
        return data;
    }

    return (
        <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10" >
            {params.slug}
            < div >
                <form
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    method="POST"
                    action={createTask}
                >
                    {/* <label for="target">Who do you want to say it to?</label> */}
                    <input className="hidden" name="target" id="target" value={params.slug} />
                    <button type="submit">
                        Run task_post
                    </button>

                </form>

                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                            <tr key={result.id}>
                                <td className="border px-4 py-2">{result.id}</td>
                                <td className="border px-4 py-2">{result.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </section >
    );
}

