const { Pool } = require("pg");
console.log("📦 Initializing PostgreSQL connection...");

const configs = require("./config");

const env = process.env.NODE_ENV || "development";
const dbConfig = configs[env];

const pool = new Pool({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port
});

pool.on("connect", () => {
  console.log(`✅ PostgreSQL connected (${env})`);
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL error:", err);
  process.exit(1);
});

module.exports = pool;

