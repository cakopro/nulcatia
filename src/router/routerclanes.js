const {Router} = require('express');
const router = Router()

router.get('/',controlador.VerClanes);

router.get('/nuevo',controlador.FormularioNuevoClan);

router.post('/', controlador.crearClan);

router.get('/:id/editar', controlador.formularioActualizarClan);

router.put('/:id', controlador.actualizarClan);

router.delete('/:id',controlador.eliminarClan);