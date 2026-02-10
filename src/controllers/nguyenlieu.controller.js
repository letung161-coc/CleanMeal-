const nguyenlieuService = require("../services/nguyenlieu.service");

exports.getNhomNguyenLieu = async (req, res) => {
  try {
    const data = await nguyenlieuService.listNhom();
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.createNhomNguyenLieu = async (req, res) => {
  try {
    const { tenNhom } = req.body;
    const data = await nguyenlieuService.createNhom(tenNhom);
    res.status(201).json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.updateNhomNguyenLieu = async (req, res) => {
  try {
    const nhomId = parseInt(req.params.nhomId, 10);
    const { tenNhom } = req.body;
    const data = await nguyenlieuService.updateNhom({ nhomId, tenNhom });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.deleteNhomNguyenLieu = async (req, res) => {
  try {
    const nhomId = parseInt(req.params.nhomId, 10);
    await nguyenlieuService.deleteNhom(nhomId);
    res.json({ message: "Đã xoá nhóm nguyên liệu" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.getNguyenLieuByNhom = async (req, res) => {
  try {
    const nhomId = parseInt(req.params.nhomId, 10);
    const data = await nguyenlieuService.listByNhom(nhomId);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.createNguyenLieu = async (req, res) => {
  try {
    const data = await nguyenlieuService.createNguyenLieu(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.updateNguyenLieu = async (req, res) => {
  try {
    const maNguyenLieu = parseInt(req.params.nguyenLieuId, 10);
    const data = await nguyenlieuService.updateNguyenLieu({ maNguyenLieu, ...req.body });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.deleteNguyenLieu = async (req, res) => {
  try {
    const maNguyenLieu = parseInt(req.params.nguyenLieuId, 10);
    await nguyenlieuService.deleteNguyenLieu(maNguyenLieu);
    res.json({ message: "Đã xoá nguyên liệu" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.addNguyenLieuToMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { maNguyenLieu, soLuong } = req.body;
    await nguyenlieuService.addNguyenLieuToMon({ maMon, maNguyenLieu, soLuong });
    res.json({ message: "Đã cập nhật nguyên liệu cho món" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.getBuocNau = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const data = await nguyenlieuService.listBuocNau(maMon);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.createBuocNau = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { soThuTuBuoc, noiDungBuoc } = req.body;
    const data = await nguyenlieuService.createBuocNau({ maMon, soThuTuBuoc, noiDungBuoc });
    res.status(201).json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.updateBuocNau = async (req, res) => {
  try {
    const buocNauId = parseInt(req.params.buocNauId, 10);
    const { soThuTuBuoc, noiDungBuoc } = req.body;
    const data = await nguyenlieuService.updateBuocNau({
      buocNauId,
      soThuTuBuoc,
      noiDungBuoc,
    });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.deleteBuocNau = async (req, res) => {
  try {
    const buocNauId = parseInt(req.params.buocNauId, 10);
    await nguyenlieuService.deleteBuocNau(buocNauId);
    res.json({ message: "Đã xoá bước nấu" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
