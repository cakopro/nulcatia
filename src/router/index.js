const {Router} = require('express');
const router = Router()
const ROUTERHOME = require('./routerhome')

router.use('/',ROUTERHOME);

module.exports = router;


