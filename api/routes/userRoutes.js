const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.post("/register", userController.registerUser);
router.post("/activate", userController.activateUser);
router.post("/login", userController.loginUser);
router.get("/profile", isAuthenticated, userController.getUserProfile);
router.put("/update-info", isAuthenticated, userController.updateUserInfo);
router.put("/update-avatar", isAuthenticated, userController.updateUserAvatar);
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
router.get("/info/:id", userController.getUserInfo);
router.get("/logout", isAuthenticated, userController.logoutUser);
router.get(
  "/admin/all-users",
  isAuthenticated,
  isAdmin("Admin"),
  userController.getAllUsersByAdmin
);
router.delete(
  "/admin/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  userController.deleteUserByAdmin
);

module.exports = router;
