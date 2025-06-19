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
<<<<<<< HEAD
const ROUTERTERRITORIO = require('./routerterritorio')
=======
//const ROUTERTERRITORIO = require('./routerterritorio')
>>>>>>> c43450058822767d5ad0bf03f89e66782a86560b

router.use('/logout',ROUTERCERRARSESION);
router.use('/clanes',ROUTERCLANES);
router.use('/register',ROUTEREGISTER);
router.use('/home',ROUTERHOME);
router.use('/login',ROUTERLOGIN);
router.use('/perfil',ROUTERPERFIL);
router.use('/gatitos',ROUTERGATITOS);
router.use('/pergaminos',ROUTERPERGAMINOS);
<<<<<<< HEAD
router.use('/territorios',ROUTERTERRITORIO);
=======
//router.use('/territorios',ROUTERTERRITORIO);
>>>>>>> c43450058822767d5ad0bf03f89e66782a86560b

module.exports = router;


