/* Definen los objetos del sistema o propiedades del sistema */
const express = require('express')
const config = require('./config/config')
const router = require('./router/index')
const path = require('path')
const session = require('express-session'); 
const app = express();

// Settings
app.set('port',config.app.port);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//crea una cookie con la cual almacenaremos el inicio de sesion de un usuario.
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

// Middleware para que el inicio de sesion de un usuario aparezca en todas las vistas solo ocupando usuario
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});
// redireccionar a home cada que se entre a la ruta raizs
app.get('/', (req, res) => {
  res.redirect('/home');
});

app.use('/', router);
// error global que imprimira el error en una vista llamada error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});


/* escuchara cualquier comunicacion que llegue,
por url al servidor */
app.listen(app.get('port'), () =>{
    console.log(`El server se levanto en: http://localhost:${app.get('port')}`)                                                 
})