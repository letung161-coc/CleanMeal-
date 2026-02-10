const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/lichsu.controller");

router.get("/", auth, controller.getMyHistory);
router.delete("/", auth, controller.clearAll);
router.delete("/:searchId", auth, controller.deleteOne);

module.exports = router;


