const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.ObjectId,
    ref: 'Food',
    required: [true, 'A car item must belong to a food item'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A car item must belong to an user'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: [true, 'A food must have a price'],
  },
});

cartSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'food',
    select: 'title',
  });
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
