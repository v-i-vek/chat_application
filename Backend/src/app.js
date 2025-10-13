import express, { urlencoded } from "express";
import { configDotenv } from "dotenv";
configDotenv();
import route from "./routes/auth.js";
import { connectDB } from "./config/DB.js";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use("/v1", route);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
