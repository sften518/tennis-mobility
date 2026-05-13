const express = require("express");
const router  = express.Router();
const db      = require("../db");

// ─────────────────────────────────────────────
// GET /api/progress/:userId
// Returns current week number, checked items, and history
// ─────────────────────────────────────────────
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // Current progress
    const [rows] = await db.query(
      "SELECT week, checked FROM progress WHERE user_id = ?",
      [userId]
    );

    // History (newest first, max 12)
    const [historyRows] = await db.query(
      `SELECT week, completed_date
       FROM week_history
       WHERE user_id = ?
       ORDER BY completed_date DESC
       LIMIT 12`,
      [userId]
    );

    if (rows.length === 0) {
      // First time this user visits — return defaults
      return res.json({ week: 1, checked: {}, history: [] });
    }

    const { week, checked } = rows[0];
    const history = historyRows.map((r) => ({
      week: r.week,
      completedDate: new Date(r.completed_date).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      }),
    }));

    res.json({ week, checked: checked || {}, history });
  } catch (err) {
    console.error("GET /progress error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ─────────────────────────────────────────────
// POST /api/progress/:userId
// Upserts the checked state for the current week
// Body: { week: number, checked: object }
// ─────────────────────────────────────────────
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { week, checked } = req.body;

  if (typeof week !== "number" || typeof checked !== "object") {
    return res.status(400).json({ error: "Invalid body" });
  }

  try {
    await db.query(
      `INSERT INTO progress (user_id, week, checked)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE week = VALUES(week), checked = VALUES(checked)`,
      [userId, week, JSON.stringify(checked)]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error("POST /progress error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ─────────────────────────────────────────────
// POST /api/progress/:userId/complete
// Called when all 5 days hit 100%.
// Records the completed week in history, increments week, resets checked.
// Body: { week: number }
// ─────────────────────────────────────────────
router.post("/:userId/complete", async (req, res) => {
  const { userId } = req.params;
  const { week } = req.body;

  if (typeof week !== "number") {
    return res.status(400).json({ error: "Invalid body" });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Record history entry
    await conn.query(
      `INSERT INTO week_history (user_id, week, completed_date)
       VALUES (?, ?, CURDATE())`,
      [userId, week]
    );

    // 2. Reset progress to next week
    await conn.query(
      `INSERT INTO progress (user_id, week, checked)
       VALUES (?, ?, '{}')
       ON DUPLICATE KEY UPDATE week = VALUES(week), checked = '{}'`,
      [userId, week + 1]
    );

    await conn.commit();
    res.json({ ok: true, nextWeek: week + 1 });
  } catch (err) {
    await conn.rollback();
    console.error("POST /complete error:", err);
    res.status(500).json({ error: "Database error" });
  } finally {
    conn.release();
  }
});

module.exports = router;
