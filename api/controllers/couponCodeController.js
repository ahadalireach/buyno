const CouponCode = require("../models/CouponCode");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createCouponCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const isCouponCodeExists = await CouponCode.find({
      name: req.body.name,
    });

    if (isCouponCodeExists.length !== 0) {
      return next(new errorHandler("Coupon code already exists.", 400));
    }

    const couponCode = await CouponCode.create(req.body);
    res.status(201).json({
      success: true,
      couponCode,
    });
    console.log(req.body, couponCode);
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});

exports.getSellerCouponCodes = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCodes = await CouponCode.find({ sellerId: req.seller.id });
    res.status(201).json({
      success: true,
      couponCodes,
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});

exports.deleteCouponCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCode = await CouponCode.findByIdAndDelete(req.params.id);

    if (!couponCode) {
      return next(new errorHandler("Coupon code dosen't exists!", 400));
    }
    res.status(201).json({
      success: true,
      message: "Coupon code deleted successfully!",
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});

exports.getCouponCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCode = await CouponCode.findOne({ name: req.params.name });
    res.status(200).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});
