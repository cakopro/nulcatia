const coneccion = require('../db/conecion')

function traerTerritorios() {
    return new Promise((resolve, reject) => {
        coneccion.query(
            `SELECT * FROM Territorios ORDER BY nombre`,
            (error, resultados) => {
                if (error) reject(error);
                else resolve(resultados);
            }
        );
    });
}

function traerTerritorioPorClan(id_clan) {
    return new Promise((resolve, reject) => {
        coneccion.query(
            `SELECT t.id_territorio, t.nombre FROM Territorios t
       JOIN ClanTerri ct ON t.id_territorio = ct.id_territorio
       WHERE ct.id_clan = ? LIMIT 1`,
            [id_clan],
            (error, resultados) => {
                if (error) reject(error);
                else resolve(resultados[0] || null);
            }
        );
    });
}
module.exports = {
    traerTerritorios,
    traerTerritorioPorClan
};