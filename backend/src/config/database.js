const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 20 });
pool.on('error', (err) => { console.error('Database pool error:', err); process.exit(-1); });
module.exports = { pool, query: (text, params) => pool.query(text, params) };
