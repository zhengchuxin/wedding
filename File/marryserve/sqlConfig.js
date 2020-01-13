var mysql = require('mysql')

// 连接数据库
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'wedding'
});
connection.connect();


module.exports = connection;