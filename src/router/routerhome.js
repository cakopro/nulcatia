const {Router} = require('express');
const router = Router()
const controladorhome = require('../controller/controladorhome')

router.get('/',controladorhome.verHome)

module.exports = router;
