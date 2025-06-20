const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorpergaminos')

router.get('/',controlador.verVistaPergaminos);

router.get('/nuevopergamino',controlador.formularioPergaminos);

router.post('/nuevopergamino', controlador.crearPergamino);

router.get('/editarPergamino', controlador.formularioEditar);

// router.put('/:id', controlador.actualizarPergamino);

router.delete('/:id',controlador.confirmarEliminarPergamino);


module.exports = router