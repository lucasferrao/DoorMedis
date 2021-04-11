//Credenciais da base de dados (REVER)
const mysql = require('mysql');
module.exports = { 
    con: mysql.createConnection({
        host: 'remotemysql.com',
        user: 'BB4fcf6psb',
        password: 'v4poPM91oQ',
        database: 'BB4fcf6psb'
    })
};