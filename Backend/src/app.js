import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

import { configDotenv } from "dotenv";
configDotenv();
import route from "./routes/auth.route.js";
import { connectDB } from "./config/db.js";
import router from "./routes/message.route.js";
import { validateConnectedUser } from "./middleware/socket.validate.js";

const app = express();
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/v1", route);
app.use("/v1/message", router);
const PORT = process.env.PORT || 8000;

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

// this is for storig online users
const userSocketMap = {}; // {userId:socketId}
export function getConnectedUser(userId) {
  return userSocketMap[userId];
}
io.use(validateConnectedUser);

io.on("connection", (socket) => {
  console.log(socket.id);
  userSocketMap[userId] = socket.id;

  // socket.emit will only sends the message to the connected user other than the current connected user i.e. the user which is just connected.
  socket.emit("getOnlineUsers", Object.keys(userSocketMap));

  // on disconnection we will update the list of the user which are online except the current user which is disconnected.
  socket.disconnect("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    socket.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
});

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
``;
