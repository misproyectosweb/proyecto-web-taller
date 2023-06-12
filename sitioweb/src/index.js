// Se llama al módulo que permite crear el servidor
const express = require('express');

// Se crea el servidor de Node
const app = express();

// Se llama a la librería para trabajar con directorios
const path = require('path');

// Utilizamos la librería nodemailer para configurar la cuenta de correo asignada
const nodemailer = require('nodemailer');

// Incluye soporte para autorización y autenticación con OAuth 2.0, API Keys y tokens JWT
const { google } = require('googleapis');

// ********************************************************************************************************************
// Sección de configuración
// Se definen el puerto donde se desplegará la página web, las rutas de las distintas páginas que conforman
// el sitio web y el motor de plantillas

// Puerto del sitio web
app.set('puerto', process.env.PORT || 3000);

// Se indica el motor de plantilla de vistas que se va a utilizar en la aplicación o sitio web
app.set('views', path.join(__dirname, 'views'));

// Se indica el motor de plantilla de vistas que se va a utilizar en la aplicación o sitio web
app.set('view engine', 'ejs');

// ********************************************************************************************************************
// Sección de middlewares
// Métodos/funciones/operaciones que se llaman entre el procesamiento de la Solicitud y el envío de la respuesta en su 
// método de aplicación.

// Método incorporado en express para reconocer el objeto de solicitud entrante como cadenas o matrices.
app.use(express.urlencoded({extends:false}));

// Los siguientes métodos se necesitan para las solicitudes POST y PUT, porque en ambas solicitudes está enviando datos
// Método incorporado en express para reconocer el objeto de solicitud entrante como un objeto JSON.
app.use(express.json());

// ********************************************************************************************************************
// Sección de rutas
// Para utilizar la ruta que se ha exportado desde el archivo rutas.js
app.use(require('./routes/rutas'));

// ********************************************************************************************************************
// Sección de static files: se listan las fuentes, imágenes, iconos, archivos .css, archivos .js y múltiples archivos
// que se van a utilizar para mejorar la interfaz o front-end de la aplicación o sitio web
app.use(express.static(path.join(__dirname, 'public')));

// ********************************************************************************************************************
// Puerto donde se ejecuta la aplicación
app.listen(app.get('puerto'), () => {
    console.log('El servidor se está inicializando en el puerto', app.get('puerto'));
})