// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobTitle: { type: String },
  companyName: { type: String },
  termsAccepted: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", userSchema);
