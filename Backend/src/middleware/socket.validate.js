import jwt from "jsonwebtoken";

export const validateConnectedUser = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    //verfiy the token
    const verifyToken = await jwt.verify(token, process.env.SECRET_JWT);
    if (!verifyToken) {
      console.log("Socket connection rejected: inavalid token");
      return next(new Error("Unauthorized - invalid token"));
    }
    socket.user = verifyToken.name;
    socket.userId = verifyToken.id;

    console.log(
      `socket got authenticated for ${socket.user} having id ${socket.userId} `
    );

    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
