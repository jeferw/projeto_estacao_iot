const mysql = require('mysql');

const {
    MYSQL_ROOT_PASSWORD,
    MYSQL_HOSTNAME,
    MYSQL_PORT,
    MYSQL_DATABASE
} = process.env;

const pool = mysql.createPool({
    connectionLimit: 100,
    port: MYSQL_PORT,
    host: MYSQL_HOSTNAME,
    user: 'root',
    password: MYSQL_ROOT_PASSWORD,
    database: MYSQL_DATABASE
});
/*
console.log('pool => criado');

pool.on('release', () => console.log('pool => conexão retornada'));
*/

process.on('SIGINT', () =>
    pool.end(err => {
        if (err) return console.log(err);
        console.log('pool => fechado');
        process.exit(0);
    })
);

module.exports = pool;