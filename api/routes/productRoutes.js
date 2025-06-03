const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");
const productController = require("../controllers/productController");

router.post("/add", upload.array("images"), productController.addProduct);
router.get("/seller/:id", productController.getSellerProducts);
router.delete("/seller/:id", isSeller, productController.deleteProduct);

module.exports = router;
