const express= require('express'); //es como una importación
require('dotenv').config(); //para usar variable de entorno 
const { dbConnection } = require('./database/config');

//mostrar todos lo procesos que corren en el env
// console.log(process.env)

//Crear el servidor de express
const app= express();

//base de datos
dbConnection();

//Directorio Público
app.use(express.static('public')); //es una funcion que se ejecuta en el momento que alguien ahce una petición a mi servidor

//Lectura y parseo del body
app.use(express.json());

//Rutas
//TODO:  auth // crear, login, renew
app.use('/api/auth', require('./routes/auth')); //todo lo relacionada a la utenticacion estara en esta ruta
//TODO: CRUD: Eventos


//Escuchar peticiones
app.listen(process.env.PORT, ()=>{ //4000 es el puerto, no hacemos 3000 porque lo usaremos 
    console.log(`servideor corriendo en puerto ${process.env.PORT}`);
})