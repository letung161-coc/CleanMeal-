const { poolPromise, sql } = require("../db");

exports.add = async ({ thucDonId, maMon, buaAn, ngay }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("ThucDonID", sql.Int, thucDonId)
    .input("MaMon", sql.Int, maMon)
    .input("BuaAn", sql.NVarChar(20), buaAn)
    .input("Ngay", sql.Date, ngay)
    .query(
      "INSERT INTO ThucDon_MonAn (ThucDonID, MaMon, BuaAn, Ngay) VALUES (@ThucDonID, @MaMon, @BuaAn, @Ngay)",
    );
};

exports.remove = async ({ thucDonId, maMon, buaAn, ngay }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("ThucDonID", sql.Int, thucDonId)
    .input("MaMon", sql.Int, maMon)
    .input("BuaAn", sql.NVarChar(20), buaAn)
    .input("Ngay", sql.Date, ngay)
    .query(
      "DELETE FROM ThucDon_MonAn WHERE ThucDonID=@ThucDonID AND MaMon=@MaMon AND BuaAn=@BuaAn AND Ngay=@Ngay",
    );
};

exports.listDetail = async ({ thucDonId, ngay }) => {
  const pool = await poolPromise;
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

  const rs = await request.query(query);
  return rs.recordset;
};


