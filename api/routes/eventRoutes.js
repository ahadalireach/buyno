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
router.delete("/seller/:id", eventController.deleteEvent);
router.get("/seller/:id", eventController.getSellerEvents);
router.get("/all", eventController.getAllEvents);

module.exports = router;
