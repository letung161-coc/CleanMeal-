const express = require("express");
const router = express.Router();
const monanController = require("../controllers/monan.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  createSchema,
  updateSchema,
} = require("../validators/monan.validator");

// GET: ai cũng xem được
router.get("/", monanController.getAllMonAn);
router.get("/search", auth, monanController.searchMonAn);
router.get("/:maMon", monanController.getMonAnById);
router.get("/by-amthuc/:amThucId", monanController.getByLoaiAmThuc);
router.get("/by-chedo/:cheDoId", monanController.getByCheDoAn);
router.get("/by-buaan/:buaAnId", monanController.getByLoaiBuaAn);

// POST: chỉ admin mới được thêm món
router.post(
  "/",
  auth,
  role(["admin"]),
  validate(createSchema),
  monanController.createMonAn,
);
router.put(
  "/:maMon",
  auth,
  role(["admin"]),
  validate(updateSchema),
  monanController.updateMonAn,
);
router.delete("/:maMon", auth, role(["admin"]), monanController.deleteMonAn);

module.exports = router;
