const User = require('../models/userModel');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
const { Z_BLOCK } = require('zlib');

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: '90d',
  });
  return token;
};



const createAndSendToken = async (statusCode, user, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);

  const decodedPayload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_TOKEN
  );

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    createAndSendToken(201, user, res);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    //get the user
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    //check if user exists
    if (!user && !(await user.comparePasswords(password, user.password))) {
      return next(new AppError('Not a valid user', 400));
    }

    //response
    createAndSendToken(200, user, res);
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    //check if user has logged in
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token)
      return next(
        new AppError('You not have logged in.Please login to get access', 400)
      );

    //check if the token was modified
    const decodedPayload = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_TOKEN
    );

    //check if user still exists
    const user = await User.findById(decodedPayload.id);

    //check if user changed password
    if (user.changedPassword(decodedPayload.iat)) {
      return next(
        new AppError('Password was changed recently.Login again', 400)
      );
    }

    //assign user to request body
    req.user = user;
    next();
  } catch (err) {
    console.log(err);

    next(err);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(new AppError('Your are not allowed to perform this action', 400));
    }
    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  //Get the user from email
  const user = await User.findOne({ email: req.body.email });

  //create the tokem for the user
  const resetToken = user.createResetToken();
  await user.save({ validateBeforeSave: false });

  //set the reset link and send the mail
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/resetPassword/${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'password reset url',
      text: `Put a patch request on this url ${resetUrl}`,
    });

    //respond to the request
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpiresIn = undefined;
    await user.save({ validateBeforeSave: false });
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    //get the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    //get the user based
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpiresIn: { $gt: Date.now() },
    });

    //verify th user
    if (!user) {
      return next(new AppError('Invalid token', 400));
    }

    //reset the passwords
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpiresIn = undefined;

    await user.save();

    //send response
    createAndSendToken(200, user, res);
  } catch (err) {
    next(err);
  }
};

exports.updateMyPassword = async (req, res, next) => {
  try {
    const { currentPassword, confirmPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return next(new AppError('Please log in to updatePassowrd', 404));
    }

    if (!(await user.comparePasswords(currentPassword, user.password))) {
      return next(new AppError('Incorrect password!Please try again', 400));
    }

    user.password = newPassword;
    user.confirmPassword = confirmPassword;
    await user.save();

    createAndSendToken(200, user, res);
  } catch (err) {
    next(err);
  }
};
