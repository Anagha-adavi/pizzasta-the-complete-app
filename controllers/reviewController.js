const Review = require('../models/reviewModel');
// const Food = require('../models/foodModel');

exports.createReview = async (req, res, next) => {
  try {
    if (!req.body.food) {
      console.log(req.params.foodId);
      req.body.food = req.params.foodId;
    }
    if (!req.body.user) {
      req.body.user = req.user.id;
    }

    const review = await Review.create(req.body);
    res.status(201).json({
      status: 'success',
      review,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllReviews = async (req, res, next) => {
  try {
    // console.log(Food, 'hi');
    let filter = {};
    if (req.params.foodId) filter = { food: req.params.foodId };
    const reviews = await Review.find(filter);
    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (err) {
    next(err);
  }
};
