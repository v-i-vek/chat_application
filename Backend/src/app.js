import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { app, server } from "./socket.js";
import { configDotenv } from "dotenv";
configDotenv();
import route from "./routes/auth.route.js";
import { connectDB } from "./config/db.js";
import router from "./routes/message.route.js";

app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/v1", route);
app.use("/v1/message", router);
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
