const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorperfil')

router.get('/',controlador.verperfil);
router.get('/editar',controlador.editarperfil)
module.exports = router