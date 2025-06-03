const fs = require("fs");
const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");
const sendMail = require("../utils/sendMail");
const sendSellerToken = require("../utils/shopToken");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

exports.registerSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, address, phoneNumber, zipCode } = req.body;
    const sellerEmail = await Seller.findOne({ email });
    if (sellerEmail) {
      const filename = req.file ? req.file.filename : "";
      const filePath = `uploads/${filename}`;
      if (filename) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
      }
      return next(
        new errorHandler("Seller already registered with this email.", 400)
      );
    }

    const fileUrl = req.file ? req.file.filename : "";
    const seller = {
      name,
      email,
      password,
      avatar: fileUrl,
      address,
      phoneNumber,
      zipCode,
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `${process.env.FRONTEND_URL}/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your seller account",
        name: seller.name,
        activationUrl,
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your shop!`,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new errorHandler(error.message, 400));
  }
});

exports.activateSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const seller = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );
    if (!seller) {
      return next(new errorHandler("Invalid activation token.", 400));
    }

    const { name, email, password, avatar, zipCode, address, phoneNumber } =
      seller;

    const sellerEmail = await Seller.findOne({ email });
    if (sellerEmail) {
      return next(
        new errorHandler("Seller already registered with this email.", 400)
      );
    }

    const newSeller = await Seller.create({
      name,
      email,
      avatar,
      password,
      zipCode,
      address,
      phoneNumber,
    });

    sendSellerToken(newSeller, 201, res);
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.loginSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new errorHandler("Please provide all required fields.", 400));
    }

    const user = await Seller.findOne({ email }).select("+password");
    if (!user) {
      return next(
        new errorHandler("Seller does not exist with this email.", 400)
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new errorHandler("Invalid Password.", 400));
    }

    sendSellerToken(user, 201, res);
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.getSellerProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.seller._id);
    if (!seller) {
      return next(new errorHandler("Seller does not exist.", 400));
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.logoutSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});
