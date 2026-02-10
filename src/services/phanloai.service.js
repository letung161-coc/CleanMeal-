const phanloaiRepo = require("../models/phanloai.repository");

// LoaiAmThuc
exports.listLoaiAmThuc = () => phanloaiRepo.listLoaiAmThuc();
exports.createLoaiAmThuc = (tenAmThuc) => phanloaiRepo.createLoaiAmThuc(tenAmThuc);
exports.updateLoaiAmThuc = async ({ amThucId, tenAmThuc }) => {
  const updated = await phanloaiRepo.updateLoaiAmThuc({ amThucId, tenAmThuc });
  if (!updated) {
    const err = new Error("Không tìm thấy loại ẩm thực");
    err.status = 404;
    throw err;
  }
  return updated;
};
exports.deleteLoaiAmThuc = (amThucId) => phanloaiRepo.deleteLoaiAmThuc(amThucId);
exports.addAmThucToMon = ({ maMon, amThucId }) =>
  phanloaiRepo.addLoaiAmThucToMon({ maMon, amThucId });
exports.removeAmThucFromMon = ({ maMon, amThucId }) =>
  phanloaiRepo.removeLoaiAmThucFromMon({ maMon, amThucId });

// CheDoAn
exports.listCheDoAn = () => phanloaiRepo.listCheDoAn();
exports.createCheDoAn = (cheDoAn) => phanloaiRepo.createCheDoAn(cheDoAn);
exports.updateCheDoAn = async ({ cheDoId, cheDoAn }) => {
  const updated = await phanloaiRepo.updateCheDoAn({ cheDoId, cheDoAn });
  if (!updated) {
    const err = new Error("Không tìm thấy chế độ ăn");
    err.status = 404;
    throw err;
  }
  return updated;
};
exports.deleteCheDoAn = (cheDoId) => phanloaiRepo.deleteCheDoAn(cheDoId);
exports.addCheDoToMon = ({ maMon, cheDoId }) => phanloaiRepo.addCheDoToMon({ maMon, cheDoId });
exports.removeCheDoFromMon = ({ maMon, cheDoId }) =>
  phanloaiRepo.removeCheDoFromMon({ maMon, cheDoId });

// LoaiBuaAn
exports.listLoaiBuaAn = () => phanloaiRepo.listLoaiBuaAn();
exports.createLoaiBuaAn = (buaAn) => phanloaiRepo.createLoaiBuaAn(buaAn);
exports.updateLoaiBuaAn = async ({ buaAnId, buaAn }) => {
  const updated = await phanloaiRepo.updateLoaiBuaAn({ buaAnId, buaAn });
  if (!updated) {
    const err = new Error("Không tìm thấy loại bữa ăn");
    err.status = 404;
    throw err;
  }
  return updated;
};
exports.deleteLoaiBuaAn = (buaAnId) => phanloaiRepo.deleteLoaiBuaAn(buaAnId);
exports.addBuaAnToMon = ({ maMon, buaAnId }) =>
  phanloaiRepo.addLoaiBuaAnToMon({ maMon, buaAnId });
exports.removeBuaAnFromMon = ({ maMon, buaAnId }) =>
  phanloaiRepo.removeLoaiBuaAnFromMon({ maMon, buaAnId });
