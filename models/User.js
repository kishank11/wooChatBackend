const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  phone: { type: Number },
  token: { type: String },
});

const otp = mongoose.model("User", userSchema);
module.exports = otp;
