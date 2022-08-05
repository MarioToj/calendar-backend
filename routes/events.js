const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const { validarCampos } = require('../middlewares/validar-campos')

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require( '../controllers/events' )
const { validarJWT } = require( '../middlewares/validar-jwt' )
const { isDate } = require('../helpers/isDate')

//Todas las rutas tienen valido el token sin que sea necesario de escribirlo en cada ruta
// router.use( validarJWT )

router.get( '/', validarJWT, getEventos )

router.post( '/', 
[ 
    check( 'title', 'El titulo es obligatorio' ).not().isEmpty(),
    check( 'start', 'Fecha de inicio es obligatoria' ).custom( isDate ),
    check( 'end', 'Fecha de finalizacion es obligatoria' ).custom( isDate )
    ,validarCampos
]
, validarJWT, crearEvento )

router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],validarJWT,
    actualizarEvento);

router.delete( '/:id', validarJWT, eliminarEvento )


module.exports = router