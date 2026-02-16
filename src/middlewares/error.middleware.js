const logger = require("../logger");

// Global error handler
module.exports = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    status: err.status || 500,
    path: req?.path,
  });
  const status = err.status || 500;
  const message =
    status === 500 ? "Lỗi server, vui lòng thử lại sau" : err.message;

  res.status(status).json({ message });
};


