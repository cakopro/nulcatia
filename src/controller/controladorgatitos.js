
const vervistagatitos = ((req,res) => {
    res.render('gatitos', { usuario: req.session.usuario || null });
})

const formularioGatito = ((req, res) => {
  models.traerClanes()
    .then((clanes) => {
      res.render('nuevo', { usuario: req.session.usuario || null, clanes });
    })
    .catch(error => {
      res.status(500).send("Error al cargar clanes: " + error);
    });
});

const crearGatito = ((req,res) =>{
    const {nombre, apellido, fecha_nacimiento, id_clan, experiencia} = req.body
    const id_usuario = req.session.usuario.id_usuario;
    
    models.traerNombreCompleto(nombre,apellido)//se cumplen todas las promesas  
    .then((existeNombreCompleto) =>{
        const errores = {};
        if (existeNombreCompleto) errores.nombreCompleto = "Nombre completo del gato ya registrado"; // creamos un clave valor si alguna promesa devolvio un resultado

        if (Object.keys(errores).length > 0){
                    res.render('gatitos', {
                        errores,
                        datos: req.body
                    });
                    return null; 
                }
                //crear gato
                return models.agregarGatito(nombre, apellido, fecha_nacimiento, id_clan, experiencia);
    })
    .then((resultado) => {
            if (!resultado) return; 

            const id_gato = resultado.insertId;
            // Actualizar usuario con id_gato
            return models.actualizarUsuario(id_gato, id_usuario).then(() => id_gato);
    })
    .then((id_gato) => {
            if (!id_gato) return;
            // Actualizar la sesión
            req.session.usuario.id_gato = id_gato;
            // Redirigir a perfil
            res.redirect('/perfil');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send("Error al crear gatito: " + error);
    });
})

module.exports = {vervistagatitos, crearGatito, formularioGatito}