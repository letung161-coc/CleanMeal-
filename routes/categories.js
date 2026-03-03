const express = require("express");
const router = express.Router();
const categories = require("../data/categoriesData");
const dishes = require("../data/foodData");

// GET /api/categories – Lấy tất cả categories
router.get("/", (req, res) => {
    // Thêm số lượng món ăn vào mỗi category
    const categoriesWithCount = categories.map((cat) => ({
        ...cat,
        count: dishes.filter((d) =>
            d.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === cat.slug) ||
            d.category.toLowerCase().replace(/\s+/g, "-") === cat.slug
        ).length,
    }));

    res.json({ success: true, data: categoriesWithCount });
});

// GET /api/categories/:slug – Lấy các món theo category
router.get("/:slug", (req, res) => {
    const slug = req.params.slug.toLowerCase();
    const cat = categories.find((c) => c.slug === slug);
    if (!cat) {
        return res.status(404).json({ success: false, message: "Không tìm thấy category" });
    }

    const filtered = dishes.filter(
        (d) =>
            d.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === slug) ||
            d.category.toLowerCase().replace(/\s+/g, "-") === slug
    );

    res.json({
        success: true,
        category: cat,
        total: filtered.length,
        data: filtered,
    });
});

module.exports = router;
