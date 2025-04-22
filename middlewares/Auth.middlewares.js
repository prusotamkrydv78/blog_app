//login logics

import UserModel from "../models/User.model.js"; // adjust the path if needed
const login = (req, res) => {
  res.render("auth/login", {
    title: "BlogVerse - Login",
    user: null,
  });
};

const loginUser = async (req, res) => {
  try {
    console.log('Login attempt with email:', req.body.email);
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user by email with simpler approach for Vercel
    let user;
    try {
      // Use maxTimeMS instead of Promise.race for better compatibility
      user = await UserModel.findOne({ email }).maxTimeMS(10000);
    } catch (dbErr) {
      console.error('Login findOne error:', dbErr);
      return res.status(500).json({
        success: false,
        message: "Database operation failed. Please try again.",
        error: dbErr.message
      });
    }

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

    console.log('Login successful for user:', user.username);

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
    console.log('Registration attempt with data:', {
      username: req.body.username,
      email: req.body.email
    });

    // Check if passwords match
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // Check if user with this email already exists - with simpler approach for Vercel
    let existingUser;
    try {
      // Use a simpler approach that's more compatible with serverless
      existingUser = await UserModel.findOne({ email: req.body.email }).maxTimeMS(10000);
    } catch (dbErr) {
      console.error('Email check error:', dbErr);
      return res.status(500).json({
        success: false,
        message: "Database operation failed. Please try again.",
        error: dbErr.message
      });
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    // Check if username is already taken - with simpler approach for Vercel
    let existingUsername;
    try {
      // Use a simpler approach that's more compatible with serverless
      existingUsername = await UserModel.findOne({ username: req.body.username }).maxTimeMS(10000);
    } catch (dbErr) {
      console.error('Username check error:', dbErr);
      return res.status(500).json({
        success: false,
        message: "Database operation failed. Please try again.",
        error: dbErr.message
      });
    }

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken"
      });
    }

    // Create new user (exclude confirmPassword)
    const { confirmPassword, termsCheck, ...userData } = req.body;

    // Create user with simpler approach for Vercel
    let newUser;
    try {
      // Direct create without Promise.race for better compatibility
      newUser = await UserModel.create(userData);
    } catch (dbErr) {
      console.error('User creation error:', dbErr);
      return res.status(500).json({
        success: false,
        message: "User creation failed. Please try again.",
        error: dbErr.message
      });
    }

    console.log('User registered successfully:', {
      id: newUser._id,
      username: newUser.username
    });

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
