/*
    rutas de events
    host +/api/events

*/


const { validarJWT } = require('../middlewares/validar-jwt');

const { validarcampos } = require('../middlewares/validar-campos'); //mostrar los errores

const { Router } = require("express");
const { getEventos, crearEvento, actualziarEvento, eliminarEvento } = require("../controllers/events");
const { check } = require('express-validator'); //validar los campos 
const { isDate } = require('../helpers/isDate');
const router=Router();


// Todas tienen que pasar por la validacion del JWT
router.use(validarJWT);//todo lo de abajo antes de ejecutar tiene que validar su token


//Obtener eventos
router.get('/', getEventos);

// //Crear un nuevo evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalizacion es obligatoria').custom(isDate),
        validarcampos
    ],
    crearEvento);

// //Actualizar Evento
router.put(
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarcampos
    ],
     actualziarEvento);

// //Borrar Evento
router.delete('/:id', eliminarEvento);

module.exports = router; //exportar lo que hicimos