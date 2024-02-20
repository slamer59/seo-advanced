
export const baseCDN = new URL(`${process.env.NEXT_PUBLIC_IMAGE_CDN}`).origin


export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production" && process.env.STAGING !== "true";
export const isStaging = process.env.NODE_ENV === "production" && process.env.STAGING === "true";

