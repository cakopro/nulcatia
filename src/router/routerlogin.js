const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorlogin')

router.get('/',controlador.verhome);
router.post('/',controlador.obtenerPersonas);

module.exports = router
