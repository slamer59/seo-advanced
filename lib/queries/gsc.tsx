// @ts-nocheck

import prisma from "./prisma";

export async function getGSCKPIsBySlug(slug: string) {

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await (prisma.post.findMany({
            where: {
                url: {
                    url: {
                        contains: slug
                    }
                }
            },
            include: {
                gscKPIs: true
            }
        }) as any[]);
        return data[0] || {
            gscKPIs: undefined
        }
    } catch (e) {
        console.error(e);
    }
}