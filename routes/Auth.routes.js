import express from "express";
import {
  login,
  loginUser,
  register,
  registerUser,
} from "../middlewares/Auth.middlewares.js";

const AuthRoutes = express.Router();

AuthRoutes.get("/login", login);
AuthRoutes.post("/login", loginUser);

AuthRoutes.get("/register", register);
AuthRoutes.post("/register", registerUser);

export default AuthRoutes;
