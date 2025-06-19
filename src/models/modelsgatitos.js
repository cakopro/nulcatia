const coneccion = require('../db/conecion')
const TABLA = 'Gatitos'

function traerGatos(){
    return new Promise((resolve,rejects) => {
        coneccion.query(`SELECT ${TABLA}.nombre, ${TABLA}.apellido , ${TABLA}.fecha_nacimiento, Clanes.nombre as clan, ${TABLA}.experiencia FROM ${TABLA} INNER JOIN
            Clanes ON Gatitos.id_clan = Clanes.id_clan `
            , (error,resultado) => {
                if (error){
                    return rejects(error)
                }
                resolve(resultado)
            })
    })
}



function traerClanes(){
    return new Promise((resolve,reject) => {
        coneccion.query(`SELECT id_clan, nombre FROM Clanes`, (error,resultado) =>{
                if (error){
                    return reject(error)
                }
                resolve(resultado)
            })
    })
}


function traerNombreCompleto(nombre, apellido){
    return new Promise((resolve,reject) => {
        coneccion.query(`SELECT 1 FROM ${TABLA} WHERE nombre = ? and apellido = ? LIMIT 1`,[nombre,apellido], (error,resultado) =>{
            if (error){
                reject(error)
            }
            resolve(resultado.length > 0);
        })
    })

}

function crearGatito(nombre, apellido, fecha_nacimiento, id_clan, experiencia){
    return new Promise((resolve,reject) => {
        coneccion.query(`INSERT INTO ${TABLA} (nombre, apellido, fecha_nacimiento, id_clan, experiencia) VALUES (?,?,?,?,?)`,
            [nombre, apellido, fecha_nacimiento, id_clan, experiencia], (error,resultado) =>{
            if (error){
                reject(error)
            }
            resolve(resultado);
        })
    })

}

function actualizarUsuario(id_gato, id_usuario){
    return new Promise((resolve,reject) => {
        coneccion.query(`UPDATE Usuarios SET id_gato = ? WHERE id_usuario = ?`, [id_gato,id_usuario], (error,resultado) =>{
            if (error){
                reject(error)
            }
            resolve(resultado);
        })
    })
}

module.exports = {traerNombreCompleto, crearGatito, actualizarUsuario, traerClanes, traerGatos}
