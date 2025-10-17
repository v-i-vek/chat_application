import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true, // ✅ use `required`, not `require`
  },
  receiverId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  text: {
    type: String,
    trim: true,
    maxlength: 2000,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Number, // store as epoch time
    default: () => Date.now(), // epoch in milliseconds
    required: true,
  },
});

export const MessageModel = mongoose.model("Messages", userSchema);
