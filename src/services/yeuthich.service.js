const yeuthichRepo = require("../models/yeuthich.repository");

exports.add = async ({ userId, maMon }) => {
  if (!maMon) {
    const err = new Error("Thiếu mã món ăn");
    err.status = 400;
    throw err;
  }
  const exists = await yeuthichRepo.exists({ userId, maMon });
  if (exists) {
    const err = new Error("Món ăn đã được yêu thích");
    err.status = 409;
    throw err;
  }
  await yeuthichRepo.add({ userId, maMon });
};

exports.remove = async ({ userId, maMon }) => {
  await yeuthichRepo.remove({ userId, maMon });
};

exports.listByUser = async (userId) => {
  return yeuthichRepo.listByUser(userId);
};
