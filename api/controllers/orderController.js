const Order = require("../models/Order");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    const sellerItemsMap = new Map();
    for (const item of cart) {
      const sellerId = item.sellerId;
      if (!sellerItemsMap.has(sellerId)) {
        sellerItemsMap.set(sellerId, []);
      }
      sellerItemsMap.get(sellerId).push(item);
    }

    const orders = [];

    for (const [sellerId, items] of sellerItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});
