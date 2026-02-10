const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/yeuthich.controller");

router.post("/:maMon", auth, controller.add);
router.delete("/:maMon", auth, controller.remove);
router.get("/", auth, controller.getMyFavorite);

module.exports = router;
