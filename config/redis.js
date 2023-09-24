require("dotenv").config();
const redis = require("redis");

const endpoint = process.env.REDIS_ENDPOINT_URL || "127.0.0.1:6379";
const password = process.env.REDIS_PASSWORD || null;

const [host, port] = endpoint.split(":");

/** @type {import('redis').RedisClient} */
const redisClient = redis.createClient({
    host: host,
    port: +port,
    password: password,
    reconnectStrategy: () => 3000,
});

module.exports = { redisClient };
