const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorpergaminos')

<<<<<<< HEAD
// router.get('/',controlador.verPergaminos);

// router.get('/nuevo',controlador.formularioPergaminos);

// router.post('/', controlador.crearPergamino);

// router.get('/:id/editar', controlador.formularioActualizarPergamino);

// router.put('/:id', controlador.actualizarPergamino);

// router.delete('/:id',controlador.eliminarPergamino);


=======
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
>>>>>>> c43450058822767d5ad0bf03f89e66782a86560b
module.exports = router