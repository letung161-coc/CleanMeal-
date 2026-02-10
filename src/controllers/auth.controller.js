const authService = require("../services/auth.service");

/* ========= REGISTER ========= */
exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.json({ message: "Đăng ký thành công", user: result });
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

/* ========= LOGIN ========= */
exports.login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body);
    res.json({ message: "Đăng nhập thành công", token, user });
  } catch (err) {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message });
  }
};
