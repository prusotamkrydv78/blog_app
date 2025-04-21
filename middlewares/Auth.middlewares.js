//login logics

import UserModel from "../models/User.model.js"; // adjust the path if needed
import mongoose from "mongoose";
const login = (req, res) => {
  res.render("auth/login", {
    title: "BlogVerse - Login",
    user: null,
  });
};

const loginUser = (req, res) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);
  res.send("login complete");
};
//registers logics
const register = (req, res) => {
  res.render("auth/register", {
    title: "BlogVerse - Register",
    user: null,
  });
};
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  const user = await UserModel.create({
    username,
    email,
    password,
  });
  res.send("register complete");
};

export { login, register, loginUser, registerUser };
