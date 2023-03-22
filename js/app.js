import { datosReserva, nuevaReserva, crearDB } from "./Funciones/funciones.js";
import { nombreInput, cantidadInput, telefonoInput, fechaInput, horaInput, formulario } from "./Funciones/selectores.js";


window.onload = () => {
    eventListeners();

    crearDB();
}


function eventListeners() {
    nombreInput.addEventListener('change',datosReserva);
    cantidadInput.addEventListener('change',datosReserva);
    telefonoInput.addEventListener('change',datosReserva);
    fechaInput.addEventListener('change',datosReserva);
    horaInput.addEventListener('change',datosReserva);
    
    formulario.addEventListener('submit', nuevaReserva);

}