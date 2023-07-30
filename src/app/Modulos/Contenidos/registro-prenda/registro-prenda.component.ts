import { Component } from '@angular/core';

@Component({
  selector: 'app-registro-prenda',
  templateUrl: './registro-prenda.component.html',
  styleUrls: ['./registro-prenda.component.css']
})
export class RegistroPrendaComponent {
  prenda: any = {};
  constructor() {
        // Datos de ejemplo para la prenda
        this.prenda.nombre = 'Camiseta de Manga Corta';
        this.prenda.precio = 29.99;
        this.prenda.descripcion = 'Una cómoda camiseta de manga corta para uso diario.';
        this.prenda.colores = 'Rojo, Azul, Verde';
  }

  submitForm() {
    // Aquí puedes enviar los datos del formulario a tu servidor o realizar la lógica que necesites
    console.log('Datos de la prenda registrados:', this.prenda);
  }

  onFileSelected(event: any) {
    // Aquí puedes manejar la lógica para obtener la imagen seleccionada y procesarla si es necesario
    console.log(event.target.files[0]);
  }
}

