//Declaracion de constantes
///campos form
const nombreInput = document.querySelector('#nombre');
const cantidadInput = document.querySelector('#cantidad');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
///secciones
const formulario = document.querySelector('#nueva-reserva');
const contieneReservas = document.querySelector('#reservas');

//Funciones

function eventListeners() {
    nombreInput.addEventListener('change',datosReserva);
    cantidadInput.addEventListener('change',datosReserva);
    telefonoInput.addEventListener('change',datosReserva);
    fechaInput.addEventListener('change',datosReserva);
    horaInput.addEventListener('change',datosReserva);
}

const reservaObj = {
    nombre: '',
    cantidad: '',
    telefono: '',
    fecha: '',
    hora: ''
}

function datosReserva(e) {
    //guardar texto en objeto
    reservaObj[e.target.name] = e.target.name;
}

//
eventListeners();