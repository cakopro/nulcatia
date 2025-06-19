const {Router} = require('express');
const router = Router()
const controller = require("../controller/controladorclanes");

router.get("/", controller.verVistaClanes);
router.post("/", controller.agregarClan);
router.post("/eliminar/:id", controller.eliminarClan);

module.exports = router;