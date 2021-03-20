/*
    rutas de usuarios /auth
    host +/api/auth

*/

const {Router} = require('express');
const router=Router();

const {crearUsuario, loginUsuario, revalidarToken} =require('../controllers/auth') //improtamos la funcion de crearUsuario


router.post('/new',crearUsuario );

router.post('/', loginUsuario);

router.get('/renew',revalidarToken );

module.exports = router;