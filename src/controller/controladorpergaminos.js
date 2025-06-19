const models = require("../models/modelspergaminos");

const verVistaPergaminos = (req, res) => {
  models.traerPergaminos()
  .then((pergaminos) => {
      res.render("pergaminos", { usuario: req.session.usuario || null , pergaminos});
  })
  .catch((error) => {
    res.status(500).send("Error al cargar pergaminos: " + error);
  })
};



module.exports = {verVistaPergaminos}