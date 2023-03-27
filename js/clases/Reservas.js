export default class Reservas {
    constructor(){
        this.reserva = [];
    }

    agregarReserva(reserva){
        this.reserva = [...this.reserva, reserva]
        console.log(this.reserva)
    }

    eliminarReserva(id){
        //filter elimina un elemento segun una condicion
        this.reserva=this.reserva.filter(
            reserva => reserva.id !== id
        );
    }

    editarReserva(reservaActualizada){
        //map nos crea un nuevo arreglo
        //se busca la igualdad, en caso de cumplir se reescribe todo el objeto
        this.reserva = this.reserva.map( 
            reserva => reserva.id === reservaActualizada.id ? reservaActualizada : reserva
         )
    }
}