export class Banner {
  id: string;
  titulo: string;
  texto: string;
  imagen: string;

  constructor(id: string, titulo: string, texto: string, imagen: string) {
    this.id = id;
    this.titulo = titulo;
    this.texto = texto;
    this.imagen = imagen;
  }
}
