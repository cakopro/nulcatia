const models = require('../models/modelperfil');


const verperfil = (req, res) => {
    const usuario = req.session.usuario;
    // Si no está logeado
    if (!usuario) return res.redirect('/login');

    // Si no tiene gato, renderiza solo con usuario
    if (!usuario.id_gato) {
        return res.render('perfil', { usuario, Gato: null });
    }

    const id = usuario.id_gato;
    models.traerDatosGato(id)
        .then((Gato) => {
            const fecha = new Date(Gato.fecha_nacimiento);
            const fechaFormateada = fecha.toLocaleDateString('es-CL');
            Gato.fecha_nacimiento = fechaFormateada;
            res.render('perfil', { Gato, usuario });
        })
        .catch((error) => {
            res.status(500).send('Error: ' + error);
        });
};

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
            req.session.usuario.nombre_usuario = nombre_usuario;
            req.session.usuario.contraseña = contraseña;
            req.session.usuario.correo = correo;
            return models.actualiarGato(datosGato, id_gato);
        })
        .then(() => {
            res.redirect('/perfil');
        })
        .catch((error) => {
            res.status(500).send('Error al actualizar: ' + error);
        });
});

const editarperfilSinGato = (req, res) => {
    const { nombre_usuario, contraseña, correo } = req.body;
    const datosUsuario = { nombre_usuario, contraseña, correo };

    const id_usuario = req.session.usuario.id_usuario;

    models.actualiarUsuario(datosUsuario, id_usuario)
        .then(() => {
            req.session.usuario.nombre_usuario = nombre_usuario;
            req.session.usuario.contraseña = contraseña;
            req.session.usuario.correo = correo;
            res.redirect('/perfil');
        })
        .catch(error => res.status(500).send('Error al actualizar sin gato: ' + error));
};

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

module.exports = {verperfil, vistaEditarPerfil, editarperfil, eliminarPerfil, editarperfilSinGato}