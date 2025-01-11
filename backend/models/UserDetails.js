// backend/models/UserDetails.js
const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  degree: { type: String, required: true },
  passoutYear: { type: Number, required: true },
  ugpg: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

module.exports = UserDetails;
