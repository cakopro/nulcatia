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
  const usuario = req.session.usuario;
  if (!usuario || usuario.rol !== 'admin') {
    return res.status(403).send('Acceso denegado');
  }
  models.traerClanDelGato(usuario.id_gato)
    .then((claninfo) => {
      if (!claninfo) {
        return res.status(500).send("Error: no se pudo determinar el clan");
      }
      res.render("nuevopergamino", {
        usuario,
        id_clan: claninfo.id_clan,
        datos: {},
      });
    })
    .catch((error) => {
      res.status(500).send("Error al cargar datos del clan: " + error);
    });
};


const crearPergamino = (req, res) => {
  const { id_clan, titulo, texto } = req.body;
  models.agregarPergamino(id_clan, titulo, texto)
    .then(() => {
      res.redirect("/pergaminos");
    })
    .catch((error) => {
      res.render("nuevopergamino", {
      usuario: req.session.usuario || null,
      id_clan,
      datos: { titulo, texto },
      error: "Hubo un error al crear el pergamino. Inténtalo de nuevo."
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
    res.status(500).send("Error al cargar pergaminos: " + error);
  })

}

const formularioEditar = (req, res) => {
  const usuario = req.session.usuario;
  if (!usuario || usuario.rol !== 'admin') {
    return res.status(403).send('Acceso denegado');
  }
  const { id } = req.params; 

    models.traerPergaminoPorId(id)
    .then((pergamino) => {
      if (!pergamino) {
        return res.status(404).send("Pergamino no encontrado");
      }
      res.render("editarPergamino", {
        usuario: req.session.usuario || null,
        datos: pergamino,  
      });
    })
    .catch((error) => {
      res.status(500).send("Error al cargar editor: " + error);
    });
};


const actualizarPergamino = (req, res) => {
  const { id } = req.params;
  const { titulo, texto } = req.body;

  models.actualizarPergamino(id, titulo, texto)
    .then(() => {
      res.redirect('/pergaminos');
    })
    .catch(error => {
      res.status(500).send('Error al actualizar pergamino: ' + error);
    });
};

module.exports = { verVistaPergaminos, formularioPergaminos, crearPergamino,confirmarEliminarPergamino, formularioEditar, actualizarPergamino };
