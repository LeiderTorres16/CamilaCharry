import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrendasService } from 'src/app/Services/prendas_Service';
import { Prenda } from 'src/app/Models/prenda_class';

@Component({
  selector: 'app-registro-prenda',
  templateUrl: './registro-prenda.component.html',
  styleUrls: ['./registro-prenda.component.css']
})

export class RegistroPrendaComponent {
  prenda: FormGroup;
  imagen: File | null = null;
  constructor(private formBuilder: FormBuilder, private prendasService: PrendasService) {
    this.prenda = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required],
      colores: ['', Validators.required],
      imagenprenda: ['']
    });
  }
  showAlert: boolean = false;
  imagenUrl: string = '';


 async submitForm() {
    if (this.prenda.valid && this.imagen) {
      const nuevaPrenda = new Prenda(
        'try',
        this.prenda.value.nombre,
        this.prenda.value.precio,
        this.prenda.value.descripcion,
        this.prenda.value.colores.split(',').map((color: string) => color.trim()), 
        this.imagenUrl
      );
    const response  = await this.prendasService.addPrenda(nuevaPrenda);
     console.log(response);

  submitForm() {
    // Aquí puedes enviar los datos del formulario a tu servidor o realizar la lógica que necesites
    console.log('Datos de la prenda registrados:', this.prenda);
  }

  onFileSelected(event: any) {
    // Aquí puedes manejar la lógica para obtener la imagen seleccionada y procesarla si es necesario
    console.log(event.target.files[0]);
  }
}

