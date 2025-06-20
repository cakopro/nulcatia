const {Router} = require('express');
const router = Router()
const controller = require("../controller/controladorclanes");

router.get("/", controller.verVistaClanes);
router.post("/eliminar/:id", controller.eliminarClan);
router.get('/editarclan/:id', controller.mostrarFormularioEditar);
router.post('/editarclan/:id', controller.procesarEditarClan);
router.get('/agregarclan', controller.mostrarFormularioAgregar);
router.post('/agregarclan', controller.procesarAgregarClan);


module.exports = router;