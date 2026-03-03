// ============================================================
//  server.js – Entry point cho CleanMeal Backend
//  Port: 4000 | API Base: http://localhost:4000/api
// ============================================================

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const monanRoutes = require("./routes/monan");
const categoriesRoutes = require("./routes/categories");
const healthRoutes = require("./routes/health");

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
    origin: function (origin, callback) {
        // Cho phép requests không có origin (curl, Postman) và các localhost ports
        const allowed = ["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000"];
        if (!origin || allowed.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger đơn giản
app.use((req, _res, next) => {
    console.log(`[${new Date().toLocaleTimeString("vi-VN")}] ${req.method} ${req.url}`);
    next();
});

// ── Routes ──────────────────────────────────────────────────
app.use("/api/health", healthRoutes);
app.use("/api/monan", monanRoutes);
app.use("/api/categories", categoriesRoutes);

// Root
app.get("/", (_req, res) => {
    res.json({
        name: "CleanMeal API",
        version: "1.0.0",
        endpoints: {
            health: "GET /api/health",
            monan_all: "GET /api/monan",
            monan_id: "GET /api/monan/:id",
            nutrition: "GET /api/monan/:id/nutrition",
            recipe: "GET /api/monan/:id/recipe",
            categories: "GET /api/categories",
            cat_slug: "GET /api/categories/:slug",
        },
        query_params: {
            category: "lọc theo category slug (vd: salad, breakfast)",
            tag: "lọc theo tag (vd: Chicken, Vegetarian)",
            search: "tìm kiếm theo tên hoặc mô tả",
            limit: "giới hạn số kết quả trả về",
        },
    });
});

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Endpoint không tồn tại" });
});

// Error handler
app.use((err, _req, res, _next) => {
    console.error("❌ Server Error:", err.stack);
    res.status(500).json({ success: false, message: "Lỗi server nội bộ" });
});

// ── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log("╔══════════════════════════════════════╗");
    console.log(`║  CleanMeal Backend đang chạy         ║`);
    console.log(`║  http://localhost:${PORT}              ║`);
    console.log("╚══════════════════════════════════════╝");
    console.log("\n📋 Endpoints:");
    console.log(`  GET  http://localhost:${PORT}/api/health`);
    console.log(`  GET  http://localhost:${PORT}/api/monan`);
    console.log(`  GET  http://localhost:${PORT}/api/monan/:id`);
    console.log(`  GET  http://localhost:${PORT}/api/monan/:id/nutrition`);
    console.log(`  GET  http://localhost:${PORT}/api/monan/:id/recipe`);
    console.log(`  GET  http://localhost:${PORT}/api/categories`);
    console.log(`  GET  http://localhost:${PORT}/api/categories/:slug`);
});

module.exports = app;
