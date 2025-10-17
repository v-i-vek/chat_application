import { createServer } from "node:http";
import { Server } from "socket.io";
import express from "express";

import { validateConnectedUser } from "./middleware/socket.validate.js";
import { cacheMessage } from "./service/cache.service.js";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

const userSocketMap = {}; // {userId:socketId}
export function getSocketIdByUserId(userId) {
  return userSocketMap[userId];
}
io.use(validateConnectedUser);

io.on("connection", (socket) => {
  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // socket.emit will only sends the message to the connected user other than the current connected user i.e. the user which is just connected.
  socket.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("sendMessage", async (msg) => {
    console.log("Message received:", msg.senderId, "→", msg.receiverId);
    const receiverSocketId = getSocketIdByUserId(msg.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", msg);
      await cacheMessage(msg);
    }
  });

  // on disconnection we will update the list of the user which are online except the current user which is disconnected.
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user);
    delete userSocketMap[userId];
    socket.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
