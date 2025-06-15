require('dotenv').config()
const express = require('express')
const config = require('./config/config')
const router = require('./router/index')
const path = require('path')
const session = require('express-session'); 
/* Definen los objetos del sistema o propiedades del sistema */
const app = express();

// Settings
app.set('port',config.app.port);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

// Middleware para exponer usuario en todas las vistas (locals)
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

app.get('/', (req, res) => {
  res.redirect('/home');
});


app.use('/', router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});


/* En cuarto lugar se define el hilo del sistema, 
el cual escuchara cualquier comunicacion que llegue,
por url al servidor */
app.listen(app.get('port'), () =>{
    console.log(`El server se levanto en: http://localhost:${app.get('port')}`)                                                 
})