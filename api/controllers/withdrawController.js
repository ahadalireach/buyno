const Seller = require("../models/Seller");
const sendMail = require("../utils/sendMail");
const Withdraw = require("../models/Withdraw");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.requestWithdraw = catchAsyncErrors(async (req, res, next) => {
  try {
    const { amount } = req.body;

    const data = {
      seller: req.seller,
      amount,
    };

    try {
      await sendMail({
        email: req.seller.email,
        subject: "Withdrawal Request Received",
        name: req.seller.name,
        message: `Hello ${req.seller.name},

          We have received your withdrawal request for $${amount}. Your request is currently being processed and will be completed within 3 to 7 business days.

          Thank you for your patience.`,
      });
    } catch (error) {
      return next(new errorHandler(error.message), 500);
    }

    const withdraw = await Withdraw.create(data);
    const seller = await Seller.findById(req.seller._id);

    seller.availableBalance = seller.availableBalance - amount;

    await seller.save();
    res.status(201).json({
      success: true,
      withdraw,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.getAllWithdrawRequestsByAdmin = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  }
);

exports.updateWithdrawRequestStatusByAdmin = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { sellerId } = req.body;

      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: "succeed",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      const seller = await Seller.findById(sellerId);
      const transaction = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transactions = [...seller.transactions, transaction];
      await seller.save();

      try {
        await sendMail({
          email: seller.email,
          subject: "Withdrawal Payment Confirmation",
          name: seller.name,
          message: `Hello ${seller.name},

          We are pleased to inform you that your withdrawal request of $${withdraw.amount} has been processed and is on its way. The delivery time depends on your bank's policies and typically takes between 3 to 7 business days.

          Thank you for choosing our platform.`,
        });
      } catch (error) {
        return next(new errorHandler(error.message, 500));
      }
      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  }
);
