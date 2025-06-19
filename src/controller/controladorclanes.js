const models = require("../models/modelsclanes");

const verVistaClanes = (req, res) => {
  models
    .traerClanesConTerritorios()
    .then((clanes) => {
      res.render("clanes", {
        usuario: req.session.usuario || null,
        clanes,
      });
    })
    .catch((error) => {
      res.status(500).send("Error al cargar clanes: " + error);
    });
};

const agregarClan = (req, res) => {
  const { nombre } = req.body;

  if (!req.session.usuario || req.session.usuario.rol !== "admin") {
    return res.status(403).send("Acceso denegado: Solo administradores");
  }

  models
    .crearClan(nombre)
    .then(() => {
      res.redirect("/clanes");
    })
    .catch((error) => {
      res.status(500).send("Error al crear clan: " + error);
    });
};

const eliminarClan = (req, res) => {
  const id = req.params.id;

  if (!req.session.usuario || req.session.usuario.rol !== "admin") {
    return res.status(403).send("Acceso denegado: Solo administradores");
  }

  models
    .eliminarClan(id)
    .then(() => {
      res.redirect("/clanes");
    })
    .catch((error) => {
      res.status(500).send("Error al eliminar clan: " + error);
    });
};

module.exports = {
  verVistaClanes,
  agregarClan,
  eliminarClan,
};
