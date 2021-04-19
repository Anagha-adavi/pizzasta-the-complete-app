const express = require('express');
const Router = express.Router({ mergeParams: true });
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

Router.route('/')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    cartController.createCartItemOnFood
  )
  .patch(authController.protect, cartController.updateCartItem)
  .get(authController.protect, cartController.getAllCartItems)
  .delete(authController.protect, cartController.placeOrderDeleteCartItems);

Router.route('/:id').delete(
  authController.protect,
  cartController.deleteCartItem
);

module.exports = Router;
