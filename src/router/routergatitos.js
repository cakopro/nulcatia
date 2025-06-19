const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorgatitos')


router.get('/',controlador.vervistagatitos);

router.get('/nuevo',controlador.formularioGatito);

router.post('/nuevo', controlador.crearGatito);

//router.get('/:id/editar', controlador.formularioActualizarGatito);

//router.put('/:id', controlador.actualizarGatito);
//
//router.delete('/:id',controlador.eliminarGatito);
//
module.exports = router