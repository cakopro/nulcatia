const coneccion = require('../db/conecion')
const TABLA = 'Usuarios'

function verificarUsuario(nombre_usuario,contraseña, correo ){
    return new Promise((resolve,reject) => {
        coneccion.query(`SELECT *FROM ${TABLA} WHERE nombre_usuario = ? and contraseña = ? and correo = ?`, [nombre_usuario,contraseña,correo ], (error,resultado) => {
            if (error) {
                return reject(error);
            }
            resolve(resultado);
        })
    })
}

module.exports = {verificarUsuario}