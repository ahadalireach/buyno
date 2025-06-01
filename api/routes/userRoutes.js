const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const { isAuthenticated } = require("../middleware/auth");
const userController = require("../controllers/userController");

router.post("/sign-up", upload.single("file"), userController.signUp);
router.post("/activation", userController.activateUser);
router.post("/login", userController.login);
router.get("/getuser", isAuthenticated, userController.getUser);
router.get("/logout", isAuthenticated, userController.logout);

module.exports = router;
