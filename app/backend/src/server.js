const { createApp } = require("./app");
const { createPool } = require("./db");
const db = createPool();
const app = createApp({ db });
const port = Number(process.env.PORT || 3000);
const server = app.listen(port, "0.0.0.0", () => console.log(`API listening on port ${port}`));
async function shutdown(signal) {
  console.log(`Received ${signal}; shutting down`);
  server.close(async () => {
    if (db) await db.end();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
