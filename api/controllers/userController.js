const jwt = require("jsonwebtoken");
const User = require("../models/User");
const cloudinary = require("cloudinary");
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
    const { name, email, password, avatar } = req.body;

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(
        new errorHandler("A user with this email already exists.", 400)
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

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: avatarObj,
    };

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
        new errorHandler("User does not exist with this email.", 401)
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
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.updateUserInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password, phoneNumber, name } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(
        new errorHandler("User does not exist with this email.", 400)
      );
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new errorHandler("Invalid Password.", 400));
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    if (password) {
      user.password = password;
    }

    await user.save();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.updateUserAvatar = catchAsyncErrors(async (req, res, next) => {
  try {
    let existsUser = await User.findById(req.user.id);
    if (req.body.avatar !== "") {
      const imageId = existsUser.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      });

      existsUser.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await existsUser.save();
    res.status(200).json({
      success: true,
      user: existsUser,
    });
  } catch (error) {
    if (req.file) {
      fs.unlink(`uploads/${req.file.filename}`, () => {});
    }
    return next(new errorHandler(error.message, 500));
  }
});

exports.updateUserAddresses = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === req.body.addressType
    );
    if (sameTypeAddress) {
      return next(
        new errorHandler(`${req.body.addressType} address already exists.`)
      );
    }

    const existsAddress = user.addresses.find(
      (address) => address._id === req.body._id
    );

    if (existsAddress) {
      Object.assign(existsAddress, req.body);
    } else {
      user.addresses.push(req.body);
    }

    await user.save();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.deleteUserAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      return next(
        new errorHandler("The old password you entered is incorrect.", 400)
      );
    }

    if (req.body.oldPassword === req.body.newPassword) {
      return next(
        new errorHandler(
          "New password cannot be the same as old password.",
          400
        )
      );
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        new errorHandler("New password and confirm password do not match.", 400)
      );
    }
    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.getUserInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.getAllUsersByAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});

exports.deleteUserByAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new errorHandler("User is not available with this id", 400));
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    return next(new errorHandler(error.message, 500));
  }
});
