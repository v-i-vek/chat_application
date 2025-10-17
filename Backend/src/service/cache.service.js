import { redisClient } from "../config/redis.js";
import { flushDataInDb } from "./flushMsg.service.js";

const BUFFER_KEY = "chat:messages";

export const cacheMessage = async (message) => {
  try {
    // push message in redis
    const redis = await redisClient();
    const cacheSize = await redis.lLen(BUFFER_KEY);
    const addCache = await redis.lPush(BUFFER_KEY, JSON.stringify(message));
    if (cacheSize > 10) {
      // write the logic to save the data in db
      const cacheData = await redis.lRange(BUFFER_KEY, 0, -1);
      await flushDataInDb(cacheData);
      await redis.del(BUFFER_KEY);
    }
  } catch (error) {
    console.log("error while runnign cacheMessage function \n", error);
  }
};
