const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorpergaminos')

router.get('/',controlador.verVistaPergaminos);
//
//router.get('/nuevo',controlador.formularioPergaminos);
//
//router.post('/', controlador.crearPergamino);
//
//router.get('/:id/editar', controlador.formularioActualizarPergamino);
//
//router.put('/:id', controlador.actualizarPergamino);
//
//router.delete('/:id',controlador.eliminarPergamino);
//
//
module.exports = router