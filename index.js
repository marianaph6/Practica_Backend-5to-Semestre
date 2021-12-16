/** 
 * ARCHIVO PRINCIPAL DE LA API DE UNIVERSIDAD
 */

const express = require('express')
const app = express();
const router = require('./app/routers/index') //Importar rutas (routers)

app.use(express.json());

app.use('/', router)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})