const Order = require("../models/Order");
const Seller = require("../models/Seller");
const Product = require("../models/Product");
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

exports.getUserOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({ "user._id": req.params.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.getSellerOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({
      "cart.sellerId": req.params.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new errorHandler("Order not found with this id.", 400));
    }
    if (req.body.status === "Transferred to delivery partner") {
      for (const o of order.cart) {
        await updateOrder(o.productId || o._id, o.qty);
      }
    }

    order.status = req.body.status;
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
      const serviceCharge = order.totalPrice * 0.1;
      await updateSellerInfo(order.totalPrice - serviceCharge);
      for (const o of order.cart) {
        await updateOrder(o.productId || o._id, o.qty);
      }
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      order,
    });

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);
      if (!product) return;
      product.stock -= qty;
      product.soldOut = (product.soldOut || 0) + qty;
      await product.save({ validateBeforeSave: false });
    }

    async function updateSellerInfo(amount) {
      const seller = await Seller.findById(req.seller.id);

      seller.availableBalance = amount;

      await seller.save();
    }
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.userRefundOrderRequest = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new errorHandler("Order not found with this id.", 400));
    }

    order.status = req.body.status;
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      order,
      message: "Order Refund Request successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.sellerRefundOrderSuccess = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new errorHandler("Order not found with this id.", 400));
    }

    order.status = req.body.status;
    await order.save();
    res.status(200).json({
      success: true,
      message: "Order Refund successfull!",
    });

    if (req.body.status === "Refund Success") {
      order.cart.forEach(async (o) => {
        await updateOrder(o._id, o.qty);
      });
    }

    async function updateOrder(id, qty) {
      const product = await Product.findById(id);

      product.stock += qty;
      product.soldOut -= qty;

      await product.save({ validateBeforeSave: false });
    }
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.getAllOrdersByAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find().sort({
      deliveredAt: -1,
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});
