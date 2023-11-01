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
import { ActivatedRoute, Router } from '@angular/router';

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
  imagenes: File[] = [];
  imagenesNuevas: string[] = [];
  imagenesAntiguas: string[] = [];
  isEditMode = false;
  imagenesPreview: string[] = [];

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  categorias: string[] = ['Hombre'];
  colores: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private prendasService: PrendasService,
    private imageService: ImageUploaderService,
    private route: ActivatedRoute,
    private router: Router
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
    if (this.isEditMode) {
      if (this.prenda.valid && this.imagenesAntiguas.length > 0) {
        this.showAlert = false;
        const urlsNuevas: string[] = [];

        for (let i = 0; i < this.imagenes.length; i++) {
          const response = await this.prendasService.addImage(this.imagenes[i]);
          if (response != 'error') {
            this.imagenUrl = response;
            urlsNuevas.push(response);
          }
        }

        this.updatePrenda(urlsNuevas,this.imagenesAntiguas);
      }else{
        Swal.fire({
          title: 'Error!',
          text: 'Formulario no válido. Por favor, verifica los campos y asegúrate tener al menos una imagen registrada de la prenda',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#CAA565',
        });
      }
    } else {
      if (this.prenda.valid && this.imagenes.length > 0) {
        const urls: string[] = [];

        for (let i = 0; i < this.imagenes.length; i++) {
          const response = await this.prendasService.addImage(this.imagenes[i]);
          if (response != 'error') {
            this.imagenUrl = response;
            urls.push(response);
          }
        }

        this.createPrenda(urls);
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Formulario no válido. Por favor, verifica los campos y asegúrate de seleccionar al menos una imagen.',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#CAA565',
        });
      }
    }
  }

  updatePrenda(imageUrlsNuevas: string[], imageUrlsViejas: string[]) {
    const prendaId = this.prenda.value.id;

    imageUrlsNuevas.forEach(img => {
      imageUrlsViejas.push(img);
    });

    const newPrenda = new Prenda(
      prendaId,
      this.prenda.value.nombre,
      this.prenda.value.precio,
      this.prenda.value.descripcion,
      this.colores,
      this.categorias,
      imageUrlsViejas,
      'activo',
      this.prenda.value.existencias
    );

    const response = this.prendasService.updatePrenda(newPrenda);

    if (response === 'Prenda actualizada con exito') {
      this.router.navigateByUrl('/Principal');
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
  }

  createPrenda(imageUrls: string[]) {
    const nuevaPrenda = new Prenda(
      this.prenda.value.id,
      this.prenda.value.nombre,
      this.prenda.value.precio,
      this.prenda.value.descripcion,
      this.colores,
      this.categorias,
      imageUrls,
      'activo',
      this.prenda.value.existencias
    );

    const response = this.prendasService.addPrenda(nuevaPrenda);

    if (response === 'Prenda registrada con exito') {
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
    this.imagenes = [];
    this.imagenUrl = '';
    this.colores = [];
    this.categorias = [];
  }

  getImagenURL(): any {
    return this.imagen ? URL.createObjectURL(this.imagen) : null;
  }

  eliminarImagen(index: number) {
    this.imagenesPreview.splice(index, 1);
    this.imagenes.splice(index, 1);
  }

  eliminarImagenE(index: number) {
    this.imagenesAntiguas.splice(index, 1);
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        this.imagenes.push(input.files[i]);
        const maxSize = 3024 * 3024;

        if (file.size <= maxSize) {
          this.imagen = file;
          const newFile = URL.createObjectURL(file);
          this.imagenesPreview.push(newFile);
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
      }
    }
  }

  ngOnInit(): void {
    this.imagenesAntiguas = [];
    const prendaId = this.route.snapshot.paramMap.get('id');
    if (prendaId) {
      this.isEditMode = true;
      this.loadPrendaForEdit(prendaId);
    } else {
      // Estamos en modo de registro
      this.initNewPrendaForm();
    }
  }

  private loadPrendaForEdit(prendaId: string): void {
    this.prendasService.getPrendaPorId(prendaId).subscribe((prenda) => {
      this.initEditPrendaForm(prenda!);
    });
  }

  private initEditPrendaForm(prenda: Prenda): void {
    this.prenda = this.formBuilder.group({
      id: [prenda.id, Validators.required],
      nombre: [prenda.nombre, Validators.required],
      precio: [prenda.precio, [Validators.required, Validators.min(0)]],
      descripcion: [prenda.descripcion, Validators.required],
      colores: [''],
      imagenprenda: [''],
      existencias: [
        prenda.existencias,
        [Validators.required, Validators.min(1)],
      ],
    });

    this.categorias = prenda.categorias;
    this.colores = prenda.colores;

    for (let i = 0; i < prenda.imagenes.length; i++) {
      this.imagenesAntiguas.push(prenda.imagenes[i]);
    }
  }

  initNewPrendaForm() {
    this.prenda = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required],
      colores: [''],
      imagenprenda: [''],
      existencias: [1, [Validators.required, Validators.min(1)]],
    });
    this.categorias = [];
    this.colores = [];
  }
}
