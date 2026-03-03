const express = require("express");
const router = express.Router();
const dishes = require("../data/foodData");

// GET /api/health – Kiểm tra server hoạt động
router.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "CleanMeal Backend đang hoạt động",
        db: `${dishes.length} món ăn trong database`,
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;
