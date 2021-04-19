const Cart = require('../models/cartModel');
const Food = require('../models/foodModel');

const AppError = require('../utils/appError');

//create cart item based on food Item and also the user who has logged in
exports.createCartItemOnFood = async (req, res, next) => {
  try {
    if (!req.body.user) req.body.user = req.user.id;
    if (!req.body.food) req.body.food = req.params.foodId;
    const food = await Food.findById(req.params.foodId);
    req.body.price = food.price;
    
    const cartItems = await Cart.find({ user: req.user.id });

    // if (!cartItems.length) {
    //   return next(
    //     new AppError(
    //       'Your cart feels light.Fill it up with delicious food',
    //       404
    //     )
    //   );
    // }

  //   if(cartItems.length>0){
  //   cartItems.forEach((el)=>{
  //     if(el.food.id==req.params.foodId){
  //       res.redirect(`${req.protocol}://${req.get('host')}/api/v1/food/${req.params.foodId}/cart`)

  //     }
  //   })
  // }
  

      cart = await Cart.create(req.body);
      res.status(201).json({
        status: 'success',
         data: {
           cart,
         },
       });
      
    

  } catch (err) {
    next(err);
  }
};

//get all items in cart of a particular user
exports.getAllCartItems = async (req, res, next) => {
  try {
     const cartItems = await Cart.find({ user: req.user.id });

    let total = 0;
    const totalPrice = cartItems.forEach((el) => {
      total += el.price * el.quantity;
      return total;
    });

    let totalItemsInCart = 0;
    cartItems.forEach((el) => {
      totalItemsInCart += el.quantity;
      return totalItemsInCart;
    });

    res.status(200).json({
      status: 'success',
      totalItemsInCart,
      totalPrice: total,
      data: {
        cartItems,
      },
    });
  } catch (err) {
    next(err);
  }
};

//for deleting a single item in cart
exports.deleteCartItem = async (req, res, next) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);

    if (!cartItem) {
      return next(
        new AppError(
          'The item you are trying to delete no longer exists in cart',
          400
        )
      );
    }

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

//usually quantity
exports.updateCartItem = async (req, res, next) => {
  try {
    //for updating the data
    console.log(req.params,"Anagha 1")
    let foodItemOnCart = await Cart.findOne({
      food: req.params.foodId,
      user: req.user.id,
    });

    if (!foodItemOnCart) {
      return next(newAppError('Food Item does not exist', 400));
    }

    if(req.body.quantity){
      foodItemOnCart.quantity = req.body.quantity;
    }
    else{
      foodItemOnCart.quantity+=1
    }
    await foodItemOnCart.save({ validateBeforeSave: false });
    console.log(foodItemOnCart,"Anagha 3");

    
    // res.redirect(`${req.protocol}://${req.get('host')}/api/v1/cart`);
    res.status(200).json({
      status: 'success',
      data: {
        foodItemOnCart,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.placeOrderDeleteCartItems = async (req, res, next) => {
  try {
    const cartItems = await Cart.findOneAndDelete({ user: req.user.id });

    if (!cartItems) {
      return next(new AppError('No items in cart Found', 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Cart feels light .Buy items to fill it',
    });
  } catch (err) {
    next(err);
  }
};
