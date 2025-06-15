const {Router} = require('express');
const router = Router()
const ROUTERCERRARSESION = require('./routercerrarsesion')
const ROUTERCLANES = require('./routerclanes')
const ROUTEREGISTER = require('./routeregister')
const ROUTERGATITOS = require('./routergatitos')
const ROUTERHOME = require('./routerhome')
const ROUTERLOGIN = require('./routerlogin')
const ROUTERPERFIL = require('./routerperfil')
const ROUTERPERGAMINOS = require('./routerpergaminos')
const ROUTERTERRITORIO = require('./routerterritorio')

router.use('/logout',ROUTERCERRARSESION);
router.use('/clanes',ROUTERCLANES);
router.use('/register',ROUTEREGISTER);
router.use('/gatitos',ROUTERGATITOS);
router.use('/home',ROUTERHOME);
router.use('/logins',ROUTERLOGIN);
router.use('/perfil',ROUTERPERFIL);
router.use('/pergaminos',ROUTERPERGAMINOS);
router.use('/territorios',ROUTERTERRITORIO);

module.exports = router;


