const models = require("../models/modelspergaminos");

const verVistaPergaminos = (req, res) => {
  models.traerPergaminos()
    .then((pergaminos) => {
      res.render("pergaminos", {
        usuario: req.session.usuario || null,
        pergaminos,
      });
    })
    .catch((error) => {
      res.status(500).send("Error al cargar pergaminos: " + error);
    });
};

const formularioPergaminos = (req, res) => {
  models.traerClanes()
    .then((clanes) => {
      res.render("nuevopergamino", {
        usuario: req.session.usuario || null,
        clanes,
        datos: {},
      });
    })
    .catch((error) => {
      res.status(500).send("Error al cargar clanes: " + error);
    });
};


const crearPergamino = (req, res) => {
  const { id_clan, titulo, texto } = req.body;
  models.agregarPergamino(id_clan, titulo, texto)
    .then(() => {
      res.redirect("/pergaminos");
    })
    .catch((error) => {
      console.error("Error al agregar pergamino:", error);
      models.traerClanes().then((clanes) => {
        res.render("nuevopergamino", {
          usuario: req.session.usuario || null,
          clanes,
          datos: { id_clan, titulo, texto },
          error: "Hubo un error al crear el pergamino. Inténtalo de nuevo."
        });
      });
    });
};

const confirmarEliminarPergamino = (req,res) => {
  const {id} = req.params;
  models.eliminarPergamino(id)
  .then((resultado) => {
    res.redirect('/pergaminos')
  })
  .catch((error) => {
    res.status(500).send("Error al cargar clanes: " + error);
  })

}

const formularioEditar = (req, res) => {
  models.traerClanes()
    .then((clanes) => {
      res.render("/pergaminos/editarPergamino", {
        usuario: req.session.usuario || null,
        clanes,
        datos: {},
      });
    })
    .catch((error) => {
      res.status(500).send("Error al cargar editor: " + error);
    });
};



module.exports = { verVistaPergaminos, formularioPergaminos, crearPergamino,confirmarEliminarPergamino, formularioEditar };
