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
class Reservas {
    constructor(){
        this.reserva = [];
    }

    agregarReserva(reserva){
        this.reserva = [...this.reserva, reserva]
        console.log(this.reserva)
    }
}

class UI {
    imprimirAlerta(mensaje, tipo){
        //formateo de alerta
        const divMensaje = document.createElement('div');

        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //tipos
        if (tipo ==='error') {
            divMensaje.classList.add('alert-danger');

        }else{
            divMensaje.classList.add('alert-success');
        }

        //añadir mensaje
        divMensaje.textContent = mensaje;

        //agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-reserva'));

        //quitar alerta
        setTimeout(() =>{
            divMensaje.remove();
        }, 5000);
    }

    imprimirReservas({ reserva }){ //desestructuracion para acceder al arreglo
        
        reserva.forEach( reserv => {
            const { nombre, cantidad, telefono, fecha, hora, id } = reserv;

            const divRes = document.createElement('div');
            divRes.classList.add('reserva', 'p-3');
            divRes.dataset.id = id;

            //
            const nombreP = document.createElement('h2');
            nombreP.classList.add('card-title', 'font-weight-bolder');
            nombreP.textContent = nombre;

            //agregar al html
            divRes.appendChild(nombreP)
            contieneReservas.appendChild(divRes);
        })

    }
}

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
