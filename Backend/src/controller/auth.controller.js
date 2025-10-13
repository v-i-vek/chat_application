import { userModel } from "../model/user.js";
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (password.length < 5) {
      res.status(400).json({
        success: "failed",
        message: "Password must be atleast 6 character long",
      });
      return;
    }
    const checkUserExist = await userModel.findOne({ email });
    if (checkUserExist) {
      res
        .status(400)
        .json({ success: "success", message: "Email Id already exist" });
      return;
    }
    password = await bcrypt.hash(password.toString(), 10);

    const result = await userModel.create({ name, email, password });
    res.status(200).json({
      success: "success",
      message: "user created successfully",
      data: result,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUserExist = userModel.findOne({ email });
    if (!checkUserExist) {
      res
        .status(400)
        .json({ success: "failed", message: "incorrect email or password" });
      return;
    }

    const result = userModel.create({ userName, email, password });
    res.status(200).json({
      success: "success",
      message: "user created successfully",
      data: result,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
