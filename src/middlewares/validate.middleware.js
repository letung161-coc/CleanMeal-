// Middleware validate dữ liệu với Joi
module.exports = (schema) => {
  return (req, res, next) => {
    const toValidate = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    const { error, value } = schema.validate(toValidate, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        message: "Dữ liệu không hợp lệ",
        details: error.details.map((d) => d.message),
      });
    }

    // gán lại dữ liệu đã được Joi làm sạch
    req.body = value.body || req.body;
    req.query = value.query || req.query;
    req.params = value.params || req.params;

    next();
  };
};


