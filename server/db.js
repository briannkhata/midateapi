const mysql = require("mysql");
const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "midate",
});

pool.connect();

module.exports = pool;
