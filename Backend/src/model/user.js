import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // ✅ use `required`, not `require`
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // ⚠️ usually you don’t make passwords unique
  },
});

export const userModel = mongoose.model("User", userSchema);
