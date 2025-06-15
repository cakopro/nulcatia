const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorcerrarsesion')

router.get('/',controlador.cerrarSesion);


module.exports = router