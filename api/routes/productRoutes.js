const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");

router.post("/add", productController.addProduct);
router.get("/seller/:id", productController.getSellerProducts);
router.delete("/seller/:id", isSeller, productController.deleteProduct);
router.get("/all", productController.getAllProducts);
router.put("/review/add", isAuthenticated, productController.addReview);
router.get(
  "/admin/all-products",
  isAuthenticated,
  isAdmin("Admin"),
  productController.getAllProductsByAdmin
);

module.exports = router;
