const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");
const sellerController = require("../controllers/sellerController");

router.post(
  "/register",
  upload.single("file"),
  sellerController.registerSeller
);
router.post("/activate", sellerController.activateSeller);
router.post("/login", sellerController.loginSeller);
router.get("/profile", isSeller, sellerController.getSellerProfile);
router.get("/info/:id", sellerController.getSellerInfo);
router.get("/logout", sellerController.logoutSeller);

module.exports = router;
