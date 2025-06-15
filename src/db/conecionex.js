const mysql = require('mysql2');
const config = require('../config/config');

let con;

function coneccion(){
    con = mysql.createConnection(config.mysql);
    
    conn.connect((error) => {
        if (error) {
            console.log('[db error]', error);
            setTimeout(conectar, 2000);
        } else {
            console.log('[db conectada]');
        }
    });

    conn.on('error', error => {
        console.log('[db error]', error);
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            conectar();
        } else {
            throw error;
            
        }
    });
}



module.exports = con