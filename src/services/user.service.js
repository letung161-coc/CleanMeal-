const userRepo = require("../models/user.repository");

exports.getMe = async (userId) => {
  const user = await userRepo.findById(userId);
  if (!user) {
    const err = new Error("Không tìm thấy người dùng");
    err.status = 404;
    throw err;
  }
  return user;
};
