const coneccion = require('../db/conecionex')
const TABLA = 'Gatitos'

function verificarGatito(nombre,rol ){
    return new Promise((resolve,rejects) => {
        coneccion.query(`SELECT *FROM ${TABLA} WHERE nombre = ? and rol = ?`, [nombre,rol], (error,resultado) => {
            if (error) {
                return reject(error);
            }
            resolve(resultado);
        })
    })
}

module.exports = {verificarGatito}