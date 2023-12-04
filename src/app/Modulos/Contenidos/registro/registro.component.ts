import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user_class';
import { AuthService } from 'src/app/Services/auth_service';
import { LocalStorageService } from 'src/app/Services/localstorage.service';
import { UserService } from 'src/app/Services/users_service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registrationForm: FormGroup;

  imagenesFondo: string[] = ['mq-fondo.jpg', 'regis.jpg', 'c-fondo.jpg'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private localstorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contraseña: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    Swal.fire({
      title: 'Por favor, espera...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      if (this.registrationForm.valid) {
        const usuario = new User(
          0,
          this.registrationForm.value.nombre,
          this.registrationForm.value.apellido,
          this.registrationForm.value.direccion,
          this.registrationForm.value.email,
          this.registrationForm.value.ciudad,
          this.registrationForm.value.contraseña,
          'estandar'
        );
        const result = await this.authService.registerUser(usuario);

        const resultado = await this.authService.loginUser(usuario.correo,usuario.contraseña);

        if (result) {
          Swal.fire({
            text: 'Registro Exitoso',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });
          this.localstorageService.setItem(resultado);
          this.router.navigateByUrl('/Principal');
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Hubo un error al registrar',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#CAA565',
          });
          Swal.hideLoading();
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Hubo un error al registrar',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#CAA565',
        });
        Swal.hideLoading();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Hubo un error al registrar',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#CAA565',
      });
      Swal.hideLoading();
    } finally {
      Swal.hideLoading();
    }
  }

  Login() {
    this.router.navigateByUrl('/InicioSesion');
  }

  regreso() {
    this.router.navigateByUrl('/Principal');
  }

  // Función para obtener mensajes de error de campos obligatorios
  getErrorMessage(controlName: string): string {
    const control = this.registrationForm.get(controlName);

    if (control?.hasError('required') && (control?.touched || control?.dirty)) {
      return 'Este campo es obligatorio';
    }

    return '';
  }
}
