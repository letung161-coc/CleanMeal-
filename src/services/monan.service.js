const { sql, poolPromise } = require("../db");
const monanRepo = require("../models/monan.repository");
const nguyenlieuRepo = require("../models/nguyenlieu.repository");
const buocnauRepo = require("../models/buocnau.repository");
const lichsuRepo = require("../models/lichsu.repository");

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

  const [nguyenLieu, buocNau] = await Promise.all([
    nguyenlieuRepo.listByMon(maMon),
    buocnauRepo.listByMon(maMon),
  ]);

  return {
    ...monAn,
    NguyenLieu: nguyenLieu,
    BuocNau: buocNau,
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
    await lichsuRepo.insert({ userId, tuKhoa: q });
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

exports.getByLoaiAmThuc = async (amThucId) =>
  monanRepo.findByAmThucId(amThucId);

exports.getByCheDoAn = async (cheDoId) =>
  monanRepo.findByCheDoId(cheDoId);

exports.getByLoaiBuaAn = async (buaAnId) =>
  monanRepo.findByBuaAnId(buaAnId);


