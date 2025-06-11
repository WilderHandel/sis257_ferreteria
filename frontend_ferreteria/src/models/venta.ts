import type { Cliente } from "./cliente";
//import type { Usuario } from "./usuario";

export interface Venta{
    id: number;
    idCliente: number;
    idUsuario: number;
    fecha: Date | string;
    transaccion: number;
    cantidad: number;
    cliente: Cliente;
    //usuario: Usuario;
}