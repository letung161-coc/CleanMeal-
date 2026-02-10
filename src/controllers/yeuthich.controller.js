const { sql, poolPromise } = require("../db");

/**
 * POST /api/yeuthich/:maMon
 */
exports.add = async (req, res) => {
  try {
    const userId = req.user.userId;
    const maMon = parseInt(req.params.maMon, 10);

    if (!maMon) {
      return res.status(400).json({ message: "Thiếu mã món ăn" });
    }

    const pool = await poolPromise;

    // tránh thêm trùng
    const check = await pool
      .request()
      .input("UserID", sql.Int, userId)
      .input("MaMon", sql.Int, maMon).query(`
        SELECT 1 FROM YeuThich
        WHERE UserID = @UserID AND MaMon = @MaMon
      `);

    if (check.recordset.length > 0) {
      return res.status(409).json({ message: "Món ăn đã được yêu thích" });
    }

    await pool
      .request()
      .input("UserID", sql.Int, userId)
      .input("MaMon", sql.Int, maMon).query(`
        INSERT INTO YeuThich(UserID, MaMon, NgayLuu)
        VALUES (@UserID, @MaMon, GETDATE())
      `);

    res.json({ message: "Đã thêm vào yêu thích" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * DELETE /api/yeuthich/:maMon
 */
exports.remove = async (req, res) => {
  try {
    const userId = req.user.userId;
    const maMon = parseInt(req.params.maMon, 10);

    const pool = await poolPromise;

    await pool
      .request()
      .input("UserID", sql.Int, userId)
      .input("MaMon", sql.Int, maMon).query(`
        DELETE FROM YeuThich
        WHERE UserID = @UserID AND MaMon = @MaMon
      `);

    res.json({ message: "Đã xoá khỏi yêu thích" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * GET /api/yeuthich
 */
exports.getMyFavorite = async (req, res) => {
  try {
    const userId = req.user.userId;
    const pool = await poolPromise;

    const result = await pool.request().input("UserID", sql.Int, userId).query(`
        SELECT yt.MaMon, yt.NgayLuu, m.TenMon, m.MoTaNgan, m.ThoiGianNau, m.AnhDaiDien, m.TongCalo, m.SoNguoiAn
        FROM YeuThich yt
        JOIN MonAn m ON yt.MaMon = m.MaMon
        WHERE yt.UserID = @UserID
        ORDER BY yt.NgayLuu DESC
      `);

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
