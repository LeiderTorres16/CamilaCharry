export class Prenda{
    id:string;
    nombre: string;
    precio: number;
    descripcion: string;
    colores: string [];
    imagen:string;
    personalizacion:string [];

    constructor(
        id: string,

        nombre: string,
        precio: number,
        descripcion: string,
        colores: string[],
        imagen: string
      ) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.colores = colores;
        this.imagen = imagen;
      }
}