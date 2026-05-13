require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const db       = require("./db");
const progress = require("./routes/progress");

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST"],
}));
app.use(express.json());

// ── Routes ──────────────────────────────────────
app.use("/api/progress", progress);

// Health check — useful for monitoring / deployment checks
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ── Start ────────────────────────────────────────
async function start() {
  // Verify DB connection before accepting traffic
  try {
    await db.query("SELECT 1");
    console.log("✓ MySQL connected");
  } catch (err) {
    console.error("✗ MySQL connection failed:", err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
  });
}

start();
