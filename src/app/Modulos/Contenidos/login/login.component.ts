import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth_service';
import { LocalStorageService } from 'src/app/Services/localstorage.service';
import { UserService } from 'src/app/Services/users_service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() stateLogin = new EventEmitter<boolean>();

  loginForm: FormGroup;
  login: boolean;

  constructor(private router: Router, private userService: UserService, private localstorageService: LocalStorageService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    const resp = this.userService.getUserPorCorreo(this.loginForm.value.email);
    resp.subscribe((res) => {
      if (this.loginForm.valid && res?.contraseña==this.loginForm.value.password) {
        this.localstorageService.setItem(res);
        this.router.navigateByUrl('/Principal');
        Swal.fire({
          text: "Ingreso Exitoso",
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: "Hubo un error al iniciar sesion",
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#CAA565',
        });
        this.loginForm.markAllAsTouched();
      }
    })
  }

  Registro(){
    this.router.navigateByUrl('/Registro');
  }


}

