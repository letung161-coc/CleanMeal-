const Joi = require("joi");

const monanBody = Joi.object({
  tenMon: Joi.string().min(2).max(100).required(),
  moTaNgan: Joi.string().max(255).allow(null, ""),
  thoiGianNau: Joi.number().integer().min(0).required(),
  anhDaiDien: Joi.string().max(255).allow(null, ""),
  tongCalo: Joi.number().integer().min(0).required(),
  soNguoiAn: Joi.number().integer().min(1).required(),
});

exports.createSchema = Joi.object({
  body: monanBody.required(),
  query: Joi.object().optional(),
  params: Joi.object().optional(),
});

exports.updateSchema = Joi.object({
  body: monanBody.required(),
  query: Joi.object().optional(),
  params: Joi.object({
    maMon: Joi.number().integer().required(),
  }).required(),
});


