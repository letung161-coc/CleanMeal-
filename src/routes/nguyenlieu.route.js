const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const controller = require("../controllers/nguyenlieu.controller");

router.get("/nhom", controller.getNhomNguyenLieu);
router.post("/nhom", auth, role(["admin"]), controller.createNhomNguyenLieu);
router.put(
  "/nhom/:nhomId",
  auth,
  role(["admin"]),
  controller.updateNhomNguyenLieu,
);
router.delete(
  "/nhom/:nhomId",
  auth,
  role(["admin"]),
  controller.deleteNhomNguyenLieu,
);

router.get("/nhom/:nhomId", controller.getNguyenLieuByNhom);
router.post(
  "/nguyenlieu",
  auth,
  role(["admin"]),
  controller.createNguyenLieu,
);
router.put(
  "/nguyenlieu/:nguyenLieuId",
  auth,
  role(["admin"]),
  controller.updateNguyenLieu,
);
router.delete(
  "/nguyenlieu/:nguyenLieuId",
  auth,
  role(["admin"]),
  controller.deleteNguyenLieu,
);
router.get("/monan/:maMon/buocnau", controller.getBuocNau);
router.post(
  "/monan/:maMon/buocnau",
  auth,
  role(["admin"]),
  controller.createBuocNau,
);
router.put(
  "/buocnau/:buocNauId",
  auth,
  role(["admin"]),
  controller.updateBuocNau,
);
router.delete(
  "/buocnau/:buocNauId",
  auth,
  role(["admin"]),
  controller.deleteBuocNau,
);
router.post(
  "/monan/:maMon/nguyenlieu",
  auth,
  role(["admin"]),
  controller.addNguyenLieuToMon,
);

module.exports = router;


