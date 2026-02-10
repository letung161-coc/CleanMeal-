const { sql, poolPromise } = require("../db");

// GET /api/lichsu?page=&limit=
exports.getMyHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = Number(page) > 0 ? Number(page) : 1;
    const limitNum = Number(limit) > 0 ? Number(limit) : 10;
    const offset = (pageNum - 1) * limitNum;

    const pool = await poolPromise;

    const [itemsRs, countRs] = await Promise.all([
      pool
        .request()
        .input("UserID", sql.Int, userId)
        .input("Offset", sql.Int, offset)
        .input("Limit", sql.Int, limitNum)
        .query(`
          SELECT *
          FROM LichSuTimKiem
          WHERE UserID=@UserID
          ORDER BY ThoiGian DESC
          OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY
        `),
      pool
        .request()
        .input("UserID", sql.Int, userId)
        .query(
          "SELECT COUNT(*) AS total FROM LichSuTimKiem WHERE UserID=@UserID",
        ),
    ]);

    const total = countRs.recordset[0].total;

    res.json({
      data: itemsRs.recordset,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// DELETE /api/lichsu/:searchId
exports.deleteOne = async (req, res) => {
  try {
    const userId = req.user.userId;
    const searchId = parseInt(req.params.searchId, 10);
    const pool = await poolPromise;

    await pool
      .request()
      .input("SearchID", sql.Int, searchId)
      .input("UserID", sql.Int, userId)
      .query("DELETE FROM LichSuTimKiem WHERE SearchID=@SearchID AND UserID=@UserID");

    res.json({ message: "Đã xoá lịch sử" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// DELETE /api/lichsu
exports.clearAll = async (req, res) => {
  try {
    const userId = req.user.userId;
    const pool = await poolPromise;

    await pool
      .request()
      .input("UserID", sql.Int, userId)
      .query("DELETE FROM LichSuTimKiem WHERE UserID=@UserID");

    res.json({ message: "Đã xoá toàn bộ lịch sử" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};


