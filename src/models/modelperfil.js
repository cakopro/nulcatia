const coneccion = require('../db/conecion')
const TABLA = 'Gatitos'

function traerDatosGato(id){
    return new Promise((resolve,reject) => {
        coneccion.query(`SELECT Gatitos.nombre, Gatitos.apellido, Gatitos.fecha_nacimiento, Clanes.nombre as clan, Gatitos.experiencia 
            FROM ${TABLA} INNER JOIN Clanes ON Gatitos.id_clan = Clanes.id_clan WHERE Gatitos.id_gato = ?`, [id],(error,resultado) =>{
                if (error){
                    return reject(error)
                }
                resolve(resultado[0])
            })
    })
}



module.exports = {traerDatosGato}