import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';
import { mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-registro-prenda',
  templateUrl: './registro-prenda.component.html',
  styleUrls: ['./registro-prenda.component.css'],
})
export class RegistroPrendaComponent implements OnInit, OnDestroy {
  prenda: FormGroup;
  prendas: Prenda[];
  imagen: File | null;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  categorias: string[] = ['Hombre'];
  colores: string[] = [];

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
    });
  }
  destroy$ = new Subject();
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
    this.imageService
      .uploadImage(this.imagen!)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (url) => {
          console.log(url);
          this.imagenUrl = url;
          if (this.prenda.valid && this.imagen) {
            const nuevaPrenda = new Prenda(
              this.prenda.value.id,
              this.prenda.value.nombre,
              this.prenda.value.precio,
              this.prenda.value.descripcion,
              this.colores,
              this.categorias,
              this.imagenUrl,
              'activo'
            );
            const response: string = this.prendasService.addPrenda(nuevaPrenda);
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
        },
        (error) => {
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: 'Formulario no válido. Por favor, verifica los campos y asegúrate de seleccionar una imagen.',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#CAA565',
          });
        }
      );

    // const response = await this.prendasService.addImage(this.imagen);
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
      const minWidth = 370;
      const minHeight = 370;

      const image = new Image();
      image.src = URL.createObjectURL(file);

      image.onload = async () => {
        // if (file.size <= maxSize && image.width <= maxWidth && image.height <= maxHeight && image.width >= minWidth && image.height >= minHeight) {
        if (file.size > 0) {
          this.imagen = file;
          this.showAlert = false;
        } else {
          const mensaje =
            'La imagen seleccionada es demasiado grande o excede las dimensiones permitidas.';
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
      };
    }
  }

  ngOnInit(): void {
    const cld = new Cloudinary({ cloud: { cloudName: 'prendas' } });

    this.prendasService.getPrendas().subscribe((prendas) => {
      console.log(prendas);
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next;
    this.destroy$.complete();
  }
}
