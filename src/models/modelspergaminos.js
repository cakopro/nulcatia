const coneccion = require('../db/conecion')
const TABLA = 'Pergaminos'


function traerPergaminos(){
    return new Promise((resolve,rejects) => {
        coneccion.query(`SELECT ${TABLA}.id_pergamino, Clanes.nombre as clan, ${TABLA}.titulo , ${TABLA}.texto FROM ${TABLA} INNER JOIN
            Clanes ON ${TABLA}.clan = Clanes.id_clan `
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

function agregarPergamino(clan, titulo, texto){
    return new Promise((resolve,reject) => {
        coneccion.query(`INSERT INTO Pergaminos (clan, titulo, texto) VALUES (?,?,?)`, [clan, titulo, texto], (error,resultado) => {
            if(error){
                return reject(error)
            }
            resolve(resultado)
        })
    })
}

function eliminarPergamino(id_pergamino) {
    return new Promise((resolve, reject) => {
        coneccion.query(
            `DELETE FROM ${TABLA} WHERE id_pergamino = ?`,
            [id_pergamino],
            (error, resultado) => {
                if (error){
                    return reject(error)
                }
                resolve(resultado)
            }
        );
    });
}
function actualizarPergamino(id, clan, titulo, texto) {
  return new Promise((resolve, reject) => {
    coneccion.query(
      `UPDATE Pergaminos SET clan = ?, titulo = ?, texto = ? WHERE id_pergamino = ?`,
      [clan, titulo, texto, id],
      (error, resultado) => {
        if (error) return reject(error);
        resolve(resultado);
      }
    );
  });
}


function traerPergaminoPorId(id) {
  return new Promise((resolve, reject) => {
    coneccion.query(
      `SELECT id_pergamino, clan, titulo, texto FROM Pergaminos WHERE id_pergamino = ?`,
      [id],
      (error, resultado) => {
        if (error) return reject(error);
        resolve(resultado[0]); // solo 1 registro
      }
    );
  });
}

module.exports = {traerPergaminos, traerClanes, agregarPergamino, eliminarPergamino, actualizarPergamino, traerPergaminoPorId}