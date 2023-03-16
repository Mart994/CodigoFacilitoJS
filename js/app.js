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

    eliminarReserva(id){
        this.reserva=this.reserva.filter(
            reserva => reserva.id !== id
        );
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
        
        this.limpiarHTML();

        reserva.forEach( reserv => {
            const { nombre, cantidad, telefono, fecha, hora, id } = reserv;

            const divRes = document.createElement('div');
            divRes.classList.add('reserva', 'p-3');
            divRes.dataset.id = id;

            //Formateo de los datos
            const nombreP = document.createElement('h2');
            nombreP.classList.add('card-title', 'font-weight-bolder');
            nombreP.textContent = nombre;

            const cantidadP = document.createElement('p');
            cantidadP.innerHTML=`
                <span class="font-weight-bolder">Comensales: </span>${cantidad}
            `;

            const telefonoP = document.createElement('p');
            telefonoP.innerHTML=`
                <span class="font-weight-bolder">Teléfono: </span>${telefono}
            `;

            const fechaP = document.createElement('p');
            fechaP.innerHTML=`
                <span class="font-weight-bolder">Fecha: </span>${fecha}
            `;
            const horaP = document.createElement('p');
            horaP.innerHTML=`
                <span class="font-weight-bolder">Hora: </span>${hora}
            `;


            //Botones
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path clip-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" fill-rule="evenodd"></path></svg>';

            //accion del boton
            ///enviar ID para saber cual elemento borrar
            btnEliminar.onclick = () => eliminarReserva(id)

            //agregar al html
            divRes.appendChild(nombreP);
            divRes.appendChild(cantidadP);
            divRes.appendChild(telefonoP);
            divRes.appendChild(fechaP);
            divRes.appendChild(horaP);
            divRes.appendChild(btnEliminar);
            contieneReservas.appendChild(divRes);
        })

    }

    limpiarHTML(){
        while (contieneReservas.firstChild) {
            contieneReservas.removeChild(contieneReservas.firstChild)
        }
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


function eliminarReserva(id) {
    //eliminar
    adReserva.eliminarReserva(id);

    //Mensaje confirmacion
    ui.imprimirAlerta('Reserva eliminada correctamente', 'exito');

    //refrescar (volver a pasar objetos)
    ui.imprimirReservas(adReserva)

}