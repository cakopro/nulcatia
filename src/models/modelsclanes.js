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

function eliminarRelacionesClan(id_clan) {
  return new Promise((resolve, reject) => {
    coneccion.query(
      "DELETE FROM ClanTerri WHERE id_clan = ?",
      [id_clan],
      (error, resultado) => {
        if (error) reject(error);
        else resolve(resultado);
      }
    );
  });
}
function actualizarClan(id_clan, nuevoNombre, nuevoIdTerritorio) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("🟡 Iniciando actualización del clan...");

      // 1. Actualizar el nombre del clan
      await new Promise((res, rej) => {
        coneccion.query(
          `UPDATE Clanes SET nombre = ? WHERE id_clan = ?`,
          [nuevoNombre, id_clan],
          (error, resultado) => {
            if (error) return rej(error);
            console.log("✅ Nombre actualizado:", resultado);
            res();
          }
        );
      });

      // 2. Eliminar territorios existentes
      await new Promise((res, rej) => {
        coneccion.query(
          `DELETE FROM ClanTerri WHERE id_clan = ?`,
          [id_clan],
          (error, resultado) => {
            if (error) return rej(error);
            console.log("✅ Territorios eliminados:", resultado.affectedRows);
            res();
          }
        );
      });

      // 3. Insertar nuevos territorios (si hay)
      if (nuevoIdTerritorio) {
        const territorios = Array.isArray(nuevoIdTerritorio)
          ? nuevoIdTerritorio
          : [nuevoIdTerritorio];

        console.log("🟡 Insertando territorios:", territorios);

        for (const id_territorio of territorios) {
          await new Promise((res, rej) => {
            coneccion.query(
              `INSERT INTO ClanTerri (id_clan, id_territorio) VALUES (?, ?)`,
              [id_clan, id_territorio],
              (error, resultado) => {
                if (error) {
                  console.error("❌ Error al insertar territorio:", error);
                  return rej(error);
                }
                console.log("✅ Territorio insertado:", resultado);
                res();
              }
            );
          });
        }
      } else {
        console.log("⚠️ No se especificaron nuevos territorios");
      }

      resolve({ mensaje: "Clan actualizado con éxito" });
    } catch (error) {
      console.error("❌ Error general en actualizarClan:", error);
      reject(error);
    }
  });
}

function eliminarPergaminosPorClan(id_clan) {
  return new Promise((resolve, reject) => {
    coneccion.query(
      "DELETE FROM Pergaminos WHERE clan = ?",
      [id_clan],
      (error, resultado) => {
        if (error) reject(error);
        else resolve(resultado);
      }
    );
  });
}

function eliminarUsuariosPorGatos(id_clan) {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETE u FROM Usuarios u
      INNER JOIN Gatitos g ON u.id_gato = g.id_gato
      WHERE g.id_clan = ?;
    `;
    coneccion.query(sql, [id_clan], (error, resultado) => {
      if (error) reject(error);
      else resolve(resultado);
    });
  });
}

function eliminarClan(id_clan) {
  return eliminarRelacionesClan(id_clan).then(() => {
    return new Promise((resolve, reject) => {
      coneccion.query(
        "DELETE FROM Clanes WHERE id_clan = ?",
        [id_clan],
        (error, resultado) => {
          if (error) reject(error);
          else resolve(resultado);
        }
      );
    });
  });
}
function traerClanPorId(id_clan) {
  return new Promise((resolve, reject) => {
    coneccion.query(
      `SELECT * FROM Clanes WHERE id_clan = ?`,
      [id_clan],
      (error, resultado) => {
        if (error) {
          return reject(error);
        }
        resolve(resultado[0]);
      }
    );
  });
}
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

function crearClanConTerritorio(nombre, id_territorio) {
  return new Promise((resolve, reject) => {
    coneccion.query(
      `INSERT INTO Clanes (nombre) VALUES (?)`,
      [nombre],
      (error, resultado) => {
        if (error) return reject(error);

        const id_clan = resultado.insertId;

        coneccion.query(
          `INSERT INTO ClanTerri (id_clan, id_territorio) VALUES (?, ?)`,
          [id_clan, id_territorio],
          (err2) => {
            if (err2) return reject(err2);

            resolve(resultado);
          }
        );
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
function eliminarGatosPorClan(id_clan) {
  return new Promise((resolve, reject) => {
    coneccion.query(
      "DELETE FROM Gatitos WHERE id_clan = ?",
      [id_clan],
      (error, resultado) => {
        if (error) reject(error);
        else resolve(resultado);
      }
    );
  });
}
function existeUsuarioEnClan(id_clan) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT u.id_usuario FROM Usuarios u
      INNER JOIN Gatitos g ON u.id_gato = g.id_gato
      WHERE g.id_clan = ?
      LIMIT 1
    `;
    coneccion.query(sql, [id_clan], (error, results) => {
      if (error) return reject(error);
      resolve(results.length > 0);
    });
  });
}
function traerClanes() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT c.id_clan, c.nombre, GROUP_CONCAT(t.nombre SEPARATOR ', ') AS territorios
      FROM Clanes c
      LEFT JOIN ClanTerri ct ON c.id_clan = ct.id_clan
      LEFT JOIN Territorios t ON ct.id_territorio = t.id_territorio
      GROUP BY c.id_clan
    `;
    coneccion.query(query, (err, resultados) => {
      if (err) reject(err);
      else resolve(resultados);
    });
  });
}


module.exports = {
  traerClanesConTerritorios,
  crearClan,
  eliminarGatosPorClan,
  eliminarClan,
  eliminarRelacionesClan,
  traerClanPorId,
  crearClanConTerritorio,
  traerTerritorios,
  traerTerritorioPorClan,
  eliminarUsuariosPorGatos,
  eliminarPergaminosPorClan,
  existeUsuarioEnClan,
  traerClanes,
  actualizarClan
};