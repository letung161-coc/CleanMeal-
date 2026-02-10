const phanloaiService = require("../services/phanloai.service");

// LoaiAmThuc
exports.getLoaiAmThuc = async (req, res) => {
  try {
    const data = await phanloaiService.listLoaiAmThuc();
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.createLoaiAmThuc = async (req, res) => {
  try {
    const { tenAmThuc } = req.body;
    const data = await phanloaiService.createLoaiAmThuc(tenAmThuc);
    res.status(201).json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.updateLoaiAmThuc = async (req, res) => {
  try {
    const amThucId = parseInt(req.params.amThucId, 10);
    const { tenAmThuc } = req.body;
    const data = await phanloaiService.updateLoaiAmThuc({ amThucId, tenAmThuc });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.deleteLoaiAmThuc = async (req, res) => {
  try {
    const amThucId = parseInt(req.params.amThucId, 10);
    await phanloaiService.deleteLoaiAmThuc(amThucId);
    res.json({ message: "Đã xoá loại ẩm thực" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.addAmThucToMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { amThucId } = req.body;
    await phanloaiService.addAmThucToMon({ maMon, amThucId });
    res.status(201).json({ message: "Đã gán loại ẩm thực cho món" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.removeAmThucFromMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { amThucId } = req.body;
    await phanloaiService.removeAmThucFromMon({ maMon, amThucId });
    res.json({ message: "Đã huỷ gán loại ẩm thực khỏi món" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// CheDoAn
exports.getCheDoAn = async (req, res) => {
  try {
    const data = await phanloaiService.listCheDoAn();
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.createCheDoAn = async (req, res) => {
  try {
    const { cheDoAn } = req.body;
    const data = await phanloaiService.createCheDoAn(cheDoAn);
    res.status(201).json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.updateCheDoAn = async (req, res) => {
  try {
    const cheDoId = parseInt(req.params.cheDoId, 10);
    const { cheDoAn } = req.body;
    const data = await phanloaiService.updateCheDoAn({ cheDoId, cheDoAn });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.deleteCheDoAn = async (req, res) => {
  try {
    const cheDoId = parseInt(req.params.cheDoId, 10);
    await phanloaiService.deleteCheDoAn(cheDoId);
    res.json({ message: "Đã xoá chế độ ăn" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.addCheDoToMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { cheDoId } = req.body;
    await phanloaiService.addCheDoToMon({ maMon, cheDoId });
    res.status(201).json({ message: "Đã gán chế độ ăn cho món" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.removeCheDoFromMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { cheDoId } = req.body;
    await phanloaiService.removeCheDoFromMon({ maMon, cheDoId });
    res.json({ message: "Đã huỷ gán chế độ ăn khỏi món" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// LoaiBuaAn
exports.getLoaiBuaAn = async (req, res) => {
  try {
    const data = await phanloaiService.listLoaiBuaAn();
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.createLoaiBuaAn = async (req, res) => {
  try {
    const { buaAn } = req.body;
    const data = await phanloaiService.createLoaiBuaAn(buaAn);
    res.status(201).json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.updateLoaiBuaAn = async (req, res) => {
  try {
    const buaAnId = parseInt(req.params.buaAnId, 10);
    const { buaAn } = req.body;
    const data = await phanloaiService.updateLoaiBuaAn({ buaAnId, buaAn });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.deleteLoaiBuaAn = async (req, res) => {
  try {
    const buaAnId = parseInt(req.params.buaAnId, 10);
    await phanloaiService.deleteLoaiBuaAn(buaAnId);
    res.json({ message: "Đã xoá loại bữa ăn" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.addBuaAnToMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { buaAnId } = req.body;
    await phanloaiService.addBuaAnToMon({ maMon, buaAnId });
    res.status(201).json({ message: "Đã gán loại bữa ăn cho món" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.removeBuaAnFromMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { buaAnId } = req.body;
    await phanloaiService.removeBuaAnFromMon({ maMon, buaAnId });
    res.json({ message: "Đã huỷ gán loại bữa ăn khỏi món" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
