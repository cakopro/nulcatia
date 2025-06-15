const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Bienvenido a la ruta /home');
});

router.get('/info', (req, res) => {
  res.json({ mensaje: 'Esta es la información del home' });
});

module.exports = router;
