export class User{
    id:number;
    nombre: string;
    apellido: number;
    direccion: string;
    ciudad:string;
    correo: string;
    contraseña:string;
    rol:string = "estandar";

    constructor(
        id:number,
        nombre: string,
        apellido: number,
        direccion: string,
        correo: string,
        ciudad: string,
        contraseña:string,
        rol:string

      ) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.correo = correo;
        this.contraseña = contraseña;
        this.ciudad = ciudad;
        this.rol = rol;
      }
}