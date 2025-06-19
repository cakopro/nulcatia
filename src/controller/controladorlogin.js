const models = require('../models/modelslogin');

const verLogin = (req, res) => {
  res.render('login', { error: null } );
};

const verificarLogin = (req, res) => {
  const { nombre_usuario,contraseña, correo  } = req.body;
  models.verificarUsuario(nombre_usuario,contraseña, correo)
    .then((datos) => {
      if (datos.length === 0) {
        return res.render('login', { error: 'Nombre o rol incorrecto' });
      }
      req.session.usuario = datos[0]; 
      res.redirect('/home');
    })
    .catch((error) => {
      res.status(500).send('Error: ' + error);
    });
};

module.exports = { verLogin, verificarLogin };
