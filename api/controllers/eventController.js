const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Seller = require("../models/Seller");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const sellerId = req.body.sellerId;
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return next(new errorHandler("Invalid seller ID.", 400));
    } else {
      const files = req.files;
      const imageUrls = files.map((file) => file.filename);
      const eventData = req.body;
      eventData.images = imageUrls;
      eventData.seller = seller;
      const product = await Event.create(eventData);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});
