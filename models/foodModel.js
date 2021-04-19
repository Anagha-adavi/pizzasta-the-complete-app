const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A food must have a title'],
    },
    publisher: {
      type: String,
      required: [true, 'A food must have a publisher'],
    },
    ingredients: {
      type: [String],
      required: [true, 'A food must have ingredients'],
    },
    serves: {
      type: Number,
      required: [true, 'A food must have servings quantity'],
    },
    prepTime: {
      type: String,
      required: [true, 'A food must have preparation time'],
    },
    description: {
      type: String,
      required: [true, 'A food must have description'],
    },
    price: {
      type: Number,
      required: [true, 'A food must have price '],
    },
    ratingsAverage: {
      type: Number,
      required: [true, 'A food must have average rating'],
    },
    ratingsQuantity: {
      type: Number,
      required: [true, 'A food must have ratings quantity'],
    },
    imageCover: {
      type: String,
      required: [true, 'A food must have a cover image'],
    },
    images: {
      type: [String],
      required: [true, 'A food must images'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

foodSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'food',
  localField: '_id',
});

const Food = mongoose.model('Food', foodSchema);
// console.log(Food, 'testing food');
module.exports = Food;
