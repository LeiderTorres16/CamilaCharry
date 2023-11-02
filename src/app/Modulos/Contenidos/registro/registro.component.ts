import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user_class';
import { AuthService } from 'src/app/Services/auth_service';
import { UserService } from 'src/app/Services/users_service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registrationForm: FormGroup;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.registrationForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contraseña: new FormControl('', [Validators.required]),
      cContraseña: new FormControl('', [Validators.required])
    });
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      const nRegistros = await this.userService.getNumberOfUsers();
      const usuario = new User(
        nRegistros+1,
        this.registrationForm.value.nombre,
        this.registrationForm.value.apellido,
        this.registrationForm.value.direccion,
        this.registrationForm.value.email,
        this.registrationForm.value.contraseña,
        'estandar'  
      );
      const result = await this.authService.registerUser(usuario);
      if (result == "Usuario Creado con exito") {
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
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Hubo un error al registrar',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#CAA565',
      });
    }
  }

  Login(){
    this.router.navigateByUrl('/InicioSesion');
  }

  regreso(){
    this.router.navigateByUrl('/Principal');
  }

  
}
