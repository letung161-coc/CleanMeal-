const { poolPromise, sql } = require("../db");

exports.insert = async ({ tenThucDon, ngayTao, userId }) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("TenThucDon", sql.NVarChar(100), tenThucDon || null)
    .input("NgayTao", sql.Date, ngayTao || new Date())
    .input("UserID", sql.Int, userId)
    .query(
      "INSERT INTO ThucDon (TenThucDon, NgayTao, UserID) OUTPUT INSERTED.* VALUES (@TenThucDon, @NgayTao, @UserID)",
    );
  return rs.recordset[0];
};

exports.listByUser = async (userId) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("UserID", sql.Int, userId)
    .query("SELECT * FROM ThucDon WHERE UserID=@UserID ORDER BY NgayTao DESC");
  return rs.recordset;
};

exports.updateName = async ({ thucDonId, userId, tenThucDon }) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("ThucDonID", sql.Int, thucDonId)
    .input("UserID", sql.Int, userId)
    .input("TenThucDon", sql.NVarChar(100), tenThucDon)
    .query(`
      UPDATE ThucDon
      SET TenThucDon=@TenThucDon
      WHERE ThucDonID=@ThucDonID AND UserID=@UserID;
      SELECT * FROM ThucDon WHERE ThucDonID=@ThucDonID AND UserID=@UserID;
    `);
  return rs.recordset[0] || null;
};

exports.remove = async ({ thucDonId, userId }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("ThucDonID", sql.Int, thucDonId)
    .input("UserID", sql.Int, userId)
    .query("DELETE FROM ThucDon WHERE ThucDonID=@ThucDonID AND UserID=@UserID");
};

exports.findById = async (thucDonId) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("ThucDonID", sql.Int, thucDonId)
    .query("SELECT * FROM ThucDon WHERE ThucDonID=@ThucDonID");
  return rs.recordset[0] || null;
};


