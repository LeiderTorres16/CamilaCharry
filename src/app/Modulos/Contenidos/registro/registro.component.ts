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
import { UserService } from 'src/app/Services/users_service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registrationForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contraseña: new FormControl('', [Validators.required]),
      cContraseña: new FormControl('', [Validators.required]),
    });

    // Configurar el validador en ngOnInit
    this.registrationForm
      .get('cContraseña')
      ?.setValidators(this.passwordMatchValidator.bind(this));
  }

  ngAfterViewInit() {
    this.registrationForm
      .get('cContraseña')
      ?.setValidators(this.passwordMatchValidator.bind(this));
  }

  // Función de validación personalizada
  passwordMatchValidator(control: AbstractControl) {
    const password = this.registrationForm.get('contraseña')?.value;
    const confirmPassword = control.value;

    if (password === confirmPassword) {
      return null; // La validación es exitosa
    } else {
      return { passwordMismatch: true }; // La validación falla
    }
  }

  // Función para obtener mensajes de error de campos obligatorios
  getErrorMessage(controlName: string): string {
    const control = this.registrationForm.get(controlName);

    if (control?.hasError('required') && (control?.touched || control?.dirty)) {
      return 'Este campo es obligatorio';
    }

    return '';
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      const usuario = new User(
        0,
        this.registrationForm.value.nombre,
        this.registrationForm.value.apellido,
        this.registrationForm.value.direccion,
        this.registrationForm.value.email,
        this.registrationForm.value.contraseña,
        'estandar'
      );
      const result = await this.authService.registerUser(usuario);
      if (result) {
        Swal.fire({
          text: 'Registro Exitoso',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
        this.router.navigateByUrl('/Principal');
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Hubo un error al registrar',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#CAA565',
        });
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Hubo un error al registrar',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#CAA565',
      });
    }
  }

  Login() {
    this.router.navigateByUrl('/InicioSesion');
  }

  regreso() {
    this.router.navigateByUrl('/Principal');
  }
}
