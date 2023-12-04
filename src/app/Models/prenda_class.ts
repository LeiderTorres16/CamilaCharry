export class Prenda {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  colores: string[];
  imagen: string[];
  categorias: string[];
  personalizacion: string[];
  estado: string;
  existencias: number;
  tallas: string[];

  constructor(
    id: string,
    nombre: string,
    precio: number,
    descripcion: string,
    colores: string[],
    categorias: string[],
    imagen: string[],
    estado: string,
    existencias: number,
    personalizacion: string[],
    tallas: string[]
  ) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.colores = colores;
    this.imagen = imagen;
    this.categorias = categorias;
    this.estado = estado;
    this.existencias = existencias;
    this.personalizacion = personalizacion;
    this.tallas = tallas;
  }
}
