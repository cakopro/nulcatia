const models = require('../models/modelperfil');


const verperfil = ((req,res) => {
    if (!req.session.usuario || !req.session.usuario.id_gato) {
        return res.redirect('/home');
    }
    const id = req.session.usuario.id_gato
    models.traerDatosGato(id)
    .then((Gato) =>{
        const fecha = new Date(Gato.fecha_nacimiento);
        const fechaFormateada = fecha.toLocaleDateString('es-CL'); // Chile
        Gato.fecha_nacimiento = fechaFormateada;
        res.render('perfil', { Gato, usuario: req.session.usuario });
    })
    .catch((error) => {
        res.status(500).send('Error: ' + error);
    })
    
})

const vistaEditarPerfil = ((req,res) =>{
    models.traerClanes()
    .then((clanes) =>{
        res.render('editar', {clanes} );
    })
    .catch((error) =>{
        res.status(500).send('Error: ' + error);
    })
})

const editarperfil = ((req,res) =>{
    const {nombre_usuario, contraseña, correo, nombre, apellido, fecha_nacimiento, id_clan, experiencia} = req.body;

    const datosUsuario = {nombre_usuario, contraseña, correo}
    const datosGato =  {nombre, apellido, fecha_nacimiento, id_clan, experiencia}

    const id_gato = req.params.id;
    const id_usuario = req.session.usuario.id_usuario;

    models.actualiarUsuario(datosUsuario,id_usuario)
        .then(() => {
            return models.actualiarGato(datosGato, id_gato);
        })
        .then(() => {
            res.redirect('/perfil');
        })
        .catch((error) => {
            res.status(500).send('Error al actualizar: ' + error);
        });
});

const eliminarPerfil = (req,res) =>{
    const id_usuario = req.session.usuario.id_usuario
    const id_gato = req.session.usuario.id_gato;
    models.eliminarUsuario(id_usuario)
    .then(() => {
        return models.eliminarGato(id_gato); 
    })
    .then(() => {
        req.session.destroy();
        res.redirect('/');
    })
    .catch((error) =>{
        res.status(500).send('Error al eliminar perfil: ' + error)
    })
}

module.exports = {verperfil, vistaEditarPerfil, editarperfil, eliminarPerfil}