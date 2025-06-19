const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorperfil')

router.get('/',controlador.verPerfil);
router.get('/editar',controlador.vistaEditarPerfil)
router.put('/editar/:id', controlador.editarPerfil)
router.put('/editar', controlador.editarPerfilSinGato);
router.delete('/editar', controlador.eliminarPerfil)

module.exports = router