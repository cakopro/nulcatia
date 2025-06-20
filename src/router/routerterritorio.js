const express = require('express');
const router = express.Router();
const controlador = require('../controller/controladorterritorio');


router.get('/', controlador.verVistaTerritorios);

router.get('/agregarterritorio', controlador.formularioTerritorio);

router.post('/', controlador.agregarTerritorio);

router.get('/:id/editar', controlador.formularioEditarTerritorio);

router.put('/:id', controlador.actualizarTerritorio); 

router.delete('/:id', controlador.eliminarTerritorio);

module.exports = router;