const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const Seller = require("../models/Seller");
const sendMail = require("../utils/sendMail");
const sendSellerToken = require("../utils/sellerToken");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

exports.registerSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, avatar, address, phoneNumber, zipCode } =
      req.body;

    const sellerEmail = await Seller.findOne({ email });
    if (sellerEmail) {
      return next(
        new errorHandler("Seller already registered with this email.", 400)
      );
    }

    let avatarObj;
    if (avatar) {
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      avatarObj = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } else {
      avatarObj = {
        public_id: "default_avatar",
        url: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      };
    }

    const seller = {
      name,
      email,
      password,
      avatar: avatarObj,
      address,
      phoneNumber,
      zipCode,
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `${process.env.FRONTEND_URL}/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your seller account",
        name: seller.name,
        activationUrl,
        message: `Hello ${seller.name}, please click on the link to activate your seller: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your seller!`,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new errorHandler(error.message, 400));
  }
});

exports.activateSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const seller = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );
    if (!seller) {
      return next(new errorHandler("Invalid activation token.", 400));
    }

    const { name, email, password, avatar, zipCode, address, phoneNumber } =
      seller;

    const sellerEmail = await Seller.findOne({ email });
    if (sellerEmail) {
      return next(
        new errorHandler("Seller already registered with this email.", 400)
      );
    }

    const newSeller = await Seller.create({
      name,
      email,
      avatar,
      password,
      zipCode,
      address,
      phoneNumber,
    });

    sendSellerToken(newSeller, 201, res);
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.loginSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new errorHandler("Please provide all required fields.", 400));
    }

    const user = await Seller.findOne({ email }).select("+password");
    if (!user) {
      return next(
        new errorHandler("Seller does not exist with this email.", 400)
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new errorHandler("Invalid Password.", 400));
    }

    sendSellerToken(user, 201, res);
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.getSellerProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.seller._id);
    if (!seller) {
      return next(new errorHandler("Seller does not exist.", 400));
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.logoutSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.getSellerInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return next(new errorHandler("Seller does not exist.", 400));
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.updateSellerAvatar = catchAsyncErrors(async (req, res, next) => {
  try {
    const existsSeller = await Seller.findById(req.seller._id);
    if (!existsSeller) {
      return next(new errorHandler("Seller does not exist.", 400));
    }

    const imageId = existsSeller.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
    });

    existsSeller.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    await existsSeller.save();
    res.status(200).json({
      success: true,
      seller: existsSeller,
    });
  } catch (error) {
    if (req.file) {
      fs.unlink(`uploads/${req.file.filename}`, () => {});
    }
    return next(new errorHandler(error.message, 500));
  }
});

exports.updateSellerInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, description, address, phoneNumber, zipCode, password } =
      req.body;

    const seller = await Seller.findById(req.seller._id).select("+password");
    if (!seller) {
      return next(new errorHandler("User not found", 400));
    }
    const isPasswordValid = await seller.comparePassword(password);
    if (!isPasswordValid) {
      return next(new errorHandler("Invalid password.", 400));
    }
    seller.name = name;
    seller.description = description;
    seller.address = address;
    seller.phoneNumber = phoneNumber;
    seller.zipCode = zipCode;
    await seller.save();
    res.status(201).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.updateSellerWithdrawMethod = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;
      const seller = await Seller.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  }
);

exports.deleteSellerWithdrawMethod = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const seller = await Seller.findById(req.seller._id);
      if (!seller) {
        return next(new errorHandler("Seller not found with this id.", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();
      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  }
);

exports.getAllSellersByAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const sellers = await Seller.find().sort({
      createdAt: -1,
    });

    res.status(201).json({
      success: true,
      sellers,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.deleteSellerByAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return next(new errorHandler("Seller is not found with this id.", 400));
    }

    await Seller.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      message: "Seller deleted successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});
