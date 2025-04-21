//login logics

import UserModel from "../models/User.model.js";
import clientPromise from "../lib/mongodb.js"; // adjust the path if needed
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
// const registerUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const newUser = new UserModel({ ...req.body });
//     await newUser.save();
//     console.log("user registerd successfully");
//     console.log(newUser);

//     res.redirect("/");
//   } catch (error) {
//     console.log(error);
//   }
// };

const registerUser = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const client = await clientPromise;

    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new UserModel({ username, email, password });
    await newUser.save();

    console.log("💖 user registered successfully:", newUser);

    // Redirect only works for server-side. If this is a client call, send success.
    return res.status(200).json({ message: "User registered", user: newUser });
  } catch (error) {
    console.error("🔥 Registration error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { login, register, loginUser, registerUser };
