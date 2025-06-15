
const cerrarSesion = ((req,res)=>{
    req.session.destroy(error =>{
        if(error){
            console.error('error al cerrar sesion',error);
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/home')
    })
})

module.exports = {cerrarSesion}