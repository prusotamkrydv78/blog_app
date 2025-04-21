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
  try {
    const { username, email, password } = req.body;
    const newUser = new UserModel({ ...req.body });
    await newUser.save();
    console.log("user registerd successfully");
    console.log(newUser);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
 

export { login, register, loginUser, registerUser };
