/*
    rutas de usuarios /auth
    host +/api/auth

*/

const {Router} = require('express');
const { check } = require('express-validator');

const router=Router();

const {crearUsuario, loginUsuario, revalidarToken} =require('../controllers/auth'); //improtamos la funcion de crearUsuario
const { validarcampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post(
    '/new',
    [ //middlewares //se ejecut antes que otra cosa
        check('name', 'El nombre es obligatorio').not().isEmpty(), //validaciones
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarcampos

    ],
    crearUsuario, 
    );

router.post(
    '/',
    [ //middlewares //se ejecut antes que otra cosa
        
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarcampos

    ],
    loginUsuario);

router.get('/renew',validarJWT, revalidarToken );

module.exports = router;