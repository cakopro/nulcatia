const models = require('../models/modelslogin');

const verlogin = (req, res) => {
  res.render('logins', { error: null } );
};

const verificarlogin = (req, res) => {
  const { nombre_usuario,contraseña, correo  } = req.body;
  console.log(nombre_usuario,contraseña,correo)
  models.verificarUsuario(nombre_usuario,contraseña, correo)
    .then((datos) => {
      if (datos.length === 0) {
        return res.render('logins', { error: 'Nombre o rol incorrecto' });
      }
      req.session.usuario = datos[0]; 
      res.redirect('/home');
    })
    .catch((error) => {
      res.status(500).send('Error: ' + error);
    });
};

module.exports = { verlogin, verificarlogin };
