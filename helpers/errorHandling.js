exports.catchErrors = func => {
  return function(req, res, next) {
    return func(req, res, next).catch(next);
  };
};

exports.notFound = (req, res, next) => {
  const err = new Error(`The route: ${req.url} doesn't exsist.`);
  res.status(404);
  next(err);
};

exports.handleErrors = (err, req, res, next) => {
  res.json({
    error: true,
    message: err.message,
    status: res.statusCode
  });
};