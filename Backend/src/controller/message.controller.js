import { MessageModel } from "../model/message.js";
import { userModel } from "../model/user.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUser = req.conUser.id;
    const filterUsers = await userModel
      .find({ _id: { $ne: loggedInUser } })
      .select("-password");
    res.status(200).json({ success: "success", data: filterUsers });
  } catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const authUser = req.conUser.id;
    const { id } = req.params;
    const messages = await MessageModel.find({
      $or: [
        { senderId: authUser, receiverId: id },
        { senderId: id, receiverId: authUser },
      ],
    });

    if (messages.length > 0) {
      res.status(200).json({
        success: "success",
        data: messages,
      });
    } else {
      res.status(204).json({
        success: "success",
        data: "no messages found",
      });
    }
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const file = req.file;
    const { id: receiverId } = req.params;
    const senderId = req.conUser.id;

    if (!file && !text) {
      return res.status(400).json({ message: "Text or image is required." });
    }
    if (senderId == receiverId) {
      return res
        .status(400)
        .json({ message: "Cannot send messages to yourself." });
    }
    const receiverExists = await userModel.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found." });
    }
    const newMessage = await MessageModel.create({
      senderId,
      receiverId,
      text,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getChatPartners = async (req, res) => {
  try {
  } catch (error) {}
};
