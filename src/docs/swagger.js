const swaggerUi = require("swagger-ui-express");

// Spec đơn giản mô tả một số endpoint chính
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "CleanMeal API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:4000",
    },
  ],
  paths: {
    "/api/auth/register": {
      post: {
        summary: "Đăng ký tài khoản",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  hoTen: { type: "string" },
                  email: { type: "string" },
                  matKhau: { type: "string" },
                },
                required: ["hoTen", "email", "matKhau"],
              },
            },
          },
        },
        responses: {
          200: { description: "Đăng ký thành công" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "Đăng nhập",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  matKhau: { type: "string" },
                },
                required: ["email", "matKhau"],
              },
            },
          },
        },
        responses: {
          200: { description: "Đăng nhập thành công" },
        },
      },
    },
    "/api/monan": {
      get: {
        summary: "Danh sách món ăn",
        responses: {
          200: { description: "OK" },
        },
      },
      post: {
        summary: "Tạo món ăn (admin)",
        responses: {
          201: { description: "Tạo thành công" },
        },
      },
    },
  },
};

module.exports = {
  swaggerUi,
  swaggerDocument,
};


