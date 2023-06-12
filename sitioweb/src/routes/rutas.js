// Estableciendo las rutas de las páginas que componen el sitio web
// Se requiere llamar Express para poder utilizar el módulo de gestión de rutas
const express = require('express');

// Se requiere este módulo para gestionar múltiples rutas y mantenerlas en archivos separados
const rutas = express.Router();

// Utilizamos la librería nodemailer para configurar la cuenta de correo asignada
const nodemailer = require('nodemailer');

// Incluye soporte para autorización y autenticación con OAuth 2.0, API Keys y tokens JWT
const { google } = require('googleapis');

// // Llamamos a la librería para configurar el mensaje de alerta
// const Swal = require('sweetalert2');

// ************************************************************************************************
// Se colocan las rutas de acceso a las distintas páginas que conforman el sitio web
// Esta ruta nos redirige a la página de "Inicio"
rutas.get('/', (solicitud, respuesta) => {
    respuesta.render('inicio', { titulo: 'Inicio'});
});

// Esta ruta nos redirige a la página de "Quienes somos"
rutas.get('/nosotros', (solicitud, respuesta) => {
    respuesta.render('nosotros', { titulo: 'Quienes somos'});
});

// Esta ruta nos redirige a la página de "Servicios"
rutas.get('/servicios', (solicitud, respuesta) => {
    respuesta.render('servicios', { titulo: 'Nuestros servicios'});
});

// Esta ruta nos redirige a la página de "Noticias"
rutas.get('/noticias', (solicitud, respuesta) => {
    respuesta.render('noticias', { titulo: 'Noticias'});
});

// Esta ruta nos redirige a la página de "Contacto"
rutas.get('/contacto', (solicitud, respuesta) => {
    respuesta.render('contacto', { titulo: 'Contacto'});
});

// ************************************************************************************************
// Creamos una ruta que reciba los datos del formulario
// Se utiliza el método post para enviar los datos a la cuenta de correo asignada
rutas.post('/enviarCorreo', (solicitud, respuesta) => {
    console.log(solicitud.body);

    // Obtenemos los datos almacenados para crear la estructura HTML del correo e incorporarlos
    const {nombre, correo, direccion, telcasa, telcelular, marca, modelo, anio, fecha_cita, hora_cita, servicio, comentario} = solicitud.body;

    // Creamos la estructura con los elementos HTML para formar el cuerpo del correo
    const salida = `
        <div><img src="cid:logotallercorreo@nodemailer.com" style="margin-top:2rem"/></div>
        <h3>Coméntanos acerca de tu solicitud para con tu vehículo</h3>
        <h4>Datos del cliente:</h4>
        <ul style="padding:0">
            <li>Nombre: ${solicitud.body.nombre}</li>
            <li>Correo: ${solicitud.body.correo}</li>
            <li>Direción: ${solicitud.body.direccion}</li>
            <li>Teléfono casa: ${solicitud.body.telcasa}</li>
            <li>Teléfono celular: ${solicitud.body.telcelular}</li>
            <li>Marca vehículo: ${solicitud.body.marca}</li>
            <li>Modelo vehículo: ${solicitud.body.modelo}</li>
            <li>Año vehículo: ${solicitud.body.anio}</li>
            <li>Fecha cita: ${solicitud.body.fecha_cita}</li>
            <li>Hora cita: ${solicitud.body.hora_cita}</li>
            <li>Tipo de servicio: ${solicitud.body.servicio}</li>            
        </ul>
        <h4>Descripción de la solicitud del servicio:</h4>
        <p>${solicitud.body.comentario}</p>
    `;

    // Creamos unas constantes las cuales almacenarán los tokens de acceso
    const CLIENT_ID = "322535734378-6nsifenvamma3ndkfc1pm1g0iaqemnrv.apps.googleusercontent.com";
    const CLIENT_SECRET = "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";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN = "1//04RMS4H4o1uhtCgYIARAAGAQSNwF-L9Ir0_Dik-0tKM5XcEasikT8bal4ITa9lyAhTpKaMf5Ff7qBqnCFAPFp5yjXRzMW-kTk9Vc";
    
    // Creamos una instancia de la API de Google
    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID, 
        CLIENT_SECRET, 
        REDIRECT_URI
    );

    // Establecemos las credenciales. Recibe como parámetro un objeto, el cual contiene el token actualizado
    // cada vez que expire el actual
    oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

    // Configuramos la librería NodeMailer
    async function enviarEmail() {
        try {
            const accessToken = await oAuth2Client.getAccessToken()

            const transporte = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: "pruebasproyectosweb000@gmail.com",
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                },
            });

            // Enviamos el correo con el objeto transporte definido
            const infoCorreo = {
                from: '"Nueva solicitud" <pruebasproyectosweb000@gmail.com>', // dirección remitente
                to: "pruebasproyectosweb000@gmail.com",                       // lista de destinatarios
                subject: "Nuevo mensaje desde nuestra página web",            // asunto del correo      
                html: salida,                                                 // cuerpo del mensaje en formato HTML
                attachments: [{
                    filename: 'logotallercorreo.png',
                    path: './src/public/imagenes/logotallercorreo.png',
                    cid: 'logotallercorreo@nodemailer.com'                      
                }]
            };            

            const resultado = await transporte.sendMail(infoCorreo);

            return resultado;
        }
        catch (err) {
            console.log(err);
        }
    }
        
    // Se ejecuta la función y se maneja por medio de promesas
    enviarEmail()    
        .then((resultado) => respuesta.status(200).send('El mensaje de correo fue enviado con éxito'))
        
        .catch((error) => console.log(error.message));
});


// Exportamos las rutas
module.exports = rutas;