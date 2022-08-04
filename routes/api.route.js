const router = require("express").Router();
const { verifyotp, register } = require("../controllers/auth");

router.post("/register", register);

router.post("/verify-otp", verifyotp);
module.exports = router;
