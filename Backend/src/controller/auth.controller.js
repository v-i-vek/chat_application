import { generateJWTtoken } from "../middleware/generateToken.js";
import { userModel } from "../model/user.js";
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

    if (password.length < 5 || !password || !email) {
      res.status(400).json({
        success: "failed",
        message: "incorrect email or password",
      });
      return;
    }

    const checkUserExist = await userModel.findOne({ email });
    if (!checkUserExist) {
      res
        .status(400)
        .json({ success: "failed", message: "incorrect email or password" });
      return;
    }

    const checkPassword = await checkUserExist.comparePassword(password);
    if (!checkPassword) {
      res
        .status(400)
        .json({ success: "failed", message: "incorrect email or password" });
    }

    const token = await generateJWTtoken(checkUserExist);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "development" ? false : true,
    });
    res.status(200).json({
      success: "success",
      data: {
        id: checkUserExist._id,
        email: checkUserExist.email,
        name: checkUserExist.name,
      },
    });

    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
