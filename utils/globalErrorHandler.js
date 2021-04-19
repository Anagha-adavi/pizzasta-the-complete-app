const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status || "Error",
    error: {
      name: err.name,
      error: err,
      message: err.message,
      stack: err.stack,
    },
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else {
    sendErrorProd(err, req, res);
  }
};
