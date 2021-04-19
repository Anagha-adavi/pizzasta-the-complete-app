const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = express(); //calling express() function  will add a bunch of methods to app
const morgan = require('morgan');
const foodRouter = require('./routes/foodRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const cors=require("cors");

const AppError = require('./utils/appError');
const globalErrorHandler = require('./utils/globalErrorHandler');

///////middlewares

////cors
app.use(cors());

//body parser
app.use(express.json());

//morgan request url logger
app.use(morgan('dev'));

//routing middlewares which need to be mounted further
app.use('/api/v1/food', foodRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/order', orderRouter);

//error handler for bad requests
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cannot find route ${req.originalUrl} on this server`, 400)
  );
});

//global error handler
app.use(globalErrorHandler);

module.exports = app;
