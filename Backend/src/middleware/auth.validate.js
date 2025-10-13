import jwt from "jsonwebtoken";

export const validateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    const verifyToken = await jwt.verify(token, process.env.SECRET_JWT);
    if (!verifyToken)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });

    req.conUser = verifyToken;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
