const Food = require('../models/foodModel');
const AppError = require('../utils/appError');

exports.getAllFood = async (req, res, next) => {
  try {
    //Querying

    ////filtering
    const excludedFields = ['sort', 'page', 'limit', 'fields'];
    let queryObj = { ...req.query };
    excludedFields.forEach((el) => delete queryObj[el]);

    ////Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lte|gte|lt|gt)\b/g, (match) => `$${match}`);

    let query = Food.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    if (req.query.limit || req.query.page) {
      const limit = req.query.limit * 1;
      const page = req.query.page * 1;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
    }

    const foods = await query;

    if (!foods.length) {
      return next(new AppError('No tour found', 404));
    }

    res.status(200).json({
      status: 'success',
      result: foods.length,
      data: {
        foods,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.getFood = async (req, res, next) => {
  try {

    const food = await Food.findById(req.params.id).populate('reviews');

    if (!food) {
      return next(new AppError('No tour found for that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        food,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.createFood = async (req, res, next) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        food,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.updateFood = async (req, res, next) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!food) {
      return next(new AppError('No tour found for that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        food,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteFood = async (req, res, next) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return next(new AppError('No tour found for that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: {
        food,
      },
    });
  } catch (err) {
    return next(err);
  }
};
