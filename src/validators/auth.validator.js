const Joi = require("joi");

exports.registerSchema = Joi.object({
  body: Joi.object({
    hoTen: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().max(100).required(),
    matKhau: Joi.string().min(6).max(100).required(),
  }).required(),
  query: Joi.object().optional(),
  params: Joi.object().optional(),
});

exports.loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().max(100).required(),
    matKhau: Joi.string().min(6).max(100).required(),
  }).required(),
  query: Joi.object().optional(),
  params: Joi.object().optional(),
});


