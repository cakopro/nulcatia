const verHome = ((req,res) => {
    res.render('index', { usuario: req.session.usuario || null });
})

module.exports = {verHome}