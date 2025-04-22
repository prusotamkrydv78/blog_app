//login logics

import UserModel from "../models/User.model.js"; // adjust the path if needed
import mongoose from "mongoose";
const login = (req, res) => {
  res.render("auth/login", {
    title: "BlogVerse - Login",
    user: null,
  });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // For now, simple password check (we'll implement proper hashing later)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Login successful
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message
    });
  }
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
    // Check if passwords match
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // Check if user with this email already exists
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    // Check if username is already taken
    const existingUsername = await UserModel.findOne({ username: req.body.username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken"
      });
    }

    // Create new user (exclude confirmPassword)
    const { confirmPassword, ...userData } = req.body;
    const newUser = await UserModel.create(userData);

    // Return success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message
    });
  }
};

export { login, register, loginUser, registerUser };
