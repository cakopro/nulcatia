const express = require('express');
const app = express();
const port = 3000;

const homeRouter = require('./routes/routerhome');

app.use(express.json());

app.use('/routerhome', homeRouter);

app.get('/', (req, res) => {
  res.send('Bienvenido a la API principal');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
