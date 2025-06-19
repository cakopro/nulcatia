const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorlogin')

router.get('/',controlador.verLogin);
router.post('/',controlador.verificarLogin);

module.exports = router
