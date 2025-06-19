const coneccion = require('../db/conecion')
const TABLA = 'Pergaminos'


function traerPergaminos(){
    return new Promise((resolve,rejects) => {
        coneccion.query(`SELECT Clanes.nombre as clan, ${TABLA}.titulo , ${TABLA}.texto FROM ${TABLA} INNER JOIN
            Clanes ON ${TABLA}.clan = Clanes.id_clan `
            , (error,resultado) => {
                if (error){
                    return rejects(error)
                }
                resolve(resultado)
            })
    })
}



module.exports = {traerPergaminos}