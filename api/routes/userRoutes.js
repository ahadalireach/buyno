const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchErrorAsync = require("../middleware/catchErrorAsync");
const { isAuthenticated } = require("../middleware/auth");
const userController = require("../controllers/userController");

router.post(
  "/sign-up",
  upload.single("file"),
  catchErrorAsync(userController.signUp)
);
router.post("/activation", catchErrorAsync(userController.activateUser));
router.post("/login", catchErrorAsync(userController.login));
router.get(
  "/getuser",
  isAuthenticated,
  catchErrorAsync(userController.getUser)
);

module.exports = router;
