const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");
const Product = require("../models/Product");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.addProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const sellerId = req.body.sellerId;
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return next(new errorHandler("Invalid seller ID.", 400));
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => file.filename);
      const productData = req.body;
      productData.images = imageUrls;
      productData.seller = seller;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});

exports.getSellerProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({ sellerId: req.params.id });

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new errorHandler("Product is not found with this id", 404));
    }

    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Product Deleted successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});
