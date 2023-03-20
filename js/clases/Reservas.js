export default class Reservas {
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