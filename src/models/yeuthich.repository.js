const { poolPromise, sql } = require("../db");

exports.exists = async ({ userId, maMon }) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("UserID", sql.Int, userId)
    .input("MaMon", sql.Int, maMon)
    .query("SELECT 1 FROM YeuThich WHERE UserID=@UserID AND MaMon=@MaMon");
  return rs.recordset.length > 0;
};

exports.add = async ({ userId, maMon }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("UserID", sql.Int, userId)
    .input("MaMon", sql.Int, maMon)
    .query(
      "INSERT INTO YeuThich(UserID, MaMon, NgayLuu) VALUES (@UserID, @MaMon, GETDATE())",
    );
};

exports.remove = async ({ userId, maMon }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("UserID", sql.Int, userId)
    .input("MaMon", sql.Int, maMon)
    .query("DELETE FROM YeuThich WHERE UserID=@UserID AND MaMon=@MaMon");
};

exports.listByUser = async (userId) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("UserID", sql.Int, userId)
    .query(`
      SELECT yt.MaMon, yt.NgayLuu, m.TenMon, m.MoTaNgan, m.ThoiGianNau, m.AnhDaiDien, m.TongCalo, m.SoNguoiAn
      FROM YeuThich yt
      JOIN MonAn m ON yt.MaMon = m.MaMon
      WHERE yt.UserID = @UserID
      ORDER BY yt.NgayLuu DESC
    `);
  return rs.recordset;
};


