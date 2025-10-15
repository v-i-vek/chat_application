import express from "express";
import { login, registerUser } from "../controller/auth.controller.js";
import { validateToken } from "../middleware/auth.validate.js";

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", login);
route.get("/check-user", validateToken, (req, res) => {
  res.status(200).json({ success: "success", data: req.conUser });
});

export default route;
