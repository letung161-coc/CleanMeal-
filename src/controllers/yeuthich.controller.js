const yeuthichService = require("../services/yeuthich.service");

exports.add = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    await yeuthichService.add({ userId: req.user.userId, maMon });
    res.json({ message: "Đã thêm vào yêu thích" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    await yeuthichService.remove({ userId: req.user.userId, maMon });
    res.json({ message: "Đã xoá khỏi yêu thích" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.getMyFavorite = async (req, res) => {
  try {
    const data = await yeuthichService.listByUser(req.user.userId);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
