import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrendasService } from 'src/app/Services/prendas_Service';

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


 async submitForm() {
    if (this.prenda.valid && this.imagen) {
    const response  = await this.prendasService.addPrenda(this.prenda.value);
     console.log(response);

      console.log(this.prenda.value);
      console.log('Imagen seleccionada:', this.imagen);
    } else {
      console.error('Formulario no válido. Por favor, verifica los campos y asegúrate de seleccionar una imagen.');
    }
  }
  getImagenURL(): any {
    return this.imagen ? URL.createObjectURL(this.imagen) : null;
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const maxSize = 1024 * 1024;
      const maxWidth = 800;
      const maxHeight = 600;

      const image = new Image();
      image.src = URL.createObjectURL(file);

      image.onload = () => {
        if (file.size <= maxSize && image.width <= maxWidth && image.height <= maxHeight) {
          this.imagen = file;
        } else {

          const mensaje = 'La imagen seleccionada es demasiado grande o excede las dimensiones permitidas.';
          Swal.fire({
            title: 'Error!',
            text: mensaje,
            icon: 'error',
            confirmButtonText: 'Cool'
          });
          this.imagen = null;
          input.value = '';
        }
      };
    }
  }
  

}
