const lichsuService = require("../services/lichsu.service");

exports.getMyHistory = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const data = await lichsuService.getMyHistory({
      userId: req.user.userId,
      page,
      limit,
    });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const searchId = parseInt(req.params.searchId, 10);
    await lichsuService.deleteOne({ userId: req.user.userId, searchId });
    res.json({ message: "Đã xoá lịch sử" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.clearAll = async (req, res) => {
  try {
    await lichsuService.clearAll(req.user.userId);
    res.json({ message: "Đã xoá toàn bộ lịch sử" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
