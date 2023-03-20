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

//Clases
import Reservas from "./clases/Reservas.js";
import UI from "./clases/UI.js";

const ui = new UI();
const adReserva = new Reservas();


eventListeners();
//Funciones

function eventListeners() {
    nombreInput.addEventListener('change',datosReserva);
    cantidadInput.addEventListener('change',datosReserva);
    telefonoInput.addEventListener('change',datosReserva);
    fechaInput.addEventListener('change',datosReserva);
    horaInput.addEventListener('change',datosReserva);
    
    formulario.addEventListener('submit', nuevaReserva);
}

//Objeto con los datos de la reserva
const reservaObj = {
    nombre: '',
    cantidad: '',
    telefono: '',
    fecha: '',
    hora: ''
}

function datosReserva(e) {
    //guardar texto en objeto
    reservaObj[e.target.name] = e.target.value;
    //console.log(reservaObj)
}

//Validar y Agregar nueca reserva
function nuevaReserva(e) {
    e.preventDefault();
    
    //extraer datos
    const { nombre, cantidad, telefono, fecha, hora } = reservaObj;

    if (nombre ==='' || cantidad ==='' || telefono ==='' || fecha ==='' || hora ==='' ) {
        //console.log('Todos los campos son obligatorios', 'error');
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    //generar ID unico para cada reserva
    reservaObj.id = Date.now();

    //crear reserva
    adReserva.agregarReserva({...reservaObj});
    reiniciarObj();

    formulario.reset();

    ui.imprimirReservas(adReserva);
}

//reiniciar objeto
function reiniciarObj() {
    reservaObj.nombre= '';
    reservaObj.cantidad= '';
    reservaObj.telefono= '';
    reservaObj.fecha= '';
    reservaObj.hora= '';
}


function eliminarReserva(id) {
    //eliminar
    adReserva.eliminarReserva(id);

    //Mensaje confirmacion
    ui.imprimirAlerta('Reserva eliminada correctamente', 'exito');

    //refrescar (volver a pasar objetos)
    ui.imprimirReservas(adReserva)

}