const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorclanes')

router.get('/',controlador.verClanes);

// router.get('/nuevo',controlador.FormularioNuevoClan);

// router.post('/', controlador.crearClan);

// router.get('/:id/editar', controlador.formularioActualizarClan);

// router.put('/:id', controlador.actualizarClan);

// router.delete('/:id',controlador.eliminarClan);

module.exports = router