import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Banner } from 'src/app/Models/banner.class';
import { BannerService } from 'src/app/Services/banner.service';
import { DataService } from 'src/app/Services/data.service';
import { LocalStorageService } from 'src/app/Services/localstorage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css',
    '../../../assets/css/main.css',
    '../../../assets/bootstrap-5.0.2-dist/css/bootstrap.min.css',
  ],
})
export class HeaderComponent {
  login: number;
  data: any;
  items = [
    {
      title: 'Nueva Colección 2023',
      buttonText: 'Ver aquí',
      backgroundImage:
        '../../../assets/images/daniele-franchi-GbAEJUJKJ88-unsplash.jpg',
    },
    {
      title: 'Aprende de los cuidados del lino',
      buttonText: 'Ver aquí',
      backgroundImage:
        '../../../assets/images/hannah-morgan-ycVFts5Ma4s-unsplash.jpg',
    },
  ];

  banners: Banner[] = [];
  bannerForm: FormGroup;

  constructor(
    private bannerService: BannerService,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.bannerForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.validadorSesion();
    this.getBanner();
  }

  addBanner() {
    Swal.fire({
      title: 'Agregar Nuevo Banner',
      html:
        '<form id="bannerForm">' +
        '<input type="text" id="title" class="swal2-input" placeholder="Título" required>' +
        '<textarea id="text" class="swal2-input" placeholder="Texto" required></textarea>' +
        '<input type="file" id="image" class="swal2-input" accept="image/*" required>' +
        '</form>',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const title = (document.getElementById('title') as HTMLInputElement)
          .value;
        const text = (document.getElementById('text') as HTMLTextAreaElement)
          .value;
        const image = (document.getElementById('image') as HTMLInputElement)
          .files![0];

        if (title && text && image) {
          const imagenUrl = await this.bannerService.addImage(image);
          const nRegistros = await this.bannerService.getNumberOfBanners();
          const textN = (nRegistros + 1).toString();
          const newBanner = new Banner(textN, title, text, imagenUrl);
          const response = this.bannerService.addBanner(newBanner);
          if (response === 'Banner registrado con exito') {
            Swal.fire(
              'Añadido',
              'El banner ha sido agregado con éxito.',
              'success'
            );
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Formulario no válido. Por favor, verifica los campos y asegúrate de seleccionar al menos una imagen.',
              icon: 'error',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#CAA565',
            });
          }
        } else {
          Swal.showValidationMessage('Todos los campos son obligatorios');
        }
      },
    });
  }

  editBanner(banner: Banner) {
    Swal.fire({
      title: 'Editar Banner',
      html:
        '<form id="bannerForm">' +
        '<input type="text" id="title" class="swal2-input" placeholder="Título" required value="' +
        banner.titulo +
        '">' +
        '<textarea id="text" class="swal2-input" placeholder="Texto" required>' +
        banner.texto +
        '</textarea>' +
        '<input type="file" id="image" class="swal2-input" accept="image/*">' +
        '</form>',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const title = (document.getElementById('title') as HTMLInputElement)
          .value;
        const text = (document.getElementById('text') as HTMLTextAreaElement)
          .value;
        const image = (document.getElementById('image') as HTMLInputElement)
          .files![0];

        if (title && text) {
          if (image) {
            const imagenUrl = await this.bannerService.addImage(image);
            const newBanner = new Banner(
              banner.id,
              title,
              text,
              imagenUrl
            );
            const response = await this.bannerService.updateBanner(newBanner);

            if (response === 'Banner actualizado con exito') {
              Swal.fire(
                'Actualizado',
                'El banner ha sido actualizado con éxito.',
                'success'
              );
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'Formulario no válido. Por favor, verifica los campos.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#CAA565',
              });
            }
          } else {
            const newBanner = new Banner(
              banner.id,
              title,
              text,
              banner.imagen
            );
            const response = await this.bannerService.updateBanner(newBanner);

            if (response === 'Banner actualizado con exito') {
              Swal.fire(
                'Actualizado',
                'El banner ha sido actualizado con éxito.',
                'success'
              );
            } else {
              Swal.fire({ 
                title: 'Error!',
                text: 'Formulario no válido. Por favor, verifica los campos.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#CAA565',
              });
            }
          }
        } else {
          Swal.showValidationMessage('Título y Texto son obligatorios');
        }
      },
    });
  }

  async deleteBanner(banner: Banner) {
    const response = await this.bannerService.borrarBanner(banner);
    if (response === 'Banner eliminado con exito') {
      Swal.fire(
        'Eliminado',
        'El banner ha sido agregado con éxito.',
        'success'
      );
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Hubo un error al tratar de eliminar el banner',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#CAA565',
      });
    }
  }

  getBanner() {
    this.bannerService.getBanners().subscribe((banners) => {
      banners.forEach((banner) => {
        this.banners.push(banner);
      });
    });
  }

  validadorSesion() {
    this.dataService.data$.subscribe(async (data) => {
      this.data = data;
      if (this.data && this.data.rol == 'admin') {
        this.login = 2;
      }
    });
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // for (let i = 0; i < input.files.length; i++) {
      //   const file = input.files[i];
      //   this.imagenes.push(input.files[i]);
      //   const maxSize = 3024 * 3024;
      //   if (file.size <= maxSize) {
      //     this.imagen = file;
      //     const newFile = URL.createObjectURL(file);
      //     this.imagenesPreview.push(newFile);
      //     this.showAlert = false;
      //   } else {
      //     const mensaje =
      //       'La imagen seleccionada es demasiado grande o excede las dimensiones permitidas.';
      //     Swal.fire({
      //       title: 'Error!',
      //       text: mensaje,
      //       icon: 'error',
      //       confirmButtonText: 'Ok',
      //       confirmButtonColor: '#CAA565',
      //     });
      //     this.imagen = null;
      //     input.value = '';
      //     this.showAlert = true;
      //   }
      // }
    }
  }
}
