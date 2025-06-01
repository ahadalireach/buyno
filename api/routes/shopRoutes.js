const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");
const shopController = require("../controllers/shopController");

router.post("/create-shop", upload.single("file"), shopController.createShop);
router.post("/activation", shopController.activateShop);
router.post("/login-shop", shopController.loginShop);
router.get("/getseller", isSeller, shopController.getSeller);
router.get("/logout", shopController.logoutShop);

module.exports = router;
