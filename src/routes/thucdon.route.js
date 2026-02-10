const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/thucdon.controller");

router.post("/", auth, controller.createThucDon);
router.get("/", auth, controller.getMyThucDon);
router.put("/:thucDonId", auth, controller.updateThucDon);
router.delete("/:thucDonId", auth, controller.deleteThucDon);

router.post("/:thucDonId/monan", auth, controller.addMonAnToThucDon);
router.delete("/:thucDonId/monan", auth, controller.removeMonAnFromThucDon);
router.get("/:thucDonId", auth, controller.getThucDonDetail);

module.exports = router;


