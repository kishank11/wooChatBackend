const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  phone: { type: Number },
  code: {
    type: String,
    unique: true,
  },
  expireIn: {
    type: Number,
  },
});

const otp = mongoose.model("otp", otpSchema);
module.exports = otp;
