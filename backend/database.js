const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database/todos.db');

db.run(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  done INTEGER
)`);

module.exports = db;
