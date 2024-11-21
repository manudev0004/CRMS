const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./db");
const User = require("./models/User");

// Initialize express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

const handleSignup = async (req, res) => {
  const { username, email, password, jobTitle, companyName, termsAccepted } =
    req.body;

  try {
    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with all the data from the frontend
    const user = new User({
      username,
      email,
      password: hashedPassword,
      jobTitle,
      companyName,
      termsAccepted,
    });

    // Save the new user to the database
    await user.save();

    res.status(201).json({
      msg: "Signup successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        jobTitle: user.jobTitle,
        companyName: user.companyName,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Function to handle sign-in
const handleSignin = async (req, res) => {
  const { email, password } = req.body;

  console.log("Signin request body:", req.body); // Log the incoming data for debugging

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res.json({
      msg: "Signin successful",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};


// Routes
app.post("/signup", handleSignup);
app.post("/signin", handleSignin);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
