const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");
const eventController = require("../controllers/eventController");

router.post(
  "/create",
  upload.array("images"),
  isSeller,
  eventController.createEvent
);

module.exports = router;
