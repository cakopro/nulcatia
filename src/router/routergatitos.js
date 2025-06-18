const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorgatitos')


router.get('/',controlador.vervistagatitos);

//router.get('/nuevo',controlador.formularioNuevoGatito);
//
//router.post('/', controlador.crearGatito);
//
//router.get('/:id/editar', controlador.formularioActualizarGatito);
//
//router.put('/:id', controlador.actualizarGatito);
//
//router.delete('/:id',controlador.eliminarGatito);
//
module.exports = router