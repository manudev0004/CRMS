const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./db");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const { google } = require("googleapis");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");

const SECRET_KEY = "d0aef898d12c20c85c43d11a38bd1e7e9e7b96bd7e07a8034b18b0c776c8f223";

// Google API Credentials
const CLIENT_ID = "82946541954-djchuflfcbumvl9b9cjdscdij2ip9mn4.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; // Or your redirect URI
const REFRESH_TOKEN = "1//0469N2OsmPf4WCgYIARAAGAQSNwF-L9IrZaue12yQIRK7-jifw82j4eBBbpFzTSc0xEhDsaPiQO4E1FHSgCIWHn09bQtLq0YGEKU";

// Initialize express app
const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Configure Nodemailer
// const transporter = nodemailer.createTransport({
//   service: "Gmail", // Use your email provider (e.g., Gmail, Outlook)
//   auth: {
//     user: "your-email@gmail.com",
//     pass: "your-email-password",
//   },
// });

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

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Signin successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// // Configure OAuth2 Client
// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// // Function to send emails using Gmail API
// const sendPasswordResetEmail = async (to, resetLink) => {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();

//     const transporter = require("nodemailer").createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "your-email@gmail.com", // Your Gmail account
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken.token,
//       },
//     });

//     const mailOptions = {
//       from: "Your App <your-email@gmail.com>",
//       to,
//       subject: "Password Reset Request",
//       text: `You requested a password reset. Use the following link to reset your password: ${resetLink}`,
//       html: `<p>You requested a password reset. Use the following link to reset your password:</p><a href="${resetLink}">Reset Password</a>`,
//     };

//     const result = await transporter.sendMail(mailOptions);
//     console.log("Password reset email sent:", result);
//     return result;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// };

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ msg: "Access denied" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    req.user = user;
    next();
  });
};

app.get("/dashboard-data", authenticateToken, (req, res) => {
  res.json({ msg: `Welcome ${req.user.username}!`, data: "Dashboard data" });
}); 

// Routes
app.post("/signup", handleSignup);
app.post("/signin", handleSignin);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Endpoint to handle Forgot Password
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User with this email does not exist." });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

    // Send email with Gmail API
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    await sendPasswordResetEmail(email, resetLink);

    res.json({ msg: "Password reset email sent. Please check your inbox." });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ msg: "Server error", error });
  }
});

// Endpoint to reset the password
app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: "Invalid token or user not found." });
    }

    // Hash the new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ msg: "Password reset successful." });
  } catch (error) {
    console.error("Error in resetting password:", error);
    res.status(500).json({ msg: "Invalid or expired token." });
  }
});
