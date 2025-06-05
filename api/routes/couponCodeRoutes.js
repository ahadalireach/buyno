const express = require("express");
const router = express.Router();
const { isSeller } = require("../middleware/auth");
const couponCodeController = require("../controllers/couponCodeController");

router.post("/create", isSeller, couponCodeController.createCouponCode);
router.get("/seller/:id", isSeller, couponCodeController.getSellerCouponCodes);
router.delete("/seller/:id", isSeller, couponCodeController.deleteCouponCode);
router.get("/seller/:name", isSeller, couponCodeController.getCouponCode);

module.exports = router;
