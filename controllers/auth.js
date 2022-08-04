const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const jwt = require("jsonwebtoken");
const Otp = require("../models/Otp");
const User = require("../models/User");

const register = async (req, res, next) => {
  try {
    let otpcode = Math.floor(100000 + Math.random() * 900000);

    await client.messages
      .create({
        body: `${otpcode}`,
        from: "+19035826945",
        to: req.body.phone,
      })
      .then(async (message) => {
        res.json(message);
        console.log(message.sid);
        let otpData = new Otp({
          phone: req.body.phone,
          code: otpcode,
          expireIn: new Date().getTime() + 400000 * 1000,
        });
        const otpdata = await otpData.save();
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    console.log(error);
  }
};

const verifyotp = async (req, res) => {
  try {
    const data = await Otp.findOne({ phone: req.body.phone });
    if ((data.code = req.body.otp)) {
      return res.json(data);
    } else {
      res.json({ msg: "otp incorrect" });
    }
  } catch (error) {
    console.log(error);
  }
};

const check = async (req, res) => {
  try {
    const user = await User.findOne({
      phone: req.body.phone,
    });
    console.log(user);
    if (user)
      return res.status(400).json({ msg: "This phone already exists." });
    else {
      const result = await User.create({ phone: req.body.phone });
      return res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { register, verifyotp, check };
