const mysql = require('mysql2');

const host = 'localhost';
const user = 'root';
const password = 'password';
const database = 'node-complete';

const pool = mysql.createPool({
	host,
	user,
	password,
	database
});

module.exports = pool.promise();
