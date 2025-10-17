import { createClient } from "redis";

let client;

export async function redisClient() {
  try {
    if (!client) {
      client = createClient({
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        socket: {
          host: process.env.REDIS_URL,
          port: process.env.REDIS_PORT,
        },
      });
      await client.connect();
      return client;
    }
    return client;
  } catch (error) {
    console.log("Error while creating the connection in redis", error);
  }
}
