const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middlewares/error.middleware");
const requestLogger = require("./middlewares/request-logger.middleware");
const { swaggerUi, swaggerDocument } = require("./docs/swagger");

const app = express();

// Security middlewares
app.use(helmet());
app.use(
  cors({
    origin: "*", // chỉnh lại domain frontend khi deploy
  }),
);

// HTTP request logging
app.use(requestLogger);

// Rate limit: 100 requests / 15 phút mỗi IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api", apiLimiter);

app.use(express.json());

// Health check (cho monitoring / deploy)
app.get("/api/health", async (req, res) => {
  try {
    const { poolPromise } = require("./db");
    const pool = await poolPromise;
    await pool.request().query("SELECT 1");
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(503).json({ status: "error", db: "disconnected" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "CleanMeal Backend API",
    version: "1.0.0",
    docs: "/docs",
    endpoints: {
      auth: "/api/auth",
      monan: "/api/monan",
      users: "/api/users",
      yeuthich: "/api/yeuthich",
      lichsu: "/api/lichsu",
      thucdon: "/api/thucdon",
      nguyenlieu: "/api/nguyenlieu",
      phanloai: "/api/phanloai",
    },
  });
});

// API routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/monan", require("./routes/monan.route"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/yeuthich", require("./routes/yeuthich.route"));
app.use("/api/lichsu", require("./routes/lichsu.route"));
app.use("/api/thucdon", require("./routes/thucdon.route"));
app.use("/api/nguyenlieu", require("./routes/nguyenlieu.route"));
app.use("/api/phanloai", require("./routes/phanloai.route"));

// API docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global error handler (đặt cuối cùng)
app.use(errorHandler);

module.exports = app;
