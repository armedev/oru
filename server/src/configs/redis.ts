import { createClient } from "redis";
import { config } from "dotenv";
config();

const redisHost = process.env.REDIS_CACHE_HOST;
const redisPort = process.env.REDIS_CACHE_PORT || 6379;
const redisPwd = process.env.REDIS_PWD;

export const connectRedis = async () => {
  try {
    let redis = createClient({
      socket: {
        host: redisHost,
        port: Number(redisPort),
      },
      password: redisPwd,
    });
    await redis.connect();
    return redis;
  } catch (err) {
    console.error(err);
    throw new Error("failed to connect redis");
  }
};
