const express = require('express');
const router = express.Router();
const certificadoController = require('../controllers/certificadoController');

router.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));
router.post('/certificados/emitir', certificadoController.emitirCertificado);
router.get('/certificados/validar/:hash', certificadoController.validarCertificado);
router.get('/certificados', certificadoController.listarCertificados);
router.get('/status', certificadoController.getStatus);

module.exports = router;
