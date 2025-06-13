const cloudinary = require("cloudinary");
const Message = require("../models/Message");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.newMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const messageData = req.body;

    if (req.body.image) {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "messages",
      });
      messageData.image = {
        public_id: myCloud.public_id,
        url: myCloud.url,
      };
    }

    messageData.conversationId = req.body.conversationId;
    messageData.sender = req.body.sender;
    messageData.text = req.body.text;

    const message = new Message({
      conversationId: messageData.conversationId,
      text: messageData.text,
      sender: messageData.sender,
      image: messageData.image ? messageData.image : undefined,
    });

    await message.save();
    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    return next(new errorHandler(error.message), 500);
  }
});

exports.getAllMessages = catchAsyncErrors(async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    });

    res.status(201).json({
      success: true,
      messages,
    });
  } catch (error) {
    return next(new errorHandler(error.message), 500);
  }
});
