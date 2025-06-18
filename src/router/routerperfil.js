const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorperfil')

router.get('/',controlador.verperfil);
router.get('/editar',controlador.vistaEditarPerfil)
router.put('/editar/:id', controlador.editarperfil)
router.delete('/editar', controlador.eliminarPerfil)

module.exports = router