const errorHandler = (err, req, res, next) => {
  console.error('Error: ', err);

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message,

    // Stack pois sitten, kun ollaan saatu tehtyä koodi loppuun
    stack: err.stack,
  });
};

export default errorHandler;
