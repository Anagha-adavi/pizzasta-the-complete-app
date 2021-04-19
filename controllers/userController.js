const User = require('../models/userModel');

//user purpose

const filterObj = (obj, ...allowedFields) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = async (req, res, next) => {
  try {
    const filteredBody = filterObj(req.body, 'name', 'email');

    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.deletMe = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

//adminstration purpose

exports.getAllUsers = async (req, res, next) => {
  try {
    const excludedFields = ['sort', 'page', 'limit', 'fields'];
    let queryObj = { ...req.query };
    excludedFields.forEach((el) => delete queryObj[el]);

    ////Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lte|gte|lt|gt)\b/g, (match) => `$${match}`);

    let query = User.find(JSON.parse(queryStr));

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

    const users = await query;

    if (!users.length) {
      return next(new AppError('No food found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError('No user found for that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    return next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new AppError('No tour found for that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new AppError('No tour found for that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    return next(err);
  }
};
