const accountSid = "AC2fd00d92a5de34eef5f27e3ddb19c023";
const authToken = "144902cba5b84bcb761f4369fb14c6c2";
const client = require("twilio")(accountSid, authToken);
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Otp = require("../models/Otp");

router.post("/register", async (req, res, next) => {
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
});

router.post("/verify-otp", async (req, res) => {
  const data = await Otp.findOne({ phone: req.body.phone });
  if ((data.code = req.body.otp)) {
    const token = jwt.sign(req.body.phone, process.env.JWT_SEC);
    console.log(token);
    res.status(200).json(token);
  }
});
module.exports = router;
