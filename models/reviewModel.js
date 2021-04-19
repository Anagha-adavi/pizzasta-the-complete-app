const mongoose = require('mongoose');

const Food = require('./foodModel');
console.log(Food, 'test model');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
  },
  rating: {
    type: Number,
    min: [1.0, 'Ratings cannot excced 1'],
    max: [5.0, 'Ratings cannot be more than 5'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  food: {
    type: mongoose.Schema.ObjectId,
    ref: 'Food',
    required: [true, 'A review must belong to a food'],
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A review must belong to an user'],
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'food',
    select: 'title imageCover',
  }).populate({
    path: 'user',
    select: 'name',
  });
  next();
});

reviewSchema.statics.getAverageRatings = async function (foodId) {
  console.log(foodId);
  const stats = await this.aggregate([
    {
      $match: { food: foodId },
    },
    {
      $group: {
        _id: '$food',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  if (stats.length > 0) {
    await Food.findByIdAndUpdate(foodId, {
      ratingsAverage: Math.round(stats[0].avgRating * 10) / 10,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await Food.findByIdAndUpdate(foodId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.getAverageRatings(this.food);
});

const Review = mongoose.model('Review', reviewSchema);

// console.log(Food, 'hello');

module.exports = Review;
