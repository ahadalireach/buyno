const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const { upload } = require("../multer");

router.post(
  "/new-message",
  upload.single("image"),
  messageController.newMessage
);
router.get("/all/:id", messageController.getAllMessages);

module.exports = router;
