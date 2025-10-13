import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      console.log("this passowrd ", this.password);
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    return await bcrypt.compare(userPassword, this.password);
  } catch (error) {
    throw error;
  }
};
export const userModel = mongoose.model("Users", userSchema);
