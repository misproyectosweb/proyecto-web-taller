function mensaje() {

    const formulario = document.querySelector('.frmContacto');

    let nombre = document.getElementById('nombre');
    let correo = document.getElementById('correo');
    let direccion = document.getElementById('direccion');
    let telcasa = document.getElementById('telcasa');
    let telcelular = document.getElementById('telcelular');
    let marca = document.getElementById('marca');
    let modelo = document.getElementById('modelo');
    let anio = document.getElementById('anio');
    let cita = document.getElementById('cita');
    let servicio = document.getElementsByName('servicio');
    let comentario = document.getElementById('comentario');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
    
    //   console.log('botón enviar presionado');

        let datos = {
            nombre: nombre.value,
            correo: correo.value,
            direccion: direccion.value,
            telcasa: telcasa.value,
            telcelular: telcelular.value,
            marca: marca.value,
            modelo: modelo.value,
            anio: anio.value,
            cita: cita.value,
            servicio: servicio.value,
            comentario: comentario.value
        };
        
    //    console.log(datos);

        // Los datos obtenidos serán procesados y enviados vía email a la dirección especificada. Por
        // lo tanto, se debe utilizar ajax para enviarlos
        // Se crea una nueva instancia de una solicitud ajax
        let xhr = new XMLHttpRequest();
        
        // Se abre la solicitud
        xhr.open('POST', '/');
        
        // Configuramos el encabezado de tipo de contenido y los datos del objeto serán enviados en formato json
        xhr.setRequestHeader('content-type', 'application/json');
        
    //    xhr.responseType = 'text';
                
        // Esta función se activará cuando se reciba una respuesta. Se ejecutará una función que
        // registrará la respuesta recibida desde el servidor y si es exitosa, entonces se mostrará un
        // mensaje de aceptación y se limpiarán los campos del formulario
        xhr.onload = function(){                
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200) {
                    console.log(xhr.readyState);
                    console.log(xhr.status);
                    console.log(xhr.responseText);                                
                }
                
                nombre.value = '';
                correo.value = '',
                direccion.value = '',
                telcasa.value = '';
                telcelular.value = '';
                marca.value = '',
                modelo.value = '',
                anio.value = '',
                cita.value = '',
                servicio.value = '',
                comentario.value = ''                                                                                                     
            }        
            if(!xhr.responseText === 'OK') {
                Swal.fire({
                    icon: 'error',
                    imageUrl: 'imagenes/logotallercorreo.png',        
                    imageAlt: 'Logo del taller',
                    title: 'Estado del mensaje de correo',
                    text: 'Su mensaje no ha sido enviado'
                });
            }
            else {
                Swal.fire({
                    icon: 'success',
                    imageUrl: 'imagenes/logotallercorreo.png',        
                    imageAlt: 'Logo del taller',
                    title: 'Estado del mensaje de correo',
                    text: 'Su mensaje se envió correctamente'
                });
            }  
        };
        
        // Enviamos el objeto datos 
        xhr.send(JSON.stringify(datos));
    });
}