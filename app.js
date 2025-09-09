/*
 * JUEGO: ADIVINA EL DÍA DE LA SEMANA
 * 
 * Objetivo: El usuario debe adivinar un día de la semana aleatorio usando su voz
 * 
 * Paso a paso:
 * 1. Crear lista de días de la semana
 * 2. Seleccionar un día aleatorio
 * 3. Configurar el reconocimiento de voz
 * 4. Escuchar lo que dice el usuario
 * 5. Comparar la respuesta con el día aleatorio
 * 6. Mostrar mensaje de éxito o error
 * 7. Permitir volver a jugar
 */

//ELEMENTOS DEL DOM

const mensajeEnPantalla = document.getElementById('message');

//LISTA DE DIAS DE LA SEMANA
const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

let diaSecreto = '';

//SELECCIONAR UN DIA ALEATORIO
function elegirDiaAleatorio(){
    const indiceAleatorio = Math.floor(Math.random() * diasSemana.length);
    diaSecreto = diasSemana[indiceAleatorio];
    console.log('Dia Secreto: ' + diaSecreto);
}

//CONFIGURAR EL RECONOCIMIENTO DE VOZ

function iniciarReconocimientoVoz(){
    //compatibilidad con diferentes navegador
    const ReconocimientoVoz = window.SpeechRecognition || window.webkitSpeechRecognition;
    const reconocimiento = new ReconocimientoVoz();
    
    reconocimiento.lang = 'es-ES'; //espanol
            reconocimiento.continuous = false;

    //cuando se detecta voz
    reconocimiento.onresult = function(evento){
        const respuestaUsuario = evento.results[0][0].transcript.toLowerCase().trim().replace('.', '');
        console.log(respuestaUsuario);

        //obtener lo que dijo el usuario
        mostrarRespuesta(respuestaUsuario);
        verificarRespuesta(respuestaUsuario);
    };

    reconocimiento.onend = function(){
        reconocimiento.start();
    }

    reconocimiento.start();

    return reconocimiento;
}

//MOSTRAR LO QUE DIJO EL USUARIO

function mostrarRespuesta(texto){
    mensajeEnPantalla.innerHTML = `<div>Dijiste: <span>${texto}</span></div>`
}

//VERIFICAR SI LA RESPUESTA ES CORRECTA
function verificarRespuesta(respuesta){
    if(respuesta === diaSecreto){
        mostrarmeMensajeExito();
        setTimeout(reiniciarJuego, 3000)
    } else {
        mostrarMensajeError();
    }
}

//mensaje de exito
function mostrarmeMensajeExito(){
    Swal.fire({
        title: `¡Correcto! ¡El día era ${diaSecreto}!`,
        icon: 'success',
        confirmButtonText: '¡Jugar de nuevo!',
        background: '#fff',
        color: '#716add'
    });
}

//mensaje de error
function mostrarMensajeError(){
    Swal.fire({
        toast: true,
        position: 'bottom',
        icon: 'error',
        title: '¡Incorrecto! ¡Intenta otra vez!',
        showConfirmButton: false,
        timer: 1500
    });
}

//reiniciar el juego
function reiniciarJuego(){
    mensajeEnPantalla.innerHTML = "";
    elegirDiaAleatorio();
    iniciarReconocimientoVoz();
}

//iniciar el juego
elegirDiaAleatorio();
iniciarReconocimientoVoz();





