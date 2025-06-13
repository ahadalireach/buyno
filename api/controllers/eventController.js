const cloudinary = require("cloudinary");
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
    }

    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else if (Array.isArray(req.body.images)) {
      images = req.body.images;
    }

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "events",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const eventData = req.body;
    eventData.images = imagesLinks;
    eventData.seller = seller;

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      event,
    });
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

    for (let i = 0; i < event.images.length; i++) {
      await cloudinary.v2.uploader.destroy(event.images[i].public_id);
    }

    await event.deleteOne();

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
    res.status(200).json({
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
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});

exports.getAllEventsByAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
});
