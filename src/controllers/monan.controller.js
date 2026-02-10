const { sql, poolPromise } = require("../db");
const monanService = require("../services/monan.service");

/* ===== GET ALL ===== */
exports.getAllMonAn = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const data = await monanService.getAll({ page, limit });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===== LỌC THEO LOẠI ẨM THỰC / CHẾ ĐỘ / BỮA ĂN ===== */
exports.getByLoaiAmThuc = async (req, res) => {
  try {
    const amThucId = parseInt(req.params.amThucId, 10);
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("AmThucID", sql.Int, amThucId)
      .query(`
        SELECT m.*
        FROM MonAn m
        JOIN MonAn_LoaiAmThuc ml ON m.MaMon = ml.MaMon
        WHERE ml.AmThucID = @AmThucID
      `);

    res.json(rs.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByCheDoAn = async (req, res) => {
  try {
    const cheDoId = parseInt(req.params.cheDoId, 10);
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("CheDoID", sql.Int, cheDoId)
      .query(`
        SELECT m.*
        FROM MonAn m
        JOIN MonAn_CheDoAn mc ON m.MaMon = mc.MaMon
        WHERE mc.CheDoID = @CheDoID
      `);

    res.json(rs.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByLoaiBuaAn = async (req, res) => {
  try {
    const buaAnId = parseInt(req.params.buaAnId, 10);
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("BuaAnID", sql.Int, buaAnId)
      .query(`
        SELECT m.*
        FROM MonAn m
        JOIN MonAn_BuaAn mb ON m.MaMon = mb.MaMon
        WHERE mb.BuaAnID = @BuaAnID
      `);

    res.json(rs.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ===== GET BY ID (kèm thông tin phụ) ===== */
exports.getMonAnById = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const data = await monanService.getByIdWithDetail(maMon);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* ===== SEARCH (có lưu lịch sử) ===== */
exports.searchMonAn = async (req, res) => {
  try {
    const { q } = req.query;
    const userId = req.user ? req.user.userId : null;
    const data = await monanService.search({ q, userId });
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* ===== CREATE ===== */
exports.createMonAn = async (req, res) => {
  try {
    const created = await monanService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* ===== UPDATE ===== */
exports.updateMonAn = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const updated = await monanService.update(maMon, req.body);
    res.json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

/* ===== DELETE ===== */
exports.deleteMonAn = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    await monanService.remove(maMon);
    res.json({ message: "Đã xoá món ăn" });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
