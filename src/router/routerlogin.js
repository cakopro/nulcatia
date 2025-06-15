const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorlogin')

router.get('/',controlador.verlogin);
router.post('/',controlador.verificarlogin);

module.exports = router
