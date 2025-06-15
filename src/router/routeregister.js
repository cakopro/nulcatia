const {Router} = require('express');
const router = Router()

router.get('/',controlador.formularioRegistrarse);
router.post('/',controlador.registrarse);


module.exports = router