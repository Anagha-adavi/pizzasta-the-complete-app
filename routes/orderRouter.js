const express = require('express');
const Router = express.Router();
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

Router.route('/')
  .get(
    authController.protect,
    authController.restrictTo('user'),
    orderController.getAllOrders
  )
  .post(
    authController.protect,
    authController.restrictTo('user'),
    orderController.createOrder
  );

module.exports = Router;
