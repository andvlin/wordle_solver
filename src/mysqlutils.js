const mysql = require('mysql2/promise');
let connection = null;
async function connect() {
  connection = await mysql.createConnection({
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    database: process.env.mysql_db,
    password: process.env.mysql_pass,
  });
  return connection;
}
async function disconnect() {
  await connection.end();
}
module.exports = { connect, disconnect };
