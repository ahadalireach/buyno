const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const { isAuthenticated } = require("../middleware/auth");
const userController = require("../controllers/userController");

router.post("/register", upload.single("file"), userController.registerUser);
router.post("/activate", userController.activateUser);
router.post("/login", userController.loginUser);
router.get("/profile", isAuthenticated, userController.getUserProfile);
router.put("/update-info", isAuthenticated, userController.updateUserInfo);
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("file"),
  userController.updateUserAvatar
);
router.put(
  "/update-addresses",
  isAuthenticated,
  userController.updateUserAddresses
);
router.delete(
  "/delete-address/:id",
  isAuthenticated,
  userController.deleteUserAddress
);
router.put(
  "/update-password",
  isAuthenticated,
  userController.updateUserPassword
);
router.get("/logout", isAuthenticated, userController.logoutUser);

module.exports = router;
