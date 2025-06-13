const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/new-message", messageController.newMessage);
router.get("/all/:id", messageController.getAllMessages);

module.exports = router;
