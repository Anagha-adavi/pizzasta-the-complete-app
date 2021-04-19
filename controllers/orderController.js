const Order = require('../models/orderModel');
const AppError = require('../utils/appError');

exports.createOrder = async (req, res, next) => {
  try {
    if (!req.body.user) req.body.user = req.user.id;
    const order = await Order.create(req.body);

    if (!order) {
      return next(new AppError('Could not place order', 404));
    }

    res.status(201).json({
      status: 'success',
      order,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    if (!orders.length) {
      return next(new AppError('No orders have been placed till now', 400));
    }

    res.status(200).json({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (err) {
    next(err);
  }
};
