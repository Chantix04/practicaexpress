//El src es el directorio de trabajo

//SERVIDOR EXPRESS
//importaciones de librerías que necesitará el proyecto

const express=require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const conectarBD = require('../database/connection');
require('dotenv').config();
require('ejs')
require('../database/connection')

//Se incializa la librería

const app = express();

//Configuraciones
app.use(express.json())
const port = process.env.PORT || 3000;
conectarBD();

//Middlewares (funciones que se van a anteponer a las rutas)

app.use(cors());
app.use(morgan('dev'));


// const myPath = __dirname;
// const myPath2 = path.join(__dirname, 'public'):

// console.table({myPath, myPath2});

//Recursos estáticos

app.use(express.static(path.join(__dirname, 'public')));

//Rutas

app.use(require('./routes/users.routes'));
app.use(require('./routes/task.routes'));

// Template Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Iniciar servidor

app.listen(port, console.log(`Servidor corriendo en el puerto ${port}`))