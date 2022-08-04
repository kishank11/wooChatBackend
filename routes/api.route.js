const router = require("express").Router();
const { verifyotp, register, check } = require("../controllers/auth");

router.post("/register", register);

router.post("/verify-otp", verifyotp);
router.post("/check", check);

module.exports = router;
