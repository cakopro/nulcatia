const verClanes = ((req,res) => {
    res.render('index', { usuario: req.session.usuario || null });
})

module.exports = {verClanes}