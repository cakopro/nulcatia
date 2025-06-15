const {Router} = require('express');
const router = Router()
const ROUTERHOME = require('./routerhome')
const ROUTERLOGIN = require('./routerlogin')

router.use('/home',ROUTERHOME);
router.use('/logins',ROUTERLOGIN);

module.exports = router;


