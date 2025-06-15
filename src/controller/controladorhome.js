
const verhome = ((req,res) => {
    res.render('index', { usuario: req.session.usuario || null });
})

module.exports = {verhome}