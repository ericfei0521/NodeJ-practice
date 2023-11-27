const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-practice',
    password: 'ericfei306',
});

module.exports = pool.promise();
