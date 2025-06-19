const models = require('../models/modelsregister');

const verRegister = ((req,res) => {
    res.render('register', { usuario: req.session.usuario || null,
        datos:{},
        errores:{}
     });
})

const insertarUsuario = ((req,res) => {
    const {nombre_usuario, contraseña, correo} = req.body
    Promise.all([
        models.traerNombres(nombre_usuario), //se cumplen todas las promesas  
        models.traerCorreo(correo)
    ])
    .then(([existeNombre, existeCorreo]) => { // rescatamos los datos de las promesas
        const errores = {};
        if (existeNombre) errores.nombre_usuario = "Nombre de usuario ya existe"; // creamos un clave valor si alguna promesa devolvio un resultado
        if (existeCorreo) errores.correo = "Correo ya esta registrado";
        
        if (Object.keys(errores).length > 0){
            res.render('register', {
                errores,
                datos: req.body
            });
            return null; 
        }
        return models.agregarUsuario({ nombre_usuario, contraseña, correo});
    })
    .then((resultado) =>{
        if (resultado) {
           res.redirect('/login') 
        }
    })
    .catch(error => {
        if (!res.headersSent) {
            res.status(500).send("Error en el registro: " + error);
        }
    })
})

module.exports = {verRegister, insertarUsuario}