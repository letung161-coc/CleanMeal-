const { sql, poolPromise } = require("../db");

// Master data cho NhomNguyenLieu, NguyenLieu, MonAn_NguyenLieu, BuocNau

exports.getNhomNguyenLieu = async (req, res) => {
  try {
    const pool = await poolPromise;
    const rs = await pool.request().query("SELECT * FROM NhomNguyenLieu");
    res.json(rs.recordset);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.createNhomNguyenLieu = async (req, res) => {
  try {
    const { tenNhom } = req.body;
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("TenNhom", sql.NVarChar(50), tenNhom)
      .query(
        "INSERT INTO NhomNguyenLieu (TenNhom) OUTPUT INSERTED.* VALUES (@TenNhom)",
      );

    res.status(201).json(rs.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.updateNhomNguyenLieu = async (req, res) => {
  try {
    const nhomId = parseInt(req.params.nhomId, 10);
    const { tenNhom } = req.body;
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("NhomID", sql.Int, nhomId)
      .input("TenNhom", sql.NVarChar(50), tenNhom).query(`
        UPDATE NhomNguyenLieu SET TenNhom=@TenNhom WHERE NhomID=@NhomID;
        SELECT * FROM NhomNguyenLieu WHERE NhomID=@NhomID;
      `);

    if (rs.recordset.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy nhóm nguyên liệu" });
    }

    res.json(rs.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.deleteNhomNguyenLieu = async (req, res) => {
  try {
    const nhomId = parseInt(req.params.nhomId, 10);
    const pool = await poolPromise;

    await pool
      .request()
      .input("NhomID", sql.Int, nhomId)
      .query("DELETE FROM NhomNguyenLieu WHERE NhomID=@NhomID");

    res.json({ message: "Đã xoá nhóm nguyên liệu" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getNguyenLieuByNhom = async (req, res) => {
  try {
    const nhomId = parseInt(req.params.nhomId, 10);
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("NhomID", sql.Int, nhomId)
      .query("SELECT * FROM NguyenLieu WHERE NhomID=@NhomID");

    res.json(rs.recordset);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.createNguyenLieu = async (req, res) => {
  try {
    const { tenNguyenLieu, donViTinh, caloTrenDonVi, nhomId } = req.body;
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("TenNguyenLieu", sql.NVarChar(100), tenNguyenLieu)
      .input("DonViTinh", sql.NVarChar(20), donViTinh)
      .input("CaloTrenDonVi", sql.Float, caloTrenDonVi)
      .input("NhomID", sql.Int, nhomId).query(`
        INSERT INTO NguyenLieu (TenNguyenLieu, DonViTinh, CaloTrenDonVi, NhomID)
        OUTPUT INSERTED.*
        VALUES (@TenNguyenLieu, @DonViTinh, @CaloTrenDonVi, @NhomID)
      `);

    res.status(201).json(rs.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.updateNguyenLieu = async (req, res) => {
  try {
    const id = parseInt(req.params.nguyenLieuId, 10);
    const { tenNguyenLieu, donViTinh, caloTrenDonVi, nhomId } = req.body;
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("MaNguyenLieu", sql.Int, id)
      .input("TenNguyenLieu", sql.NVarChar(100), tenNguyenLieu)
      .input("DonViTinh", sql.NVarChar(20), donViTinh)
      .input("CaloTrenDonVi", sql.Float, caloTrenDonVi)
      .input("NhomID", sql.Int, nhomId).query(`
        UPDATE NguyenLieu
        SET TenNguyenLieu=@TenNguyenLieu,
            DonViTinh=@DonViTinh,
            CaloTrenDonVi=@CaloTrenDonVi,
            NhomID=@NhomID
        WHERE MaNguyenLieu=@MaNguyenLieu;
        SELECT * FROM NguyenLieu WHERE MaNguyenLieu=@MaNguyenLieu;
      `);

    if (rs.recordset.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy nguyên liệu" });
    }

    res.json(rs.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.deleteNguyenLieu = async (req, res) => {
  try {
    const id = parseInt(req.params.nguyenLieuId, 10);
    const pool = await poolPromise;

    await pool
      .request()
      .input("MaNguyenLieu", sql.Int, id)
      .query("DELETE FROM NguyenLieu WHERE MaNguyenLieu=@MaNguyenLieu");

    res.json({ message: "Đã xoá nguyên liệu" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.addNguyenLieuToMon = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { maNguyenLieu, soLuong } = req.body;

    const pool = await poolPromise;

    await pool
      .request()
      .input("MaMon", sql.Int, maMon)
      .input("MaNguyenLieu", sql.Int, maNguyenLieu)
      .input("SoLuong", sql.Float, soLuong).query(`
        MERGE MonAn_NguyenLieu AS target
        USING (SELECT @MaMon AS MaMon, @MaNguyenLieu AS MaNguyenLieu) AS src
        ON target.MaMon = src.MaMon AND target.MaNguyenLieu = src.MaNguyenLieu
        WHEN MATCHED THEN
          UPDATE SET SoLuong=@SoLuong
        WHEN NOT MATCHED THEN
          INSERT (MaMon, MaNguyenLieu, SoLuong)
          VALUES (@MaMon, @MaNguyenLieu, @SoLuong);
      `);

    res.json({ message: "Đã cập nhật nguyên liệu cho món" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getBuocNau = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("MaMon", sql.Int, maMon)
      .query(
        "SELECT * FROM BuocNau WHERE MaMon=@MaMon ORDER BY SoThuTuBuoc ASC",
      );

    res.json(rs.recordset);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.createBuocNau = async (req, res) => {
  try {
    const maMon = parseInt(req.params.maMon, 10);
    const { soThuTuBuoc, noiDungBuoc } = req.body;
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("MaMon", sql.Int, maMon)
      .input("SoThuTuBuoc", sql.Int, soThuTuBuoc)
      .input("NoiDungBuoc", sql.NVarChar(500), noiDungBuoc).query(`
        INSERT INTO BuocNau (MaMon, SoThuTuBuoc, NoiDungBuoc)
        OUTPUT INSERTED.*
        VALUES (@MaMon, @SoThuTuBuoc, @NoiDungBuoc)
      `);

    res.status(201).json(rs.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.updateBuocNau = async (req, res) => {
  try {
    const buocNauId = parseInt(req.params.buocNauId, 10);
    const { soThuTuBuoc, noiDungBuoc } = req.body;
    const pool = await poolPromise;

    const rs = await pool
      .request()
      .input("BuocNauID", sql.Int, buocNauId)
      .input("SoThuTuBuoc", sql.Int, soThuTuBuoc)
      .input("NoiDungBuoc", sql.NVarChar(500), noiDungBuoc).query(`
        UPDATE BuocNau
        SET SoThuTuBuoc=@SoThuTuBuoc,
            NoiDungBuoc=@NoiDungBuoc
        WHERE BuocNauID=@BuocNauID;
        SELECT * FROM BuocNau WHERE BuocNauID=@BuocNauID;
      `);

    if (rs.recordset.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bước nấu" });
    }

    res.json(rs.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.deleteBuocNau = async (req, res) => {
  try {
    const buocNauId = parseInt(req.params.buocNauId, 10);
    const pool = await poolPromise;

    await pool
      .request()
      .input("BuocNauID", sql.Int, buocNauId)
      .query("DELETE FROM BuocNau WHERE BuocNauID=@BuocNauID");

    res.json({ message: "Đã xoá bước nấu" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};


