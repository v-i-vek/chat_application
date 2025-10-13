import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true, // ✅ use `required`, not `require`
    },
    recieverId: {
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
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model("Messages", userSchema);
