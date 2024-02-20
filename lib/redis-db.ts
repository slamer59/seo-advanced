// @ts-nocheck
import Keyv from "@keyvhq/core"

import { isProd } from "./const"
// import KeyvRedis from "@keyvhq/redis"

// Set default values for the Redis connection parameters
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";

// Create a Keyv instance for Redis


let redis: Keyv
if (isProd) {
    // const keyvRedis = new KeyvRedis(redisUrl)
    // db = new Keyv({ store: keyvRedis, namespace: redisNamespace || undefined })
    redis = new Keyv(`redis://${REDIS_HOST}:${REDIS_PORT}`, { password: REDIS_PASSWORD });
} else {
    redis = new Keyv()
}

export default redis 
