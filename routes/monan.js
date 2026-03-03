const express = require("express");
const router = express.Router();
const dishes = require("../data/foodData");

// GET /api/monan – Lấy tất cả món ăn (có hỗ trợ filter)
// Query params: ?category=salad | ?tag=Chicken | ?search=chicken | ?limit=10
router.get("/", (req, res) => {
    try {
        let result = [...dishes];

        // Filter theo category slug
        if (req.query.category && req.query.category !== "all") {
            const slug = req.query.category.toLowerCase();
            result = result.filter((d) =>
                d.category.toLowerCase().replace(/\s+/g, "-") === slug ||
                d.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === slug)
            );
        }

        // Filter theo tag
        if (req.query.tag) {
            const tag = req.query.tag.toLowerCase();
            result = result.filter((d) =>
                d.tags.some((t) => t.toLowerCase() === tag)
            );
        }

        // Tìm kiếm theo tên
        if (req.query.search) {
            const kw = req.query.search.toLowerCase();
            result = result.filter(
                (d) =>
                    d.name.toLowerCase().includes(kw) ||
                    d.description.toLowerCase().includes(kw)
            );
        }

        // Giới hạn số kết quả
        if (req.query.limit) {
            result = result.slice(0, parseInt(req.query.limit));
        }

        res.json({
            success: true,
            total: result.length,
            data: result,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/monan/:id – Lấy chi tiết 1 món
router.get("/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const dish = dishes.find((d) => d.id === id);
        if (!dish) {
            return res.status(404).json({ success: false, message: "Không tìm thấy món ăn" });
        }
        res.json({ success: true, data: dish });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/monan/:id/nutrition – Lấy thông tin dinh dưỡng
router.get("/:id/nutrition", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const dish = dishes.find((d) => d.id === id);
        if (!dish) {
            return res.status(404).json({ success: false, message: "Không tìm thấy món ăn" });
        }
        res.json({
            success: true,
            data: {
                id: dish.id,
                name: dish.name,
                macros: dish.macros,
                nutrition: dish.nutrition,
            },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/monan/:id/recipe – Lấy cách làm
router.get("/:id/recipe", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const dish = dishes.find((d) => d.id === id);
        if (!dish) {
            return res.status(404).json({ success: false, message: "Không tìm thấy món ăn" });
        }
        res.json({
            success: true,
            data: {
                id: dish.id,
                name: dish.name,
                time: dish.time,
                ingredients: dish.ingredients,
                steps: dish.steps,
            },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
