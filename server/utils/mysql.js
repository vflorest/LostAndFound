const mysql = require('mysql');
const config = require('../config/config'); // Asegúrate de que esta ruta es correcta

const dbconfig = {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
};

let connection;

function connectMysql() {
    connection = mysql.createConnection(dbconfig);

    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(connectMysql, 2000);
        } else {
            console.log('DB connected!');
        }
    });

    connection.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectMysql();
        } else {
            throw err;
        }
    });
}

connectMysql();

function query(sql, args) {
    return new Promise((resolve, reject) => {
        connection.query(sql, args, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    query
};
