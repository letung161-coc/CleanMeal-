const thucdonService = require("../services/thucdon.service");

exports.createThucDon = async (req, res) => {
  try {
    const { tenThucDon, ngayTao } = req.body;
    const data = await thucdonService.create({
      userId: req.user.userId,
      tenThucDon,
      ngayTao,
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.getMyThucDon = async (req, res) => {
  try {
    const data = await thucdonService.listByUser(req.user.userId);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.updateThucDon = async (req, res) => {
  try {
    const thucDonId = parseInt(req.params.thucDonId, 10);
    const { tenThucDon } = req.body;
    const data = await thucdonService.update({
      userId: req.user.userId,
      thucDonId,
      tenThucDon,
    });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.deleteThucDon = async (req, res) => {
  try {
    const thucDonId = parseInt(req.params.thucDonId, 10);
    await thucdonService.remove({ userId: req.user.userId, thucDonId });
    res.json({ message: "Đã xoá thực đơn" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.addMonAnToThucDon = async (req, res) => {
  try {
    const thucDonId = parseInt(req.params.thucDonId, 10);
    const { maMon, buaAn, ngay } = req.body;
    await thucdonService.addMonAn({ thucDonId, maMon, buaAn, ngay });
    res.status(201).json({ message: "Đã thêm món vào thực đơn" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.removeMonAnFromThucDon = async (req, res) => {
  try {
    const thucDonId = parseInt(req.params.thucDonId, 10);
    const { maMon, buaAn, ngay } = req.body;
    await thucdonService.removeMonAn({ thucDonId, maMon, buaAn, ngay });
    res.json({ message: "Đã xoá món khỏi thực đơn" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.getThucDonDetail = async (req, res) => {
  try {
    const thucDonId = parseInt(req.params.thucDonId, 10);
    const { ngay } = req.query;
    const data = await thucdonService.getDetail({ thucDonId, ngay });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
