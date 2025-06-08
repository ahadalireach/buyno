const fs = require("fs");
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

exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return next(new errorHandler("Event is not found with this id", 404));
    }

    event.images.forEach((imageUrl) => {
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

    await Event.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Event Deleted successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});

exports.getAllEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});

exports.getSellerEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find({ sellerId: req.params.id });

    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});
