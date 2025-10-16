import { createClient } from "redis";

let client;

export async function redisClient() {
  try {
    if (!client) {
      client = await createClient({
        url: process.env.REDIS_URL,
      });
      await client.connect();
      return client;
    }
  } catch (error) {
    console.log("Error while creating the connection in redis", error);
  }
}
