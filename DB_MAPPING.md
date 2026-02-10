# CleanMeal Backend - Ánh xạ DB (SQL Server) trong code

## Nguyên tắc

- **DB (SQL Server)** là nguồn sự thật: schema bạn tạo (`users`, `MonAn`, ...)
- Backend dùng **Repository (Model layer)** để “ánh xạ” bảng → hàm truy vấn
- Các file ánh xạ nằm ở: `src/models/*.repository.js`

## Danh sách repository ↔ bảng

- **`src/models/user.repository.js`** ↔ `users`
  - Tìm theo email, tạo user, tìm theo id
- **`src/models/monan.repository.js`** ↔ `MonAn`
  - CRUD món ăn
- **`src/models/yeuthich.repository.js`** ↔ `YeuThich` (+ join `MonAn`)
  - Thêm/xoá/list yêu thích theo user
- **`src/models/lichsu.repository.js`** ↔ `LichSuTimKiem`
  - Insert lịch sử, list phân trang, count, xoá
- **`src/models/thucdon.repository.js`** ↔ `ThucDon`
  - Tạo/list/update tên/xoá/find
- **`src/models/thucdon-monan.repository.js`** ↔ `ThucDon_MonAn` (+ join `MonAn`)
  - Thêm/xoá món trong thực đơn, xem chi tiết theo ngày
- **`src/models/nguyenlieu.repository.js`** ↔ `NhomNguyenLieu`, `NguyenLieu`
  - CRUD nhóm, CRUD nguyên liệu, list theo nhóm
- **`src/models/buocnau.repository.js`** ↔ `BuocNau`
  - CRUD bước nấu, list theo món
- **`src/models/phanloai.repository.js`** ↔ `LoaiAmThuc`, `CheDoAn`, `LoaiBuaAn`
  - CRUD master data + gán/huỷ gán qua các bảng:
    - `MonAn_LoaiAmThuc`
    - `MonAn_CheDoAn`
    - `MonAn_BuaAn`

## Export tập trung

Bạn có thể import nhanh toàn bộ repository qua:

- `src/models/index.js`

## Cấu hình DB qua môi trường

File `src/db.js` lấy cấu hình từ env:

- `DB_USER`, `DB_PASSWORD`, `DB_SERVER`, `DB_PORT`, `DB_NAME`, `DB_ENCRYPT`, `DB_TRUST_CERT`

Mẫu cấu hình: `env.example`


