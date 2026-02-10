const { poolPromise, sql } = require("../db");

exports.listByMon = async (maMon) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("MaMon", sql.Int, maMon)
    .query("SELECT * FROM BuocNau WHERE MaMon=@MaMon ORDER BY SoThuTuBuoc ASC");
  return rs.recordset;
};

exports.create = async ({ maMon, soThuTuBuoc, noiDungBuoc }) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("MaMon", sql.Int, maMon)
    .input("SoThuTuBuoc", sql.Int, soThuTuBuoc)
    .input("NoiDungBuoc", sql.NVarChar(500), noiDungBuoc)
    .query(
      "INSERT INTO BuocNau (MaMon, SoThuTuBuoc, NoiDungBuoc) OUTPUT INSERTED.* VALUES (@MaMon, @SoThuTuBuoc, @NoiDungBuoc)",
    );
  return rs.recordset[0];
};

exports.update = async ({ buocNauId, soThuTuBuoc, noiDungBuoc }) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("BuocNauID", sql.Int, buocNauId)
    .input("SoThuTuBuoc", sql.Int, soThuTuBuoc)
    .input("NoiDungBuoc", sql.NVarChar(500), noiDungBuoc)
    .query(
      "UPDATE BuocNau SET SoThuTuBuoc=@SoThuTuBuoc, NoiDungBuoc=@NoiDungBuoc WHERE BuocNauID=@BuocNauID; SELECT * FROM BuocNau WHERE BuocNauID=@BuocNauID;",
    );
  return rs.recordset[0] || null;
};

exports.delete = async (buocNauId) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("BuocNauID", sql.Int, buocNauId)
    .query("DELETE FROM BuocNau WHERE BuocNauID=@BuocNauID");
};


