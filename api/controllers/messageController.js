const Message = require("../models/Message");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.newMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const messageData = req.body;

    if (req.file) {
      messageData.image = req.file.filename;
    } else {
      messageData.image = undefined;
    }

    messageData.conversationId = req.body.conversationId;
    messageData.sender = req.body.sender;

    const message = new Message({
      conversationId: messageData.conversationId,
      text: messageData.text,
      sender: messageData.sender,
      image: messageData.image,
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
