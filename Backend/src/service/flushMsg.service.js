import { MessageModel } from "../model/message.js";

export const flushDataInDb = async (messages) => {
  try {
    const parsedData = messages.map((m) => JSON.parse(m));
    await MessageModel.insertMany(parsedData);
  } catch (error) {
    console.log("error while running flushDataInDb \n", error);
  }
};
