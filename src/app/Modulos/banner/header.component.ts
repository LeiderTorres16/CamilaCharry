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
      html: `
      <form id="bannerForm">
        <div class="form-group">
          <label for="title">Título</label>
          <input type="text" id="title" class="form-control" placeholder="Título" required>
        </div>
        <div class="form-group">
          <label for="text">Texto</label>
          <textarea id="text" class="form-control" placeholder="Texto" required></textarea>
        </div>
        <div class="form-group">
          <label for="image">Imagen</label>
          <input type="file" id="image" class="form-control" accept="image/*" required>
        </div>
      </form>`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#28A745',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#DC3545',
      customClass: {
        input: 'swal-input',
      },
      preConfirm: async () => {
        Swal.showLoading();
        const title = (document.getElementById('title') as HTMLInputElement)
          .value;
        const text = (document.getElementById('text') as HTMLTextAreaElement)
          .value;
        const image = (document.getElementById('image') as HTMLInputElement)
          .files![0];

        if (title && text && image) {
          try {
            const imagenUrl = await this.bannerService.addImage(image);
            const nRegistros = await this.bannerService.getNumberOfBanners();
            const textN = (nRegistros + 1).toString();
            const newBanner = new Banner(textN, title, text, imagenUrl);
            const response = this.bannerService.addBanner(newBanner);
            if (response === 'Banner registrado con exito') {
              Swal.fire({
                title: 'Añadido!',
                text: 'Se ha añadido el banner con exito',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#28A745',
              });
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'Formulario no válido. Por favor, verifica los campos y asegúrate de seleccionar al menos una imagen.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#28A745',
              });
            }
          } catch (error) {
            Swal.fire({
              title: 'Error!',
              text: 'Ha ocurrido un error inesperado.',
              icon: 'error',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#CAA565',
            });
          } finally {
            Swal.hideLoading();
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
      html: `
        <form id="bannerForm">
          <div class="form-group">
            <label for="title">Título</label>
            <input type="text" id="title" class="form-control" placeholder="Título" required value="${banner.titulo}">
          </div>
          <div class="form-group">
            <label for="text">Texto</label>
            <textarea id="text" class="form-control" placeholder="Texto" required>${banner.texto}</textarea>
          </div>
          <div class="form-group">
            <label for="image">Imagen</label>
            <input type="file" id="image" class="form-control" accept="image/*">
          </div>
        </form>`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#28A745',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#DC3545',
      customClass: {
        input: 'swal-input',
      },
      preConfirm: async () => {
        Swal.showLoading();

        const title = (document.getElementById('title') as HTMLInputElement)
          .value;
        const text = (document.getElementById('text') as HTMLTextAreaElement)
          .value;
        const image = (document.getElementById('image') as HTMLInputElement)
          .files![0];

        if (title && text) {
          try {
            if (image) {
              const imagenUrl = await this.bannerService.addImage(image);
              const newBanner = new Banner(banner.id, title, text, imagenUrl);
              const response = await this.bannerService.updateBanner(newBanner);

              if (response === 'Banner actualizado con exito') {
                Swal.fire({
                  title: 'Actualizado!',
                  text: 'Se ha actualizado el banner con exito',
                  icon: 'success',
                  confirmButtonText: 'Ok',
                  confirmButtonColor: '#28A745',
                });
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
                Swal.fire({
                  title: 'Actualizado!',
                  text: 'Se ha actualizado el banner con exito',
                  icon: 'success',
                  confirmButtonText: 'Ok',
                  confirmButtonColor: '#28A745',
                });
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
          } catch (error) {
            Swal.fire({
              title: 'Error!',
              text: 'Ha ocurrido un error inesperado.',
              icon: 'error',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#CAA565',
            });
          } finally {
            Swal.hideLoading();
          }
        } else {
          Swal.showValidationMessage('Título y Texto son obligatorios');
        }
      },
    });
  }

  async deleteBanner(banner: Banner) {
    if (this.banners.length > 1) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Quieres eliminar este banner?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        confirmButtonColor: '#28A745',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#DC3545',
        preConfirm: async () => {
          const response = await this.bannerService.borrarBanner(banner);
          if (response === 'Banner eliminado con exito') {
            Swal.fire({
              title: 'Eliminado!',
              text: 'Se ha eliminado el banner con exito',
              icon: 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#28A745',
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Hubo un error al tratar de eliminar el banner',
              icon: 'error',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#CAA565',
            });
          }
        },
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'No puedes quedarte sin al menos un banner',
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
}
