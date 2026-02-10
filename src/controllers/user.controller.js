const userService = require("../services/user.service");

exports.getMe = async (req, res) => {
  try {
    const data = await userService.getMe(req.user.userId);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
