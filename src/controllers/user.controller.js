const { poolPromise } = require("../db");

exports.getMe = async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().input("UserID", req.user.userId).query(`
        SELECT UserID, HoTen, Email, VaiTro
        FROM users
        WHERE UserID=@UserID
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
