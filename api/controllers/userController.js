const fs = require("fs");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
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
        new errorHandler("A user with this email already exists.", 400)
      );
    }
    const fileUrl = req.file ? req.file.filename : "";
    const user = { name, email, password, avatar: fileUrl };
    const activationToken = createActivationToken(user);
    const activationUrl = `${process.env.FRONTEND_URL}/user/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        name: user.name,
        activationUrl,
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new errorHandler(error.message), 500);
    }
  } catch (error) {
    console.log(error);
    return next(new errorHandler(error.message), 400);
  }
});

exports.activateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );
    if (!user) {
      return next(new errorHandler("Invalid activation token.", 400));
    }

    const { name, email, password, avatar } = user;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(
        new errorHandler("A user with this email already exists.", 400)
      );
    }
    const newUser = await User.create({
      name,
      email,
      password,
      avatar,
    });
    sendToken(newUser, 201, res);
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new errorHandler("Please provide both email and password.", 400)
      );
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(
        new errorHandler("User does not exist with this email..", 401)
      );
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new errorHandler("Invalid password.", 401));
    }
    sendToken(user, 200, res);
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new errorHandler("User does not exists.", 400));
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});
