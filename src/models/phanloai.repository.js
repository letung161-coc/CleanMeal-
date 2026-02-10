const { poolPromise, sql } = require("../db");

// ===== LoaiAmThuc =====
exports.listLoaiAmThuc = async () => {
  const pool = await poolPromise;
  const rs = await pool.request().query("SELECT * FROM LoaiAmThuc");
  return rs.recordset;
};

exports.createLoaiAmThuc = async (tenAmThuc) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("TenAmThuc", sql.NVarChar(50), tenAmThuc)
    .query("INSERT INTO LoaiAmThuc (TenAmThuc) OUTPUT INSERTED.* VALUES (@TenAmThuc)");
  return rs.recordset[0];
};

exports.updateLoaiAmThuc = async ({ amThucId, tenAmThuc }) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("AmThucID", sql.Int, amThucId)
    .input("TenAmThuc", sql.NVarChar(50), tenAmThuc)
    .query("UPDATE LoaiAmThuc SET TenAmThuc=@TenAmThuc WHERE AmThucID=@AmThucID; SELECT * FROM LoaiAmThuc WHERE AmThucID=@AmThucID;");
  return rs.recordset[0] || null;
};

exports.deleteLoaiAmThuc = async (amThucId) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("AmThucID", sql.Int, amThucId)
    .query("DELETE FROM LoaiAmThuc WHERE AmThucID=@AmThucID");
};

exports.addLoaiAmThucToMon = async ({ maMon, amThucId }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("MaMon", sql.Int, maMon)
    .input("AmThucID", sql.Int, amThucId)
    .query("INSERT INTO MonAn_LoaiAmThuc (MaMon, AmThucID) VALUES (@MaMon, @AmThucID)");
};

exports.removeLoaiAmThucFromMon = async ({ maMon, amThucId }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("MaMon", sql.Int, maMon)
    .input("AmThucID", sql.Int, amThucId)
    .query("DELETE FROM MonAn_LoaiAmThuc WHERE MaMon=@MaMon AND AmThucID=@AmThucID");
};

// ===== CheDoAn =====
exports.listCheDoAn = async () => {
  const pool = await poolPromise;
  const rs = await pool.request().query("SELECT * FROM CheDoAn");
  return rs.recordset;
};

exports.createCheDoAn = async (cheDoAn) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("CheDoAn", sql.NVarChar(50), cheDoAn)
    .query("INSERT INTO CheDoAn (CheDoAn) OUTPUT INSERTED.* VALUES (@CheDoAn)");
  return rs.recordset[0];
};

exports.updateCheDoAn = async ({ cheDoId, cheDoAn }) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("CheDoID", sql.Int, cheDoId)
    .input("CheDoAn", sql.NVarChar(50), cheDoAn)
    .query("UPDATE CheDoAn SET CheDoAn=@CheDoAn WHERE CheDoID=@CheDoID; SELECT * FROM CheDoAn WHERE CheDoID=@CheDoID;");
  return rs.recordset[0] || null;
};

exports.deleteCheDoAn = async (cheDoId) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("CheDoID", sql.Int, cheDoId)
    .query("DELETE FROM CheDoAn WHERE CheDoID=@CheDoID");
};

exports.addCheDoToMon = async ({ maMon, cheDoId }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("MaMon", sql.Int, maMon)
    .input("CheDoID", sql.Int, cheDoId)
    .query("INSERT INTO MonAn_CheDoAn (MaMon, CheDoID) VALUES (@MaMon, @CheDoID)");
};

exports.removeCheDoFromMon = async ({ maMon, cheDoId }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("MaMon", sql.Int, maMon)
    .input("CheDoID", sql.Int, cheDoId)
    .query("DELETE FROM MonAn_CheDoAn WHERE MaMon=@MaMon AND CheDoID=@CheDoID");
};

// ===== LoaiBuaAn =====
exports.listLoaiBuaAn = async () => {
  const pool = await poolPromise;
  const rs = await pool.request().query("SELECT * FROM LoaiBuaAn");
  return rs.recordset;
};

exports.createLoaiBuaAn = async (buaAn) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("BuaAn", sql.NVarChar(20), buaAn)
    .query("INSERT INTO LoaiBuaAn (BuaAn) OUTPUT INSERTED.* VALUES (@BuaAn)");
  return rs.recordset[0];
};

exports.updateLoaiBuaAn = async ({ buaAnId, buaAn }) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("BuaAnID", sql.Int, buaAnId)
    .input("BuaAn", sql.NVarChar(20), buaAn)
    .query("UPDATE LoaiBuaAn SET BuaAn=@BuaAn WHERE BuaAnID=@BuaAnID; SELECT * FROM LoaiBuaAn WHERE BuaAnID=@BuaAnID;");
  return rs.recordset[0] || null;
};

exports.deleteLoaiBuaAn = async (buaAnId) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("BuaAnID", sql.Int, buaAnId)
    .query("DELETE FROM LoaiBuaAn WHERE BuaAnID=@BuaAnID");
};

exports.addLoaiBuaAnToMon = async ({ maMon, buaAnId }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("MaMon", sql.Int, maMon)
    .input("BuaAnID", sql.Int, buaAnId)
    .query("INSERT INTO MonAn_BuaAn (MaMon, BuaAnID) VALUES (@MaMon, @BuaAnID)");
};

exports.removeLoaiBuaAnFromMon = async ({ maMon, buaAnId }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("MaMon", sql.Int, maMon)
    .input("BuaAnID", sql.Int, buaAnId)
    .query("DELETE FROM MonAn_BuaAn WHERE MaMon=@MaMon AND BuaAnID=@BuaAnID");
};


