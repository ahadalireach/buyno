const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const { isAuthenticated } = require("../middleware/auth");
const userController = require("../controllers/userController");

router.post("/register", upload.single("file"), userController.registerUser);
router.post("/activate", userController.activateUser);
router.post("/login", userController.loginUser);
router.get("/profile", isAuthenticated, userController.getUserProfile);
router.get("/logout", isAuthenticated, userController.logoutUser);

module.exports = router;
