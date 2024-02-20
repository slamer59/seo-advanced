/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const allowedImageDomains = process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS.split(',')

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      ...allowedImageDomains.map((domain) => ({
        protocol: 'https',
        hostname: domain.trim(), // Remove leading/trailing whitespaces
        pathname: '**',
      })),
    ],
  },

};

export default config;
