const fs = require("fs");
const jwt = require("jsonwebtoken");
const Shop = require("../models/Shop");
const sendMail = require("../utils/sendMail");
const sendShopToken = require("../utils/shopToken");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

exports.createShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, address, phoneNumber, zipCode } = req.body;
    const sellerEmail = await Shop.findOne({ email });
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
      return next(new errorHandler("User already exists", 400));
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
        subject: "Activate your Shop",
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

exports.activateShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const seller = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );
    if (!seller) {
      return next(new errorHandler("Invalid token", 400));
    }

    const { name, email, password, avatar, zipCode, address, phoneNumber } =
      seller;

    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return next(new errorHandler("User already exists", 400));
    }

    const newSeller = await Shop.create({
      name,
      email,
      avatar,
      password,
      zipCode,
      address,
      phoneNumber,
    });

    sendShopToken(newSeller, 201, res);
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.loginShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new errorHandler("Please provide the all fields!", 400));
    }

    const user = await Shop.findOne({ email }).select("+password");
    if (!user) {
      return next(new errorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(
        new errorHandler("Please provide the correct information", 400)
      );
    }

    sendShopToken(user, 201, res);
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.getSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller._id);
    if (!seller) {
      return next(new errorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.logoutShop = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});
