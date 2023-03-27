const contieneReservas = document.querySelector('#reservas');

import { eliminarReserva, cargarEdicion } from "../Funciones/funciones.js";

export default class UI {
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

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" stroke-linecap="round" stroke-linejoin="round"></path> </svg>';

            //accion del boton
            ///enviar ID para saber sobre cual elemento actuar
            btnEliminar.onclick = () => eliminarReserva(id);
            btnEditar.onclick = () => cargarEdicion(reserv);

            //agregar al html
            divRes.appendChild(nombreP);
            divRes.appendChild(cantidadP);
            divRes.appendChild(telefonoP);
            divRes.appendChild(fechaP);
            divRes.appendChild(horaP);
            divRes.appendChild(btnEliminar);
            divRes.appendChild(btnEditar);
            contieneReservas.appendChild(divRes);
        })

    }

    limpiarHTML(){
        while (contieneReservas.firstChild) {
            contieneReservas.removeChild(contieneReservas.firstChild)
        }
    }
}

