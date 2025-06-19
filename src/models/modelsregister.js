const coneccion = require('../db/conecion')
const TABLA = 'Usuarios'


function traerNombres(nombre_usuario){
    return new Promise((resolve,reject) => {
        coneccion.query(`SELECT 1 FROM ${TABLA} WHERE nombre_usuario = ? LIMIT 1`,[nombre_usuario],(error,resultado) => {
            if (error){
                reject(error)
            }
            resolve(resultado.length > 0);
        })

    })
}

function traerCorreo(correo){
    return new Promise((resolve,reject) => {
        coneccion.query(`SELECT 1 FROM ${TABLA} WHERE correo = ? LIMIT 1`,[correo],(error,resultado) => {
            if (error){
                reject(error)
            }
            resolve(resultado.length > 0);
        })

    })
}

function agregarUsuario(datos_usuario){
    return new Promise((resolve,reject) => {
        coneccion.query(`INSERT INTO ${TABLA} (nombre_usuario, contraseña, correo) VALUES (?,?,?)`,[datos_usuario.nombre_usuario, datos_usuario.contraseña,
            datos_usuario.correo],(error,resultado) => {
            if (error){
                reject(error)
            }
            resolve(resultado)
        })

    })
}

module.exports = {traerNombres, traerCorreo, agregarUsuario}