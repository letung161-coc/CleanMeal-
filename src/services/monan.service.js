const { sql, poolPromise } = require("../db");
const monanRepo = require("../models/monan.repository");

exports.getAll = async ({ page = 1, limit = 10 }) => {
  const pageNum = Number(page) > 0 ? Number(page) : 1;
  const limitNum = Number(limit) > 0 ? Number(limit) : 10;

  const pool = await poolPromise;

  const offset = (pageNum - 1) * limitNum;

  const [itemsRs, countRs] = await Promise.all([
    pool
      .request()
      .input("Limit", sql.Int, limitNum)
      .input("Offset", sql.Int, offset)
      .query(
        "SELECT * FROM MonAn ORDER BY MaMon OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY",
      ),
    pool.request().query("SELECT COUNT(*) AS total FROM MonAn"),
  ]);

  const total = countRs.recordset[0].total;

  return {
    data: itemsRs.recordset,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};

exports.getByIdWithDetail = async (maMon) => {
  const pool = await poolPromise;

  const monAn = await monanRepo.findById(maMon);
  if (!monAn) {
    const err = new Error("Không tìm thấy món ăn");
    err.status = 404;
    throw err;
  }

  const nguyenLieu = await pool
    .request()
    .input("MaMon", sql.Int, maMon)
    .query(`
      SELECT nl.MaNguyenLieu, nl.TenNguyenLieu, mnl.SoLuong, nl.DonViTinh, nl.CaloTrenDonVi
      FROM MonAn_NguyenLieu mnl
      JOIN NguyenLieu nl ON mnl.MaNguyenLieu = nl.MaNguyenLieu
      WHERE mnl.MaMon = @MaMon
    `);

  const buocNau = await pool
    .request()
    .input("MaMon", sql.Int, maMon)
    .query(
      "SELECT * FROM BuocNau WHERE MaMon = @MaMon ORDER BY SoThuTuBuoc ASC",
    );

  return {
    ...monAn,
    NguyenLieu: nguyenLieu.recordset,
    BuocNau: buocNau.recordset,
  };
};

exports.search = async ({ q, userId }) => {
  if (!q) {
    const err = new Error("Thiếu từ khóa tìm kiếm");
    err.status = 400;
    throw err;
  }

  const pool = await poolPromise;

  if (userId) {
    await pool
      .request()
      .input("UserID", sql.Int, userId)
      .input("TuKhoa", sql.NVarChar(100), q)
      .query(
        "INSERT INTO LichSuTimKiem(UserID, TuKhoa, ThoiGian) VALUES(@UserID, @TuKhoa, GETDATE())",
      );
  }

  const rs = await pool
    .request()
    .input("Keyword", sql.NVarChar(100), `%${q}%`)
    .query(
      "SELECT * FROM MonAn WHERE TenMon LIKE @Keyword OR MoTaNgan LIKE @Keyword",
    );

  return rs.recordset;
};

exports.create = async (payload) => {
  return monanRepo.insert(payload);
};

exports.update = async (maMon, payload) => {
  const updated = await monanRepo.update(maMon, payload);
  if (!updated) {
    const err = new Error("Không tìm thấy món ăn");
    err.status = 404;
    throw err;
  }
  return updated;
};

exports.remove = async (maMon) => {
  await monanRepo.remove(maMon);
};


