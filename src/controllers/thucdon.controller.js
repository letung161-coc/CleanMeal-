const { sql, poolPromise } = require("../db");

// POST /api/thucdon
exports.createThucDon = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { tenThucDon, ngayTao } = req.body;

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("TenThucDon", sql.NVarChar(100), tenThucDon || null)
      .input("NgayTao", sql.Date, ngayTao || new Date())
      .input("UserID", sql.Int, userId).query(`
        INSERT INTO ThucDon (TenThucDon, NgayTao, UserID)
        OUTPUT INSERTED.*
        VALUES (@TenThucDon, @NgayTao, @UserID)
      `);

    res.status(201).json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// GET /api/thucdon
exports.getMyThucDon = async (req, res) => {
  try {
    const userId = req.user.userId;
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("UserID", sql.Int, userId)
      .query("SELECT * FROM ThucDon WHERE UserID=@UserID ORDER BY NgayTao DESC");

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// DELETE /api/thucdon/:thucDonId
exports.deleteThucDon = async (req, res) => {
  try {
    const userId = req.user.userId;
    const thucDonId = parseInt(req.params.thucDonId, 10);
    const pool = await poolPromise;

    await pool
      .request()
      .input("ThucDonID", sql.Int, thucDonId)
      .input("UserID", sql.Int, userId)
      .query("DELETE FROM ThucDon WHERE ThucDonID=@ThucDonID AND UserID=@UserID");

    res.json({ message: "Đã xoá thực đơn" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// PUT /api/thucdon/:thucDonId
exports.updateThucDon = async (req, res) => {
  try {
    const userId = req.user.userId;
    const thucDonId = parseInt(req.params.thucDonId, 10);
    const { tenThucDon } = req.body;
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("ThucDonID", sql.Int, thucDonId)
      .input("UserID", sql.Int, userId)
      .input("TenThucDon", sql.NVarChar(100), tenThucDon).query(`
        UPDATE ThucDon
        SET TenThucDon=@TenThucDon
        WHERE ThucDonID=@ThucDonID AND UserID=@UserID;
        SELECT * FROM ThucDon WHERE ThucDonID=@ThucDonID AND UserID=@UserID;
      `);

    if (rs.recordset.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy thực đơn" });
    }

    res.json(rs.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// POST /api/thucdon/:thucDonId/monan
exports.addMonAnToThucDon = async (req, res) => {
  try {
    const thucDonId = parseInt(req.params.thucDonId, 10);
    const { maMon, buaAn, ngay } = req.body;

    const pool = await poolPromise;

    await pool
      .request()
      .input("ThucDonID", sql.Int, thucDonId)
      .input("MaMon", sql.Int, maMon)
      .input("BuaAn", sql.NVarChar(20), buaAn)
      .input("Ngay", sql.Date, ngay).query(`
        INSERT INTO ThucDon_MonAn (ThucDonID, MaMon, BuaAn, Ngay)
        VALUES (@ThucDonID, @MaMon, @BuaAn, @Ngay)
      `);

    res.status(201).json({ message: "Đã thêm món vào thực đơn" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// DELETE /api/thucdon/:thucDonId/monan
exports.removeMonAnFromThucDon = async (req, res) => {
  try {
    const thucDonId = parseInt(req.params.thucDonId, 10);
    const { maMon, buaAn, ngay } = req.body;

    const pool = await poolPromise;

    await pool
      .request()
      .input("ThucDonID", sql.Int, thucDonId)
      .input("MaMon", sql.Int, maMon)
      .input("BuaAn", sql.NVarChar(20), buaAn)
      .input("Ngay", sql.Date, ngay).query(`
        DELETE FROM ThucDon_MonAn
        WHERE ThucDonID=@ThucDonID AND MaMon=@MaMon AND BuaAn=@BuaAn AND Ngay=@Ngay
      `);

    res.json({ message: "Đã xoá món khỏi thực đơn" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// GET /api/thucdon/:thucDonId?ngay=... (xem chi tiết theo ngày)
exports.getThucDonDetail = async (req, res) => {
  try {
    const thucDonId = parseInt(req.params.thucDonId, 10);
    const { ngay } = req.query;
    const pool = await poolPromise;

    const header = await pool
      .request()
      .input("ThucDonID", sql.Int, thucDonId)
      .query("SELECT * FROM ThucDon WHERE ThucDonID=@ThucDonID");

    if (header.recordset.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy thực đơn" });
    }

    const request = pool
      .request()
      .input("ThucDonID", sql.Int, thucDonId)
      .input("Ngay", sql.Date, ngay || null);

    const query = ngay
      ? `
        SELECT tdm.*, m.TenMon, m.TongCalo, m.SoNguoiAn
        FROM ThucDon_MonAn tdm
        JOIN MonAn m ON tdm.MaMon = m.MaMon
        WHERE tdm.ThucDonID=@ThucDonID AND tdm.Ngay=@Ngay
      `
      : `
        SELECT tdm.*, m.TenMon, m.TongCalo, m.SoNguoiAn
        FROM ThucDon_MonAn tdm
        JOIN MonAn m ON tdm.MaMon = m.MaMon
        WHERE tdm.ThucDonID=@ThucDonID
      `;

    const detail = await request.query(query);

    res.json({
      ...header.recordset[0],
      ChiTiet: detail.recordset,
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};


