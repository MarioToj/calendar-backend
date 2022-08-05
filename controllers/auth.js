const express = require( 'express' )
const bcrypt = require('bcryptjs')
const Usuario = require( '../models/Usuario' )
const { generarJWT } = require('../helpers/jwt')

const crearUsusario = async( req, res = express.response ) => {

    const { email, password } = req.body
    try {
        
    let usuario = await Usuario.findOne( {email})

    if (usuario) {
         
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo',
            })
    }

    usuario = new Usuario( req.body )

    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync( password, salt )

    
    await usuario.save()

    //Generar JWT
    const token = await generarJWT( usuario.id, usuario.name )

    res.status(201).json({
        ok: true,
        uid: usuario.id,
        name:usuario.name,
        token
    })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cantacta con el administrador'
        })
    }

    
}  

const loginUsusario = async( req, res = express.response ) => {

    const { email, password } = req.body

   try {
    const usuario = await Usuario.findOne( {email})

    if (!usuario) {
         
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo',
            })
    }

    // Confirmar password

    const valalidPassword = bcrypt.compareSync( password, usuario.password )
    
    if ( !valalidPassword ) {
        return res.status(400).json({
            ok: false,
            msg: 'Password Incorrecto'
        })
    }

    //Generar JWT
    const token = await generarJWT( usuario.id, usuario.name )

    res.json({
        ok: true,
        uid: usuario.id,
        name: usuario.name,
        token
    })
 
   } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
   }
}  

const revalidarToken = async( req, res = express.response ) => {

    const uid = req.uid
    const name = req.name

    const token = await generarJWT( uid, name )

    res.json({
        ok: true,
        token
    })
}  




module.exports = {

    crearUsusario,
    loginUsusario,
    revalidarToken
}

