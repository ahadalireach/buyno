const fs = require("fs");
const Order = require("../models/Order");
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

    product.images.forEach((imageUrl) => {
      const filename = imageUrl;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}:`, err);
        } else {
          console.log(`File ${filePath} deleted successfully.`);
        }
      });
    });

    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Product Deleted successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});

exports.addReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const { user, rating, comment, productId, orderId } = req.body;
    const product = await Product.findById(productId);

    const review = {
      user,
      rating,
      comment,
      productId,
    };

    const isReviewed = product.reviews.find(
      (rev) => rev.user._id === req.user._id
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === req.user._id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });

    await Order.findByIdAndUpdate(
      orderId,
      { $set: { "cart.$[elem].isReviewed": true } },
      { arrayFilters: [{ "elem._id": productId }], new: true }
    );

    res.status(200).json({
      success: true,
      message: "Reveiwed added successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});

exports.getAllProductsByAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});
