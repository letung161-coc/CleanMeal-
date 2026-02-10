const lichsuRepo = require("../models/lichsu.repository");

exports.getMyHistory = async ({ userId, page = 1, limit = 10 }) => {
  const pageNum = Number(page) > 0 ? Number(page) : 1;
  const limitNum = Number(limit) > 0 ? Number(limit) : 10;
  const offset = (pageNum - 1) * limitNum;

  const [data, total] = await Promise.all([
    lichsuRepo.listByUserPaged({ userId, offset, limit: limitNum }),
    lichsuRepo.countByUser(userId),
  ]);

  return {
    data,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};

exports.deleteOne = async ({ userId, searchId }) => {
  await lichsuRepo.deleteOne({ userId, searchId });
};

exports.clearAll = async (userId) => {
  await lichsuRepo.clearAll(userId);
};
