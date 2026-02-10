const { poolPromise, sql } = require("../db");

exports.findAll = async () => {
  const pool = await poolPromise;
  const rs = await pool.request().query("SELECT * FROM MonAn");
  return rs.recordset;
};

exports.findById = async (maMon) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("MaMon", sql.Int, maMon)
    .query("SELECT * FROM MonAn WHERE MaMon=@MaMon");
  return rs.recordset[0] || null;
};

exports.insert = async (data) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("TenMon", sql.NVarChar(100), data.tenMon)
    .input("MoTaNgan", sql.NVarChar(255), data.moTaNgan)
    .input("ThoiGianNau", sql.Int, data.thoiGianNau)
    .input("AnhDaiDien", sql.NVarChar(255), data.anhDaiDien)
    .input("TongCalo", sql.Int, data.tongCalo)
    .input("SoNguoiAn", sql.Int, data.soNguoiAn).query(`
      INSERT INTO MonAn (TenMon, MoTaNgan, ThoiGianNau, AnhDaiDien, TongCalo, SoNguoiAn)
      OUTPUT INSERTED.*
      VALUES (@TenMon, @MoTaNgan, @ThoiGianNau, @AnhDaiDien, @TongCalo, @SoNguoiAn)
    `);
  return rs.recordset[0];
};

exports.update = async (maMon, data) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("MaMon", sql.Int, maMon)
    .input("TenMon", sql.NVarChar(100), data.tenMon)
    .input("MoTaNgan", sql.NVarChar(255), data.moTaNgan)
    .input("ThoiGianNau", sql.Int, data.thoiGianNau)
    .input("AnhDaiDien", sql.NVarChar(255), data.anhDaiDien)
    .input("TongCalo", sql.Int, data.tongCalo)
    .input("SoNguoiAn", sql.Int, data.soNguoiAn).query(`
      UPDATE MonAn
      SET TenMon=@TenMon,
          MoTaNgan=@MoTaNgan,
          ThoiGianNau=@ThoiGianNau,
          AnhDaiDien=@AnhDaiDien,
          TongCalo=@TongCalo,
          SoNguoiAn=@SoNguoiAn
      WHERE MaMon=@MaMon;
      SELECT * FROM MonAn WHERE MaMon=@MaMon;
    `);
  return rs.recordset[0] || null;
};

exports.remove = async (maMon) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("MaMon", sql.Int, maMon)
    .query("DELETE FROM MonAn WHERE MaMon=@MaMon");
};

exports.findByAmThucId = async (amThucId) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("AmThucID", sql.Int, amThucId)
    .query(`
      SELECT m.* FROM MonAn m
      JOIN MonAn_LoaiAmThuc ml ON m.MaMon = ml.MaMon
      WHERE ml.AmThucID = @AmThucID
    `);
  return rs.recordset;
};

exports.findByCheDoId = async (cheDoId) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("CheDoID", sql.Int, cheDoId)
    .query(`
      SELECT m.* FROM MonAn m
      JOIN MonAn_CheDoAn mc ON m.MaMon = mc.MaMon
      WHERE mc.CheDoID = @CheDoID
    `);
  return rs.recordset;
};

exports.findByBuaAnId = async (buaAnId) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("BuaAnID", sql.Int, buaAnId)
    .query(`
      SELECT m.* FROM MonAn m
      JOIN MonAn_BuaAn mb ON m.MaMon = mb.MaMon
      WHERE mb.BuaAnID = @BuaAnID
    `);
  return rs.recordset;
};


