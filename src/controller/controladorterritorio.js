const models = require("../models/modelsterritorios");
const clanesv = require('../models/modelsclanes')

const verVistaTerritorios = (req, res) => {
  models.traerTerritorios()
    .then(territorios => {
      res.render("territorios", {
        usuario: req.session.usuario || null,
        territorios
      });
    })
    .catch(error => {
      res.status(500).send("Error al cargar territorios: " + error);
    });
};

const formularioTerritorio = (req, res) => {
  res.render("nuevoterritorio", {
    usuario: req.session.usuario || null,
    errores: {},
    datos: {}
  });
};

const agregarTerritorio = (req, res) => {
  const { nombre, kilometros } = req.body;

  models.crearTerritorio(nombre, kilometros)
    .then(() => {
      res.redirect("/territorios");
    })
    .catch(error => {
      res.status(500).send("Error al agregar territorio: " + error);
    });
};

const formularioEditarTerritorio = (req, res) => {
  const id = req.params.id;
  models.traerTerritorioPorId(id)
    .then(territorio => {
      res.render("editarterritorio", {
        usuario: req.session.usuario || null,
        territorio,
        errores: {}
      });
    })
    .catch(error => {
      res.status(500).send("Error al cargar el formulario: " + error);
    });
};
const actualizarTerritorio = (req, res) => {
  const id = req.params.id;
  const { nombre, kilometros } = req.body;

  const errores = {};
  if (!nombre || !nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  if (!kilometros || isNaN(kilometros)) errores.kilometros = "Los kilómetros deben ser un número.";

  if (Object.keys(errores).length > 0) {
    models.traerTerritorioPorId(id)
      .then(territorio => {
        res.render("editarterritorio", {
          usuario: req.session.usuario,
          territorio,
          errores
        });
      });
    return;
  }

  models.actualizarTerritorio(id, nombre.trim(), parseFloat(kilometros))
    .then(() => res.redirect("/territorios"))
    .catch(error => {
      res.status(500).send("Error al actualizar el territorio: " + error);
    });
};

const eliminarTerritorio = async (req, res) => {
  const id = req.params.id;

  try {
    const hayRelacion = await models.existeRelacionEnClanterri(id);

    if (hayRelacion) {
      const territorios = await models.traerTerritorios();
      return res.render("territorios", {
        usuario: req.session.usuario,
        territorios,
        error: "No puedes eliminar el territorio porque tiene clanes registrados.",
        mensaje: null
      });
    }

    // No hay registros relacionados, se puede eliminar
    await models.eliminarTerritorio(id);

    const territorios = await models.traerTerritorios();
    return res.render("territorios", {
      usuario: req.session.usuario,
      territorios,
      error: null,
      mensaje: "Territorio eliminado correctamente."
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el territorio.");
  }
};



module.exports = {
  verVistaTerritorios,
  formularioTerritorio,
  agregarTerritorio,
  formularioEditarTerritorio,
  actualizarTerritorio,
  eliminarTerritorio
};
