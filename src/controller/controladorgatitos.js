const vervistagatitos = ((req,res) => {
    res.render('gatitos', { usuario: req.session.usuario || null });
})

module.exports = {vervistagatitos}