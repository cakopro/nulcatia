const models = require("../models/modelsclanes");

const verVistaClanes = (req, res) => {
  models
    .traerClanes()
    .then((clanes) => {
      res.render("clanes", {
        usuario: req.session.usuario || null,
        clanes,
        error: null,
        mensaje: null
      });
    })
    .catch((error) => {
      res.status(500).send("Error al cargar clanes: " + error);
    });
};

const mostrarFormularioAgregar = async (req, res) => {
    try {
        if (!req.session.usuario || req.session.usuario.rol !== "admin") {
            return res.status(403).send("Acceso denegado");
        }

        const territorios = await models.traerTerritorios();
        res.render("agregarclan", {
            usuario: req.session.usuario,
            territorios,
        });
    } catch (error) {
        res.status(500).send("Error al cargar formulario: " + error);
    }
};

const procesarAgregarClan = (req, res) => {
    const { nombre } = req.body;

    if (!req.session.usuario || req.session.usuario.rol !== "admin") {
        return res.status(403).send("Acceso denegado");
    }

    models
        .crearClan(nombre)
        .then(() => res.redirect("/clanes"))
        .catch((error) => res.status(500).send("Error al agregar clan: " + error));
};

const mostrarFormularioEditar = async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.session.usuario || req.session.usuario.rol !== "admin") {
            return res.status(403).send("Acceso denegado");
        }

        const clan = await models.traerClanPorId(id);
        if (!clan) return res.status(404).send("Clan no encontrado");

        const territorios = await models.traerTerritorios();
        const territorioAsignado = await models.traerTerritorioPorClan(id);

        res.render('editarclan', {
            usuario: req.session.usuario,
            datos: clan,
            territorios,
            territorioActualId: territorioAsignado ? territorioAsignado.id_territorio : null,
        });
    } catch (error) {
        res.status(500).send("Error al cargar formulario de edición: " + error);
    }
};


const procesarEditarClan = (req, res) => {
    const id = req.params.id;
    const { nombre, territorio } = req.body;

    if (!req.session.usuario || req.session.usuario.rol !== "admin") {
        return res.status(403).send("Acceso denegado");
    }

    const id_territorio = Number(territorio);

    models
        .actualizarClan(id, nombre, id_territorio)
        .then(() => res.redirect("/clanes"))
        .catch((error) =>
            res.status(500).send("Error al actualizar clan: " + error)
        );
};


const eliminarClan = async (req, res) => {
  const id = req.params.id;

  if (!req.session.usuario || req.session.usuario.rol !== "admin") {
    return res.status(403).send("Acceso denegado");
  }

  try {
    const existeUsuario = await models.existeUsuarioEnClan(id);

    if (existeUsuario) {
      const clanes = await models.traerClanes();
      return res.render("clanes", {
        usuario: req.session.usuario,
        clanes,
        error: "No puedes eliminar el clan: hay usuarios registrados con gatos en este clan.",
        mensaje: null
      });
    }

    await models.eliminarRelacionesClan(id);
    await models.eliminarClan(id);

    const clanes = await models.traerClanes();
    res.render("clanes", {
      usuario: req.session.usuario,
      clanes,
      error: null,
      mensaje: "Clan eliminado correctamente."
    });
  } catch (error) {
    res.status(500).send("Error al eliminar clan: " + error);
  }
};




const agregarClan = async (req, res) => {
    try {
        if (!req.session.usuario || req.session.usuario.rol !== "admin") {
            return res.status(403).send("Acceso denegado");
        }

        const { nombre, territorio } = req.body;
        await models.crearClanConTerritorio(nombre, territorio);

        res.redirect("/clanes");
    } catch (error) {
        res.status(500).send("Error al agregar clan: " + error);
    }
};
module.exports = {
    verVistaClanes,
    mostrarFormularioAgregar,
    procesarAgregarClan,
    mostrarFormularioEditar,
    procesarEditarClan,
    eliminarClan,
    agregarClan
};
