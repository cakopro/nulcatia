const conexion = require('../db/conecion');
const TABLA = 'Territorios';

function traerTerritorios() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                Territorios.id_territorio, 
                Territorios.nombre, 
                Territorios.kilometros 
            FROM Territorios`;
        conexion.query(query, (error, resultado) => {
            if (error) return reject(error);
            resolve(resultado);
        });
    });
}


async function crearTerritorio(nombre, kilometros) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Territorios (nombre, kilometros) VALUES (?, ?)`;
        conexion.query(query, [nombre, kilometros], (error, resultado) => {
            if (error) return reject(error);
            resolve(resultado[0])
        });
    });
}

const traerTerritorioPorId = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM territorios WHERE id_territorio = ?";
    conexion.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

const actualizarTerritorio = (id, nombre, kilometros) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE territorios SET nombre = ?, kilometros = ? WHERE id_territorio = ?";
    conexion.query(sql, [nombre, kilometros, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

function existeRelacionEnClanterri(idTerritorio) {
  return new Promise(function(resolve, reject) {
    const sql = "SELECT COUNT(*) AS total FROM clanterri WHERE id_territorio = ?";
    conexion.query(sql, [idTerritorio], function(err, results) {
      if (err) return reject(err);
      resolve(results[0].total > 0);
    });
  });
}

function eliminarTerritorio(idTerritorio) {
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM territorios WHERE id_territorio = ?";
    conexion.query(sql, [idTerritorio], function(err, results) {
      if (err) return reject(err);
      resolve(results);
    });
  });
}



function traerClanes() {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT id_clan, nombre FROM Clanes`, (error, resultado) => {
            if (error) return reject(error);
            resolve(resultado);
        });
    });
}


module.exports = {
    traerTerritorios,
    crearTerritorio,
    traerClanes,
    actualizarTerritorio,
    eliminarTerritorio,
    traerTerritorioPorId,
    existeRelacionEnClanterri
};
