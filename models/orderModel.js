const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.ObjectId,
    ref: 'Food',
    required: [true, 'An order must belong to a food item'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'An order must belong to an user'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
