const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "nodejs_course",
  database: "nodejs_sql",
});

module.exports = pool.promise();