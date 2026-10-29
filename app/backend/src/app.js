const express = require("express");
const helmet = require("helmet");

function createApp({ db = null } = {}) {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(express.json({ limit: "32kb", strict: true }));
  const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:8080";
  app.use((req, res, next) => {
    const origin = req.get("origin");
    if (origin && origin === allowedOrigin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    }
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
  });
  app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
  app.get("/ready", async (_req, res) => {
    if (!db) return res.status(200).json({ status: "ready", database: "not-configured" });
    try { await db.query("SELECT 1"); return res.status(200).json({ status: "ready", database: "connected" }); }
    catch (_error) { return res.status(503).json({ status: "not-ready" }); }
  });
  app.get("/api/v1/info", (_req, res) => res.json({ service: "three-tier-api", version: "1.0.0" }));
  app.get("/api/v1/items", async (_req, res, next) => {
    if (!db) return res.status(503).json({ error: "database_unavailable" });
    try {
      const result = await db.query("SELECT id, name, description, created_at FROM service_items ORDER BY id LIMIT 100");
      return res.json({ items: result.rows });
    } catch (error) { return next(error); }
  });
  app.use((req, res) => res.status(404).json({ error: "not_found", path: req.path }));
  app.use((error, _req, res, _next) => {
    console.error("request_failed", { name: error.name || "Error" });
    if (!res.headersSent) res.status(500).json({ error: "internal_server_error" });
  });
  return app;
}
module.exports = { createApp };
