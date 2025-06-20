const models = require("../models/modelspergaminos");

const verVistaPergaminos = (req, res) => {
  const usuario = req.session.usuario || null;

  if (!usuario){
    models.traerPergaminos()
    .then((pergaminos) => {
      res.render('pergaminos',{usuario,pergaminos, nombreClan:null})
    })
    .catch((error) => {
      res.status(500).send("error al cargar pergaminos" + error)
    })
  } else {
    models.traerClanDelGato(usuario.id_gato)
    .then((claninfo) => {
      if (!claninfo){
        return models.traerPergaminos()
        .then((pergaminos) =>{
          res.render('pergaminos', {usuario,pergaminos, nombreClan:null})
        })
      }else {
        return models.traerPergaminosPorClan(claninfo.id_clan)
        .then((pergaminos) => {
          res.render('pergaminos', {usuario, pergaminos, id_clan: claninfo.id_clan, nombreClan: claninfo.nombre }) 
        })
      }
    })
    .catch((error) => {
      res.status(500).send('error al cargar pergaminos' + error)
    })
  }
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
  const { id } = req.params; 
  Promise.all([
    models.traerClanes(),
    models.traerPergaminoPorId(id)
  ])
    .then(([clanes, pergamino]) => {
      if (!pergamino) {
        return res.status(404).send("Pergamino no encontrado");
      }
      res.render("editarPergamino", {
        usuario: req.session.usuario || null,
        clanes,
        datos: pergamino,  
      });
    })
    .catch((error) => {
      res.status(500).send("Error al cargar editor: " + error);
    });
};


const actualizarPergamino = (req, res) => {
  const { id } = req.params;
  const { clan, titulo, texto } = req.body;

  models.actualizarPergamino(id, clan, titulo, texto)
    .then(() => {
      res.redirect('/pergaminos');
    })
    .catch(error => {
      res.status(500).send('Error al actualizar pergamino: ' + error);
    });
};

module.exports = { verVistaPergaminos, formularioPergaminos, crearPergamino,confirmarEliminarPergamino, formularioEditar, actualizarPergamino };
