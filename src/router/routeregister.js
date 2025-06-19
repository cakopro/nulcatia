const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controlleregister')

router.get('/',controlador.verRegister);

router.post('/',controlador.insertarUsuario);

module.exports = router