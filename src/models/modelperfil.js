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

function actualiarUsuario(datosUsuario, id_usuario){
    return new Promise((resolve,reject) =>{
        coneccion.query(`UPDATE Usuarios SET nombre_usuario = ?, contraseña = ?, correo = ? WHERE id_usuario = ?`, [datosUsuario.nombre_usuario, 
            datosUsuario.contraseña, datosUsuario.correo, id_usuario], (error,resultado) =>{
                if (error){
                    return reject(error)
                }
                resolve(resultado)
            })
    })
}

function actualiarGato(datosGato, id_gato){
    return new Promise((resolve,reject) =>{
        coneccion.query(`UPDATE ${TABLA} SET nombre = ?, apellido = ?, fecha_nacimiento = ?, id_clan = ?, experiencia = ? WHERE id_gato = ?`, 
            [datosGato.nombre, datosGato.apellido, datosGato.fecha_nacimiento, datosGato.id_clan, datosGato.experiencia, id_gato], (error,resultado)=>{
                if (error){
                    return reject(error)
                }
                resolve(resultado)
            })
    })
}

function eliminarUsuario(id_usuario) {
    return new Promise((resolve, reject) => {
        coneccion.query(
            `DELETE FROM Usuarios WHERE id_usuario = ?`,
            [id_usuario],
            (error, resultado) => {
                if (error){
                    return reject(error)
                }
                resolve(resultado)
            }
        );
    });
}

function eliminarGato(id_gato)  {
    return new Promise((resolve, reject) => {
        coneccion.query('DELETE FROM Gatitos WHERE id_gato = ?', [id_gato], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

module.exports = {traerDatosGato, traerClanes, actualiarUsuario, actualiarGato, eliminarUsuario, eliminarGato}