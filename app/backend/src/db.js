const { Pool } = require("pg");
function createPool() {
  if (!process.env.DATABASE_URL) return null;
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 3000,
    ssl: process.env.PGSSLMODE === "require" ? { rejectUnauthorized: true } : undefined
  });
}
module.exports = { createPool };
