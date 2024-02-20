// Initialize the Redis connection
import sharp from "sharp";

import redis from "./redis-db";

export default async function getBase64(imageUrl: string) {
    if (!imageUrl) {
        return "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcd1DmPwAGfAKcfyer6gAAAABJRU5ErkJggg=="
    }
    try {
        // Check if the result is cached in Redis
        const cachedResult = await redis.get(imageUrl);
        if (cachedResult) {
            return cachedResult;
        }

        // Fetch the image from the URL
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch the image: ${response.statusText}`);
        }

        const imageBuffer = await response.arrayBuffer();
        const imageBufferUint8 = new Uint8Array(imageBuffer);

        // Process the fetched image
        const image = sharp(Buffer.from(imageBufferUint8));

        // Resize and convert to a low-quality format (e.g., WebP)
        const lqipBuffer = await image
            .resize(16, 16) // Adjust the dimensions as needed
            .blur()
            .toFormat("webp", { quality: 10 }) // Adjust the format and quality as needed
            .toBuffer();

        // Get the Base64 representation
        const lqipBase64 = lqipBuffer.toString("base64");

        // Cache the result in Redis with a TTL (time to live) if needed
        await redis.set(imageUrl, lqipBase64, 3600); // Cache for 1 hour

        return lqipBase64;
    } catch (error) {
        console.error("Error generating LQIP:", error);
        return null;
    }
}
