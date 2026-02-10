const nguyenlieuRepo = require("../models/nguyenlieu.repository");
const buocnauRepo = require("../models/buocnau.repository");

// NhomNguyenLieu
exports.listNhom = async () => nguyenlieuRepo.listNhom();
exports.createNhom = async (tenNhom) => nguyenlieuRepo.createNhom(tenNhom);
exports.updateNhom = async ({ nhomId, tenNhom }) => {
  const updated = await nguyenlieuRepo.updateNhom({ nhomId, tenNhom });
  if (!updated) {
    const err = new Error("Không tìm thấy nhóm nguyên liệu");
    err.status = 404;
    throw err;
  }
  return updated;
};
exports.deleteNhom = async (nhomId) => nguyenlieuRepo.deleteNhom(nhomId);

// NguyenLieu
exports.listByNhom = async (nhomId) => nguyenlieuRepo.listByNhom(nhomId);
exports.createNguyenLieu = async (payload) => nguyenlieuRepo.create(payload);
exports.updateNguyenLieu = async ({ maNguyenLieu, ...payload }) => {
  const updated = await nguyenlieuRepo.update({ maNguyenLieu, ...payload });
  if (!updated) {
    const err = new Error("Không tìm thấy nguyên liệu");
    err.status = 404;
    throw err;
  }
  return updated;
};
exports.deleteNguyenLieu = async (maNguyenLieu) => nguyenlieuRepo.delete(maNguyenLieu);

// MonAn_NguyenLieu
exports.addNguyenLieuToMon = async ({ maMon, maNguyenLieu, soLuong }) => {
  await nguyenlieuRepo.addOrUpdateForMon({ maMon, maNguyenLieu, soLuong });
};

// BuocNau
exports.listBuocNau = async (maMon) => buocnauRepo.listByMon(maMon);
exports.createBuocNau = async ({ maMon, soThuTuBuoc, noiDungBuoc }) =>
  buocnauRepo.create({ maMon, soThuTuBuoc, noiDungBuoc });
exports.updateBuocNau = async ({ buocNauId, soThuTuBuoc, noiDungBuoc }) => {
  const updated = await buocnauRepo.update({ buocNauId, soThuTuBuoc, noiDungBuoc });
  if (!updated) {
    const err = new Error("Không tìm thấy bước nấu");
    err.status = 404;
    throw err;
  }
  return updated;
};
exports.deleteBuocNau = async (buocNauId) => buocnauRepo.delete(buocNauId);
