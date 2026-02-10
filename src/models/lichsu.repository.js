const { poolPromise, sql } = require("../db");

exports.insert = async ({ userId, tuKhoa }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("UserID", sql.Int, userId)
    .input("TuKhoa", sql.NVarChar(100), tuKhoa)
    .query(
      "INSERT INTO LichSuTimKiem(UserID, TuKhoa, ThoiGian) VALUES(@UserID, @TuKhoa, GETDATE())",
    );
};

exports.listByUserPaged = async ({ userId, offset, limit }) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("UserID", sql.Int, userId)
    .input("Offset", sql.Int, offset)
    .input("Limit", sql.Int, limit)
    .query(`
      SELECT *
      FROM LichSuTimKiem
      WHERE UserID=@UserID
      ORDER BY ThoiGian DESC
      OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY
    `);
  return rs.recordset;
};

exports.countByUser = async (userId) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("UserID", sql.Int, userId)
    .query("SELECT COUNT(*) AS total FROM LichSuTimKiem WHERE UserID=@UserID");
  return rs.recordset[0].total;
};

exports.deleteOne = async ({ userId, searchId }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("SearchID", sql.Int, searchId)
    .input("UserID", sql.Int, userId)
    .query("DELETE FROM LichSuTimKiem WHERE SearchID=@SearchID AND UserID=@UserID");
};

exports.clearAll = async (userId) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("UserID", sql.Int, userId)
    .query("DELETE FROM LichSuTimKiem WHERE UserID=@UserID");
};


