const models = require('../models/models.ogin');

const verhome = (req, res) => {
  res.render('logins', { error: null });
};

const obtenerPersonas = (req, res) => {
  const { nombre, rol } = req.body;

  models.verificarGatito(nombre, rol)
  
    .then((datos) => {
      if (datos.length === 0) {
        return res.render('logins', { error: 'Nombre o rol incorrecto' });
      }
      req.session.usuario = datos[0]; // Guarda el gatito en la sesión
      res.redirect('/home');
    })
    .catch((error) => {
      res.status(500).send('Error: ' + error);
    });
};

module.exports = { verhome, obtenerPersonas };
