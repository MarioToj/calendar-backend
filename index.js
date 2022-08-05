const express = require( 'express' )
require( 'dotenv' ).config()
const cors = require( 'cors' )
const { dbConection } = require( './database/config' )


console.log(process.env);


//Crear el servidor de express

const app = express()

// Base de datos
dbConection()

//Cors

//Diresctorio publico

app.use( express.static( 'public' ) )

//Lectura del parseo del body
app.use( express.json() )

//Rutas
app.use( '/api/auth', require( './routes/auth' ) )
app.use( '/api/events', require( './routes/events' ) )

app.listen( process.env.PORT, ()  => {
    console.log( `Servidor corriendo en puerto ${ process.env.PORT }` );
} )

