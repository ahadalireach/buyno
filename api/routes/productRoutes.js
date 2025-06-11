const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const productController = require("../controllers/productController");

router.post("/add", upload.array("images"), productController.addProduct);
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
