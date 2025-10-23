import express from "express";
import { login, logout, registerUser } from "../controller/auth.controller.js";
import { validateToken } from "../middleware/auth.validate.js";

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", login);
route.get("/check-user", validateToken, (req, res) => {
  res.status(200).json({ success: "success", data: req.conUser });
});

route.post("/logout", logout);
export default route;
