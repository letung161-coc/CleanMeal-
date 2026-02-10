const { poolPromise, sql } = require("../db");

exports.findByEmail = async (email) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("Email", sql.NVarChar(100), email)
    .query(
      "SELECT UserID, HoTen, Email, MatKhau, VaiTro, NgayDangKy FROM users WHERE Email=@Email",
    );
  return rs.recordset[0] || null;
};

exports.isEmailExists = async (email) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("Email", sql.NVarChar(100), email)
    .query("SELECT 1 FROM users WHERE Email=@Email");
  return rs.recordset.length > 0;
};

exports.createUser = async ({ hoTen, email, matKhau, vaiTro }) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("HoTen", sql.NVarChar(100), hoTen)
    .input("Email", sql.NVarChar(100), email)
    .input("MatKhau", sql.NVarChar(255), matKhau)
    .input("VaiTro", sql.NVarChar(20), vaiTro || "user").query(`
      INSERT INTO users (HoTen, Email, MatKhau, VaiTro)
      OUTPUT INSERTED.UserID, INSERTED.HoTen, INSERTED.Email, INSERTED.VaiTro, INSERTED.NgayDangKy
      VALUES (@HoTen, @Email, @MatKhau, @VaiTro)
    `);
  return rs.recordset[0];
};

exports.findById = async (userId) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("UserID", sql.Int, userId)
    .query(
      "SELECT UserID, HoTen, Email, VaiTro, NgayDangKy FROM users WHERE UserID=@UserID",
    );
  return rs.recordset[0] || null;
};


