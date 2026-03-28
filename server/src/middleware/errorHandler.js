/**
 * Global error-handling middleware.
 * Express identifies error handlers by their 4-parameter signature.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  console.error(err.stack || err);

  const status = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message;

  res.status(status).json({ error: message });
};

module.exports = errorHandler;
