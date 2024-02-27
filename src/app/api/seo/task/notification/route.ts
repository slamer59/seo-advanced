import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = new URL(request.nextUrl).searchParams;
    console.log("🚀 ~ GET ~ searchParams:", searchParams)

    const id = searchParams.get("id");
    const tag = searchParams.get("tag");

    console.log("🚀 ~ GET ~ id & tag:", id, tag)

    if (!id) {
        return NextResponse.json({
            status: 400,
            body: { message: 'empty GET' }
        });
    }

    try {
        const token = btoa(`${process.env.DATA_FOR_SEO_LOGIN}:${process.env.DATA_FOR_SEO_PASS}`)

        const response = await fetch(`https://api.dataforseo.com/v3/on_page/links`, {
            headers: {
                'Authorization': 'Basic ' + token,
            },
            method: "POST",
            body: JSON.stringify([
                {
                    "id": id,
                    // "page_from": "/apis/google-trends-api",
                    // "filters": [
                    //     ["dofollow", "=", true],
                    //     "and",
                    //     ["direction", "=", "external"]
                    // ],
                    "limit": 10
                }
            ])
        });

        const data = await response.json();
        console.log("🚀 ~ GET ~ data:", data)
        console.log("🚀 ~ GET ~ data:", data.tasks[0].result[0])

        if (response.ok && data.status_code === 20000) {
            // do something with results
            return NextResponse.json({
                status: 200,
                body: { message: 'ok' }
            });
        } else {
            return NextResponse.json({
                status: 500,
                body: { message: 'error' }
            });
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: { message: error.toString() }
        });
    }
}
