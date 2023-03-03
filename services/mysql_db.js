const mysql = require("mysql");
const db = require("../configs/db");
module.exports = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
})
