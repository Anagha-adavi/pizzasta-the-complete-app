const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const reviewRouter = require('../routes/reviewRouter');
const cartRouter = require('../routes/cartRouter');

//for mergin the parameters
router.use('/:foodId/reviews', reviewRouter);
router.use('/:foodId/cart', cartRouter);

router
  .route('/')
  .get(authController.protect, foodController.getAllFood)
  .post(foodController.createFood);

router
  .route('/:id')
  .get(foodController.getFood)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    foodController.updateFood
  )
  .delete(foodController.deleteFood);

// router
//   .route('/:foodId/reviews')
//   .post(authController.protect, reviewController.createReview);

// router
//   .route('/:foodId/reviews')
//   .get(authController.protect, reviewController.getAllReviews);

module.exports = router;
