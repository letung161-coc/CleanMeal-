const { sql, poolPromise } = require("../db");

// ====== LOẠI ẨM THỰC ======
exports.getLoaiAmThuc = async (req, res) => {
  try {
    const pool = await poolPromise;
    const rs = await pool.request().query("SELECT * FROM LoaiAmThuc");
    res.json(rs.recordset);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.createLoaiAmThuc = async (req, res) => {
  try {
    const { tenAmThuc } = req.body;
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("TenAmThuc", sql.NVarChar(50), tenAmThuc)
      .query(
        "INSERT INTO LoaiAmThuc (TenAmThuc) OUTPUT INSERTED.* VALUES (@TenAmThuc)",
      );

    res.status(201).json(rs.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.updateLoaiAmThuc = async (req, res) => {
  try {
    const id = parseInt(req.params.amThucId, 10);
    const { tenAmThuc } = req.body;
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("AmThucID", sql.Int, id)
      .input("TenAmThuc", sql.NVarChar(50), tenAmThuc).query(`
        UPDATE LoaiAmThuc SET TenAmThuc=@TenAmThuc WHERE AmThucID=@AmThucID;
        SELECT * FROM LoaiAmThuc WHERE AmThucID=@AmThucID;
      `);

    if (rs.recordset.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy loại ẩm thực" });
    }

    res.json(rs.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.deleteLoaiAmThuc = async (req, res) => {
  try {
    const id = parseInt(req.params.amThucId, 10);
    const pool = await poolPromise;

    await pool
      .request()
      .input("AmThucID", sql.Int, id)
      .query("DELETE FROM LoaiAmThuc WHERE AmThucID=@AmThucID");

    res.json({ message: "Đã xoá loại ẩm thực" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Gán / huỷ gán món - loại ẩm thực
exports.addAmThucToMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { amThucId } = req.body;
    const pool = await poolPromise;

    await pool
      .request()
      .input("MaMon", sql.Int, maMon)
      .input("AmThucID", sql.Int, amThucId)
      .query(
        "INSERT INTO MonAn_LoaiAmThuc (MaMon, AmThucID) VALUES (@MaMon, @AmThucID)",
      );

    res.status(201).json({ message: "Đã gán loại ẩm thực cho món" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.removeAmThucFromMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { amThucId } = req.body;
    const pool = await poolPromise;

    await pool
      .request()
      .input("MaMon", sql.Int, maMon)
      .input("AmThucID", sql.Int, amThucId)
      .query(
        "DELETE FROM MonAn_LoaiAmThuc WHERE MaMon=@MaMon AND AmThucID=@AmThucID",
      );

    res.json({ message: "Đã huỷ gán loại ẩm thực khỏi món" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ====== CHẾ ĐỘ ĂN ======
exports.getCheDoAn = async (req, res) => {
  try {
    const pool = await poolPromise;
    const rs = await pool.request().query("SELECT * FROM CheDoAn");
    res.json(rs.recordset);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.createCheDoAn = async (req, res) => {
  try {
    const { cheDoAn } = req.body;
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("CheDoAn", sql.NVarChar(50), cheDoAn)
      .query(
        "INSERT INTO CheDoAn (CheDoAn) OUTPUT INSERTED.* VALUES (@CheDoAn)",
      );

    res.status(201).json(rs.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.updateCheDoAn = async (req, res) => {
  try {
    const id = parseInt(req.params.cheDoId, 10);
    const { cheDoAn } = req.body;
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("CheDoID", sql.Int, id)
      .input("CheDoAn", sql.NVarChar(50), cheDoAn).query(`
        UPDATE CheDoAn SET CheDoAn=@CheDoAn WHERE CheDoID=@CheDoID;
        SELECT * FROM CheDoAn WHERE CheDoID=@CheDoID;
      `);

    if (rs.recordset.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy chế độ ăn" });
    }

    res.json(rs.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.deleteCheDoAn = async (req, res) => {
  try {
    const id = parseInt(req.params.cheDoId, 10);
    const pool = await poolPromise;

    await pool
      .request()
      .input("CheDoID", sql.Int, id)
      .query("DELETE FROM CheDoAn WHERE CheDoID=@CheDoID");

    res.json({ message: "Đã xoá chế độ ăn" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.addCheDoToMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { cheDoId } = req.body;
    const pool = await poolPromise;

    await pool
      .request()
      .input("MaMon", sql.Int, maMon)
      .input("CheDoID", sql.Int, cheDoId)
      .query(
        "INSERT INTO MonAn_CheDoAn (MaMon, CheDoID) VALUES (@MaMon, @CheDoID)",
      );

    res.status(201).json({ message: "Đã gán chế độ ăn cho món" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.removeCheDoFromMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { cheDoId } = req.body;
    const pool = await poolPromise;

    await pool
      .request()
      .input("MaMon", sql.Int, maMon)
      .input("CheDoID", sql.Int, cheDoId)
      .query(
        "DELETE FROM MonAn_CheDoAn WHERE MaMon=@MaMon AND CheDoID=@CheDoID",
      );

    res.json({ message: "Đã huỷ gán chế độ ăn khỏi món" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ====== LOẠI BỮA ĂN ======
exports.getLoaiBuaAn = async (req, res) => {
  try {
    const pool = await poolPromise;
    const rs = await pool.request().query("SELECT * FROM LoaiBuaAn");
    res.json(rs.recordset);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.createLoaiBuaAn = async (req, res) => {
  try {
    const { buaAn } = req.body;
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("BuaAn", sql.NVarChar(20), buaAn)
      .query(
        "INSERT INTO LoaiBuaAn (BuaAn) OUTPUT INSERTED.* VALUES (@BuaAn)",
      );

    res.status(201).json(rs.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.updateLoaiBuaAn = async (req, res) => {
  try {
    const id = parseInt(req.params.buaAnId, 10);
    const { buaAn } = req.body;
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("BuaAnID", sql.Int, id)
      .input("BuaAn", sql.NVarChar(20), buaAn).query(`
        UPDATE LoaiBuaAn SET BuaAn=@BuaAn WHERE BuaAnID=@BuaAnID;
        SELECT * FROM LoaiBuaAn WHERE BuaAnID=@BuaAnID;
      `);

    if (rs.recordset.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy loại bữa ăn" });
    }

    res.json(rs.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.deleteLoaiBuaAn = async (req, res) => {
  try {
    const id = parseInt(req.params.buaAnId, 10);
    const pool = await poolPromise;

    await pool
      .request()
      .input("BuaAnID", sql.Int, id)
      .query("DELETE FROM LoaiBuaAn WHERE BuaAnID=@BuaAnID");

    res.json({ message: "Đã xoá loại bữa ăn" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.addBuaAnToMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { buaAnId } = req.body;
    const pool = await poolPromise;

    await pool
      .request()
      .input("MaMon", sql.Int, maMon)
      .input("BuaAnID", sql.Int, buaAnId)
      .query(
        "INSERT INTO MonAn_BuaAn (MaMon, BuaAnID) VALUES (@MaMon, @BuaAnID)",
      );

    res.status(201).json({ message: "Đã gán loại bữa ăn cho món" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.removeBuaAnFromMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { buaAnId } = req.body;
    const pool = await poolPromise;

    await pool
      .request()
      .input("MaMon", sql.Int, maMon)
      .input("BuaAnID", sql.Int, buaAnId)
      .query(
        "DELETE FROM MonAn_BuaAn WHERE MaMon=@MaMon AND BuaAnID=@BuaAnID",
      );

    res.json({ message: "Đã huỷ gán loại bữa ăn khỏi món" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};


