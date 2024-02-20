// // seed.ts

// const accountSeed = await prisma.$executeRawUnsafe(`
//   COPY "accounts"(id, name, bank)
//   FROM ${accountSeedFile}
//   DELIMITER ','
//   CSV HEADER;
// `);


import { PrismaClient } from "@prisma/client";
import csv from "csv-parser";
import fs from "fs";
import { join } from "path";


const seedFile = join(process.cwd(), './prisma/seeds/GSC/Pages.csv');

const prisma = new PrismaClient();

async function main() {
  fs.createReadStream(seedFile)
    .pipe(csv())
    .on('data', async (row) => {
      const postUrl = row['Pages les plus populaires'] 
      let post = await prisma.post.findFirst({
        where: { url:  {url: postUrl } } 
      });
      
      // Find or create the Url
      if (!post) {
        console.log(`No post found for ${postUrl}`);
        const url = await prisma.url.create({
          data: {
            url: postUrl, post: { create: {} },
          },
        });
        return;
      } else {

        const url = await prisma.url.update({
          where: { postId: post.id },
          data: { post: { connect: { id: post.id } } },
        })
      }
      
      post = await prisma.post.findFirst({
        where: { url:  {url: postUrl } } 
      });
      // Create the SearchConsoleKPIs
      await prisma.searchConsoleKPIs.create({
        data: {
          post: { connect: { id: post.id } },
          clicks: parseInt(row.Clics),
          impressions: parseInt(row.Impressions),
          ctr: parseFloat(row.CTR.replace('%', '')),
          position: parseFloat(row.Position),
        },
      });

    }
    )
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });