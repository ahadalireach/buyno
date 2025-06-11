const express = require("express");
const router = express.Router();
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const orderController = require("../controllers/orderController");

router.post("/create", orderController.createOrder);
router.get("/user/:id", orderController.getUserOrders);
router.get("/seller/:id", orderController.getSellerOrders);
router.put(
  "/seller/update-status/:id",
  isSeller,
  orderController.updateOrderStatus
);
router.put(
  "/user/order-refund/:id",
  isAuthenticated,
  orderController.userRefundOrderRequest
);
router.put(
  "/seller/order-refund/:id",
  isSeller,
  orderController.sellerRefundOrderSuccess
);
router.get(
  "/admin/all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  orderController.getAllOrdersByAdmin
);

module.exports = router;
