require('dotenv').config()
const express = require('express')
const config = require('./config/config')
const router = require('./routers/index')
const path = require('path')
/* Definen los objetos del sistema o propiedades del sistema */
const app = express();

// Settings
app.set('port',config.app.port);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/home',router);

/* En cuarto lugar se define el hilo del sistema, 
el cual escuchara cualquier comunicacion que llegue,
por url al servidor */
app.listen(app.get('port'), () =>{
    console.log(`El server se levanto en: http://localhost:${app.get('port')}`)                                                 
})