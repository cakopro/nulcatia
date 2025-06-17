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

const editarperfil = ((req,res) =>{
    res.render('editar', { usuario: req.session.usuario || null });
})
module.exports = {verperfil, editarperfil}