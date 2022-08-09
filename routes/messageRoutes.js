const express = require("express");
const { allMessages, sendMessage } = require("../controllers/messages");
const verifyToken = require("../middleware/verifytoken");

const router = express.Router();

router.route("/:chatId").get(verifyToken, allMessages);
router.route("/").post(verifyToken, sendMessage);

module.exports = router;
