const express = require('express');
const Router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

//user purpose
Router.post('/signup', authController.signUp);
Router.post('/login', authController.login);
Router.post('/forgotpassword', authController.forgotPassword);
Router.post('/resetpassword/:resetToken', authController.resetPassword);
Router.post(
  '/updatemypassword',
  authController.protect,
  authController.updateMyPassword
);
Router.post('/updateme', authController.protect, userController.updateMe);

//administration purpose
Router.use(authController.protect, authController.restrictTo('admin'));
Router.route('/').get(userController.getAllUsers);
Router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
