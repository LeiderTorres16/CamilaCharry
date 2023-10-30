import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrendasService } from 'src/app/Services/prendas_Service';
import { Prenda } from 'src/app/Models/prenda_class';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { Cloudinary } from '@cloudinary/url-gen';
import { ImageUploaderService } from 'src/app/Services/image_service';

@Component({
  selector: 'app-registro-prenda',
  templateUrl: './registro-prenda.component.html',
  styleUrls: ['./registro-prenda.component.css'],
})
export class RegistroPrendaComponent {
  prenda: FormGroup;
  prendas: Prenda[];
  imagen: File | null;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  categorias: string[] = ['Hombre'];
  colores: string[] = [];
  imagenPreview: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private prendasService: PrendasService,
    private imageService: ImageUploaderService
  ) {
    this.prenda = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required],
      colores: [''],
      imagenprenda: [''],
      existencias: [1, [Validators.required, Validators.min(1)]],
    });
  }
  showAlert: boolean = false;
  imagenUrl: string = '';

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.categorias.push(value);
    }

    event.chipInput!.clear();
  }

  remove(categoria: string): void {
    const index = this.categorias.indexOf(categoria);

    if (index >= 0) {
      this.categorias.splice(index, 1);

      this.announcer.announce(`Eliminado ${categoria}`);
    }
  }
  edit(categoria: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(categoria);
      return;
    }
    const index = this.categorias.indexOf(categoria);
    if (index >= 0) {
      this.categorias[index] = value;
    }
  }
  addColores(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.colores.push(value);
    }
    event.chipInput!.clear();
  }

  removeColores(color: string): void {
    const index = this.colores.indexOf(color);

    if (index >= 0) {
      this.colores.splice(index, 1);
      this.announcer.announce(`Eliminado ${color}`);
    }
  }
  editColores(color: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(color);
      return;
    }
    const index = this.colores.indexOf(color);
    if (index >= 0) {
      this.colores[index] = value;
    }
  }

  async submitForm() {
    // const response = await this.imageService.uploadImage(this.imagen!);
    const response = await this.prendasService.addImage(this.imagen);
    if (response != 'error') {
      // try {
      //   const cloudinaryObject = JSON.parse(response);
      //   const secureUrl = cloudinaryObject.secure_url;
      //   console.log(secureUrl); // Imprime la URL segura
      // } catch (error) {
      //   console.error("Error al analizar el JSON:", error);
      // }
      this.imagenUrl = response;
      if (this.prenda.valid && this.imagen) {
        const nuevaPrenda = new Prenda(
          this.prenda.value.id,
          this.prenda.value.nombre,
          this.prenda.value.precio,
          this.prenda.value.descripcion,
          this.colores,
          this.categorias,
          this.imagenUrl,
          'activo',
          this.prenda.value.existencias
        );
        const response: string = await this.prendasService.addPrenda(
          nuevaPrenda
        );
        console.log(response);
        if (response == 'Prenda registrada con exito') {
          Swal.fire({
            text: response,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: response,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#CAA565',
          });
        }

        this.prenda.reset();
        this.imagen = null;
        this.imagenUrl = '';
        this.colores = [];
        this.categorias = [];
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Formulario no válido. Por favor, verifica los campos y asegúrate de seleccionar una imagen.',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#CAA565',
        });
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Formulario no válido. Por favor, verifica los campos y asegúrate de seleccionar una imagen.',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#CAA565',
      });
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
      const maxWidth = 370;
      const maxHeight = 370;
  
      if (file.size <= maxSize) {
        this.imagen = file;
        this.showAlert = false;
  
        // Redimensionar la imagen
        this.resizeImage(file, maxWidth, maxHeight).then((resizedImage) => {
          this.imagenPreview = resizedImage;
  
          // Resto de la lógica de la función onFileSelected
        });
      } else {
        const mensaje = 'La imagen seleccionada es demasiado grande o excede las dimensiones permitidas.';
        Swal.fire({
          title: 'Error!',
          text: mensaje,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#CAA565',
        });
        this.imagen = null;
        input.value = '';
        this.showAlert = true;
      }
    }
  }
  

  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise<string>((resolve) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
  
      image.onload = () => {
        const canvas = document.createElement('canvas');
        if (!canvas) {
          console.error('No se pudo crear el canvas.');
          return;
        }
        
        const context = canvas.getContext('2d');
        if (!context) {
          console.error('No se pudo obtener el contexto del canvas.');
          return;
        }
  
        let width = image.width;
        let height = image.height;
  
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height *= maxWidth / width;
            width = maxWidth;
          } else {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
        context.drawImage(image, 0, 0, width, height);
  
        const resizedImage = canvas.toDataURL('image/jpeg');
        resolve(resizedImage);
      };
    });
  }
  
  

  ngOnInit(): void {
    const cld = new Cloudinary({ cloud: { cloudName: 'prendas' } });
  }
}
