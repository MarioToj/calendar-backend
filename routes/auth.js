/*
    Rutas de usuarios / Auth
    Host + /api/auth
*/


const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const { validarCampos } = require('../middlewares/validar-campos')

const { crearUsusario, loginUsusario, revalidarToken } = require( '../controllers/auth' )
const { validarJWT } = require( '../middlewares/validar-jwt' )

router.post( '/new',[
    //MiddleWare
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'password', 'la contraseña debe tener mas de 6 digitos' ).isLength({min: 6}),
    validarCampos
], crearUsusario )

router.post( '/', [
    //MiddleWare
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'password', 'la contraseña debe tener mas de 6 digitos' ).isLength({min: 6}),
    validarCampos
], loginUsusario )

router.get( '/renew', validarJWT, revalidarToken )


module.exports = router