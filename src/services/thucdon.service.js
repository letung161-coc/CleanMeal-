const thucdonRepo = require("../models/thucdon.repository");
const thucdonMonAnRepo = require("../models/thucdon-monan.repository");

exports.create = async ({ userId, tenThucDon, ngayTao }) => {
  return thucdonRepo.insert({ tenThucDon, ngayTao, userId });
};

exports.listByUser = async (userId) => {
  return thucdonRepo.listByUser(userId);
};

exports.update = async ({ userId, thucDonId, tenThucDon }) => {
  const updated = await thucdonRepo.updateName({ thucDonId, userId, tenThucDon });
  if (!updated) {
    const err = new Error("Không tìm thấy thực đơn");
    err.status = 404;
    throw err;
  }
  return updated;
};

exports.remove = async ({ userId, thucDonId }) => {
  await thucdonRepo.remove({ thucDonId, userId });
};

exports.addMonAn = async ({ thucDonId, maMon, buaAn, ngay }) => {
  await thucdonMonAnRepo.add({ thucDonId, maMon, buaAn, ngay });
};

exports.removeMonAn = async ({ thucDonId, maMon, buaAn, ngay }) => {
  await thucdonMonAnRepo.remove({ thucDonId, maMon, buaAn, ngay });
};

exports.getDetail = async ({ thucDonId, ngay }) => {
  const header = await thucdonRepo.findById(thucDonId);
  if (!header) {
    const err = new Error("Không tìm thấy thực đơn");
    err.status = 404;
    throw err;
  }
  const ChiTiet = await thucdonMonAnRepo.listDetail({ thucDonId, ngay });
  return { ...header, ChiTiet };
};
