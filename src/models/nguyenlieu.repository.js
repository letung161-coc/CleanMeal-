const { poolPromise, sql } = require("../db");

// ===== NhomNguyenLieu =====
exports.listNhom = async () => {
  const pool = await poolPromise;
  const rs = await pool.request().query("SELECT * FROM NhomNguyenLieu");
  return rs.recordset;
};

exports.createNhom = async (tenNhom) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("TenNhom", sql.NVarChar(50), tenNhom)
    .query(
      "INSERT INTO NhomNguyenLieu (TenNhom) OUTPUT INSERTED.* VALUES (@TenNhom)",
    );
  return rs.recordset[0];
};

exports.updateNhom = async ({ nhomId, tenNhom }) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("NhomID", sql.Int, nhomId)
    .input("TenNhom", sql.NVarChar(50), tenNhom)
    .query(
      "UPDATE NhomNguyenLieu SET TenNhom=@TenNhom WHERE NhomID=@NhomID; SELECT * FROM NhomNguyenLieu WHERE NhomID=@NhomID;",
    );
  return rs.recordset[0] || null;
};

exports.deleteNhom = async (nhomId) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("NhomID", sql.Int, nhomId)
    .query("DELETE FROM NhomNguyenLieu WHERE NhomID=@NhomID");
};

// ===== NguyenLieu =====
exports.listByNhom = async (nhomId) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("NhomID", sql.Int, nhomId)
    .query("SELECT * FROM NguyenLieu WHERE NhomID=@NhomID");
  return rs.recordset;
};

exports.create = async ({ tenNguyenLieu, donViTinh, caloTrenDonVi, nhomId }) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("TenNguyenLieu", sql.NVarChar(100), tenNguyenLieu)
    .input("DonViTinh", sql.NVarChar(20), donViTinh)
    .input("CaloTrenDonVi", sql.Float, caloTrenDonVi)
    .input("NhomID", sql.Int, nhomId)
    .query(
      "INSERT INTO NguyenLieu (TenNguyenLieu, DonViTinh, CaloTrenDonVi, NhomID) OUTPUT INSERTED.* VALUES (@TenNguyenLieu, @DonViTinh, @CaloTrenDonVi, @NhomID)",
    );
  return rs.recordset[0];
};

exports.update = async ({
  maNguyenLieu,
  tenNguyenLieu,
  donViTinh,
  caloTrenDonVi,
  nhomId,
}) => {
  const pool = await poolPromise;
  const rs = await pool
    .request()
    .input("MaNguyenLieu", sql.Int, maNguyenLieu)
    .input("TenNguyenLieu", sql.NVarChar(100), tenNguyenLieu)
    .input("DonViTinh", sql.NVarChar(20), donViTinh)
    .input("CaloTrenDonVi", sql.Float, caloTrenDonVi)
    .input("NhomID", sql.Int, nhomId)
    .query(
      "UPDATE NguyenLieu SET TenNguyenLieu=@TenNguyenLieu, DonViTinh=@DonViTinh, CaloTrenDonVi=@CaloTrenDonVi, NhomID=@NhomID WHERE MaNguyenLieu=@MaNguyenLieu; SELECT * FROM NguyenLieu WHERE MaNguyenLieu=@MaNguyenLieu;",
    );
  return rs.recordset[0] || null;
};

exports.delete = async (maNguyenLieu) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("MaNguyenLieu", sql.Int, maNguyenLieu)
    .query("DELETE FROM NguyenLieu WHERE MaNguyenLieu=@MaNguyenLieu");
};


