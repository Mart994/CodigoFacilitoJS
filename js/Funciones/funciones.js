import { formulario } from "./selectores.js";
//Clases
import Reservas from "../clases/Reservas.js";
import UI from "../clases/UI.js";

const ui = new UI();
const adReserva = new Reservas();

let DB;

//Funciones
ui.imprimirReservas();
//Objeto con los datos de la reserva
const reservaObj = {
    nombre: '',
    cantidad: '',
    telefono: '',
    fecha: '',
    hora: ''
}

export function datosReserva(e) {
    //guardar texto en objeto
    reservaObj[e.target.name] = e.target.value;
    //console.log(reservaObj)
}

//Validar y Agregar nueca reserva
export function nuevaReserva(e) {
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

    //agregar registr a bbdd
    const transaction = DB.transaction(['reservas'], 'readwrite');
    //habilitar el objectstore
    const objectStore = transaction.objectStore('reservas');
    //insertar
    objectStore.add(reservaObj);
    
    transaction.oncomplete = function () {
        console.log('reserva agregada');
        ui.imprimirAlerta('Reserva agregada');
    }

    reiniciarObj();

    formulario.reset();

    ui.imprimirReservas();
}

//reiniciar objeto
function reiniciarObj() {
    reservaObj.nombre= '';
    reservaObj.cantidad= '';
    reservaObj.telefono= '';
    reservaObj.fecha= '';
    reservaObj.hora= '';
}


export function eliminarReserva(id) {
    //eliminar
    adReserva.eliminarReserva(id);

    //Mensaje confirmacion
    ui.imprimirAlerta('Reserva eliminada correctamente', 'exito');

    //refrescar (volver a pasar objetos)
    ui.imprimirReservas()

}

export function crearDB() {
    const dataBase = window.indexedDB.open('reservas', 1);

    //error
    dataBase.onerror = function () {
        console.log('Hubo un error al crear la BBDD');
    }

    //todo bien
    dataBase.onsuccess = ()=>{
        console.log('BBDD creada')
        DB = dataBase.result;
        
    }

    //definir schema
    dataBase.onupgradeneeded = function (e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore('reservas',{
            keyPath: 'id',
            autoIncrement: true
        })

        //Definir columnas
        objectStore.createIndex('nombre', 'nombre', {unique: false});
        objectStore.createIndex('cantidad', 'cantidad', {unique: false});
        objectStore.createIndex('telefono', 'telefono', {unique: false});
        objectStore.createIndex('fecha', 'fecha', {unique: false});
        objectStore.createIndex('hora', 'hora', {unique: false});
        objectStore.createIndex('id', 'id', {unique: true});


    }

}