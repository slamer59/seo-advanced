// @ts-nocheck

import prisma from "./prisma";

export async function getGSCKPIsBySlug(slug: string) {

    try {
        const data = await prisma.post.findUnique(
            { where: { url: { contains: slug } } }
        )
        console.log("🚀 ~ getGSCKPIsBySlug ~ data:", data)
        return data;
    } catch (e) {
        console.error(e);
    }
}