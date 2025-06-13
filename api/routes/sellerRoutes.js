const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");

router.post("/register", sellerController.registerSeller);
router.post("/activate", sellerController.activateSeller);
router.post("/login", sellerController.loginSeller);
router.get("/profile", isSeller, sellerController.getSellerProfile);
router.get("/info/:id", sellerController.getSellerInfo);
router.put("/update-info", isSeller, sellerController.updateSellerInfo);
router.put("/update-avatar", isSeller, sellerController.updateSellerAvatar);
router.put(
  "/update-withdraw-method",
  isSeller,
  sellerController.updateSellerWithdrawMethod
);
router.delete(
  "/delete-withdraw-method",
  isSeller,
  sellerController.deleteSellerWithdrawMethod
);
router.get("/logout", sellerController.logoutSeller);
router.get(
  "/admin/all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  sellerController.getAllSellersByAdmin
);
router.delete(
  "/admin/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  sellerController.deleteSellerByAdmin
);

module.exports = router;
