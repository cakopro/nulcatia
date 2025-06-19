const coneccion = require('../db/conecion')
const TABLA = "Clanes";

function traerClanesConTerritorios() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        C.id_clan, 
        C.nombre,
        GROUP_CONCAT(T.nombre SEPARATOR ', ') AS territorios
      FROM Clanes C
      LEFT JOIN ClanTerri CT ON C.id_clan = CT.id_clan
      LEFT JOIN Territorios T ON CT.id_territorio = T.id_territorio
      GROUP BY C.id_clan, C.nombre
      ORDER BY C.nombre
    `;
    coneccion.query(sql, (error, resultados) => {
      if (error) {
        return reject(error);
      }
      resolve(resultados);
    });
  });
}

function crearClan(nombre) {
  return new Promise((resolve, reject) => {
    coneccion.query(
      `INSERT INTO ${TABLA} (nombre) VALUES (?)`,
      [nombre],
      (error, resultado) => {
        if (error) {
          return reject(error);
        }
        resolve(resultado);
      }
    );
  });
}

function eliminarClan(id_clan) {
  return new Promise((resolve, reject) => {
    coneccion.query(
      `DELETE FROM ${TABLA} WHERE id_clan = ?`,
      [id_clan],
      (error, resultado) => {
        if (error) {
          return reject(error);
        }
        resolve(resultado);
      }
    );
  });
}

module.exports = {
  traerClanesConTerritorios,
  crearClan,
  eliminarClan,
};