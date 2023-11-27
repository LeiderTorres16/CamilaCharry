import { Prenda } from './prenda_class';

export class PrendaCarrito {
  producto: Prenda;
  cantidad: number;
  color: string;
  talla: string;
  totalProducto: number;

  constructor(
    producto: Prenda,
    cantidad: number,
    color: string,
    talla: string,
    totalProducto: number
  ) {
    this.producto = producto;
    this.cantidad = cantidad;
    this.color = color;
    this.talla = talla;
    this.totalProducto = totalProducto;
  }
}
