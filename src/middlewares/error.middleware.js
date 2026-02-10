// Global error handler
module.exports = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message =
    status === 500 ? "Lỗi server, vui lòng thử lại sau" : err.message;

  res.status(status).json({ message });
};


