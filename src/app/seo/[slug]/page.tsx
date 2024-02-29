// @ts-nocheck
// import { STOREFRONT_NAME } from "@/lib/const";
import SemanticPerfoChart from "@/components/semantic-perfo-chart";
import SERPComponent from "@/components/top10-serp-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { PlateEditor } from "@/components/plate-editor";


export default async function Page({ params }) {
    // const page = await getPageFromSlug(params?.slug);
    const results = [
        { id: 1, name: "Result 1" },
        { id: 2, name: "Result 2" },
        // Add more results as needed
    ];

    // Serp Data 
    const serpData = [
        { position: 1, url: 'https://allo.solar', seoScore: 90 },
        { position: 2, url: 'https://installation.energies.carrefour.fr', seoScore: 85 },
        { position: 3, url: 'https://mypower.engie.fr/', seoScore: 80 },
        { position: 4, url: "https://solu-sun.fr/", seoScore: 90 },
        { position: 5, url: "https://www.chocdiscount.com/", seoScore: 90 },
        { position: 6, url: "https://www.economie.gouv.fr/", seoScore: 90 },
        { position: 7, url: "https://www.edfenr.com/", seoScore: 90 },
        { position: 8, url: "https://www.effy.fr/", seoScore: 90 },
        { position: 9, url: "https://www.lenergietoutcompris.fr/", seoScore: 90 },
        { position: 10, url: "https://www.monkitsolaire.fr/", seoScore: 90 },
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


    // Performance data
    const pagePerfs = {
        seoScore: 90,
        semanticScore: 90,
        wordCount: 1000,
        keyword: "panneau solaire",
        keywordDifficulty: 40,
        keywordVolume: 10000,
    }

    // Editor data 
    const initialValue = [
        {
            id: '1',
            type: 'p',
            children: [{ text: 'Hello, World!' }],
        },
        {
            id: '2',
            type: 'p',
            children: [{ text: 'This is another paragraph.' }],
        },
        {
            id: '3',
            type: 'p',
            children: [{ text: 'This is another paragraph.' }],
        }
    ];

    return (
        <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10" >
            {params.slug}
            < div >
                <form
                    method="POST"
                    action={createTask}
                >
                    {/* <label for="target">Who do you want to say it to?</label> */}
                    <input className="hidden" name="target" id="target" value={params.slug} />
                    <Button type="submit">
                        Run task_post
                    </Button>

                </form>
                <div className="bg-white p-8">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 m-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-medium capitalize"
                                >
                                    Seo Score
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-4xl">
                                10
                            </CardContent>
                        </Card >
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-medium capitalize"
                                >
                                    Word Count
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-4xl">
                                1045
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-medium capitalize"
                                >
                                    Keyword
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="col-span-3 italic">
                                        Panneau solaire
                                    </div>
                                    <div className="text-md font-medium capitalize col-span-2"
                                    >
                                        Difficulty
                                    </div>
                                    <div>
                                        40
                                    </div>
                                    <div className="text-md font-medium capitalize col-span-2"
                                    >
                                        Volume
                                    </div>
                                    <div>
                                        10k
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <SemanticPerfoChart />


                    <div className="border border-red-500 p-4 mb-4">
                        <h2 className="text-red-500 font-bold text-xl mb-2">Edition</h2>
                        {/* <PlateEditor initialValue={initialValue} /> */}
                        <div className="border border-red-500 p-2">
                            <p className="text-red-500">Some editor</p>
                        </div>
                    </div>

                    <div className="border border-red-500 p-4 mb-4">
                        <h2 className="text-red-500 font-bold text-xl mb-2">TOP 10 SERP</h2>
                        <SERPComponent serpData={serpData} />

                    </div>

                    <div className="border border-red-500 p-4 mb-4">
                        <h2 className="text-red-500 font-bold text-xl mb-2">CopyRank FR</h2>
                        <div className="border border-red-500 p-2">
                            <p className="text-red-500">Conciliscope</p>
                        </div>
                    </div>

                    <div className="border border-red-500 p-4 mb-4">
                        <h2 className="text-red-500 font-bold text-xl mb-2">Suggestion d'optimisation liens</h2>
                    </div>
                </div>

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

