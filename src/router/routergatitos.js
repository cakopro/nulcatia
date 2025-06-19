const {Router} = require('express');
const router = Router()
const controlador = require('../controller/controladorgatitos')


router.get('/',controlador.verVistaGatitos);

router.get('/nuevo',controlador.formularioGatito);

router.post('/nuevo', controlador.agregarGatito);


module.exports = router