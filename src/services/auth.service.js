const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("../models/user.repository");

exports.register = async ({ hoTen, email, matKhau }) => {
  if (!hoTen || !email || !matKhau) {
    const error = new Error("Thiếu họ tên, email hoặc mật khẩu");
    error.status = 400;
    throw error;
  }

  const existed = await userRepo.isEmailExists(email);
  if (existed) {
    const error = new Error("Email đã tồn tại");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(matKhau, 10);
  const user = await userRepo.createUser({
    hoTen,
    email,
    matKhau: hashedPassword,
    vaiTro: "user",
  });

  return {
    userId: user.UserID,
    hoTen: user.HoTen,
    email: user.Email,
    vaiTro: user.VaiTro,
  };
};

exports.login = async ({ email, matKhau }) => {
  if (!email || !matKhau) {
    const error = new Error("Thiếu email hoặc mật khẩu");
    error.status = 400;
    throw error;
  }

  const user = await userRepo.findByEmail(email);
  if (!user) {
    const error = new Error("Sai tài khoản hoặc mật khẩu");
    error.status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(matKhau, user.MatKhau);
  if (!isMatch) {
    const error = new Error("Sai tài khoản hoặc mật khẩu");
    error.status = 401;
    throw error;
  }

  const payload = { userId: user.UserID, role: user.VaiTro };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return {
    token,
    user: {
      userId: user.UserID,
      hoTen: user.HoTen,
      email: user.Email,
      vaiTro: user.VaiTro,
    },
  };
};


