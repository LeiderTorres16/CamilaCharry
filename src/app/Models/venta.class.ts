import { Prenda } from "./prenda_class";
import { User } from "./user_class";

export class Venta {
    referencia: string;
    prendas: Prenda[];
    total: number;
    cliente: User;
    fecha: string;

    constructor(
        referencia: string,
        prendas: Prenda[],
        total: number,
        cliente: User,
        fecha: string

      ) {
        this.referencia = referencia;
        this.prendas = prendas;
        this.total = total;
        this.cliente = cliente;
        this.fecha = fecha;
      }
}