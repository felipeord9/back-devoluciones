const express = require("express");
const cors = require("cors");
const morgan = require('morgan')
const bodyParser = require('body-parser')
const routerApi = require("./v1/routes");
const { errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler')
const { config } = require("./config/config");

const { port, host } = config;

const app = express();

// Se declaran las opciones de cors
/* let corsOptions = {
  origin: 'https://pedidos.granlangostino.net:5515',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}  */

// Configuraciones de la aplicación
app.use(bodyParser.json());
app.use(cors())
app.use(morgan("dev"))
//app.use(cors(corsOptions));

// Configuracion de passport con sus estrategias de autenticacion
require('./utils/auth')

// Enrutar la aplicación
routerApi(app)

//Middlewares
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

// Iniciar servidor en un host y puerto
app.listen(port, host, () => {
  console.log(`Server on http://${host}:${port}`);
});
