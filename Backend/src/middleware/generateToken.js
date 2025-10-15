import jwt from "jsonwebtoken";

export const generateJWTtoken = async (user) => {
  try {
    const token = await jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.SECRET_JWT,
      {
        expiresIn: "7d",
      }
    );
    return token;
  } catch (error) {
    console.log("error while creating token \n", error);
  }
};
