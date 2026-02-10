const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const controller = require("../controllers/phanloai.controller");

// Loại ẩm thực
router.get("/amthuc", controller.getLoaiAmThuc);
router.post("/amthuc", auth, role(["admin"]), controller.createLoaiAmThuc);
router.put("/amthuc/:amThucId", auth, role(["admin"]), controller.updateLoaiAmThuc);
router.delete(
  "/amthuc/:amThucId",
  auth,
  role(["admin"]),
  controller.deleteLoaiAmThuc,
);

// Gán loại ẩm thực cho món
router.post(
  "/monan/:maMon/amthuc",
  auth,
  role(["admin"]),
  controller.addAmThucToMon,
);
router.delete(
  "/monan/:maMon/amthuc",
  auth,
  role(["admin"]),
  controller.removeAmThucFromMon,
);

// Chế độ ăn
router.get("/chedo", controller.getCheDoAn);
router.post("/chedo", auth, role(["admin"]), controller.createCheDoAn);
router.put("/chedo/:cheDoId", auth, role(["admin"]), controller.updateCheDoAn);
router.delete(
  "/chedo/:cheDoId",
  auth,
  role(["admin"]),
  controller.deleteCheDoAn,
);

router.post(
  "/monan/:maMon/chedo",
  auth,
  role(["admin"]),
  controller.addCheDoToMon,
);
router.delete(
  "/monan/:maMon/chedo",
  auth,
  role(["admin"]),
  controller.removeCheDoFromMon,
);

// Loại bữa ăn
router.get("/buaan", controller.getLoaiBuaAn);
router.post("/buaan", auth, role(["admin"]), controller.createLoaiBuaAn);
router.put(
  "/buaan/:buaAnId",
  auth,
  role(["admin"]),
  controller.updateLoaiBuaAn,
);
router.delete(
  "/buaan/:buaAnId",
  auth,
  role(["admin"]),
  controller.deleteLoaiBuaAn,
);

router.post(
  "/monan/:maMon/buaan",
  auth,
  role(["admin"]),
  controller.addBuaAnToMon,
);
router.delete(
  "/monan/:maMon/buaan",
  auth,
  role(["admin"]),
  controller.removeBuaAnFromMon,
);

module.exports = router;


