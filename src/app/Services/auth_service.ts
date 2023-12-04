import { Injectable } from '@angular/core';
import { User } from '../Models/user_class';
import { UserService } from './users_service';
import { Router } from '@angular/router';
import { authEnviorment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpointRegistro: string;
  endpointLogin: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.endpointRegistro = authEnviorment.registro;
    this.endpointLogin = authEnviorment.login;
  }

  async registerUser(user: User): Promise<any> {
    try {      
      const result = await this.httpClient.post(this.endpointRegistro, {
        "correo": user.correo,
        "password": user.contraseña,
        "apellido": user.apellido,
        "direccion": user.direccion,
        "ciudad": user.ciudad,
        "nombre": user.nombre,
        "rol": "estandar",
      }).toPromise();

      return result as Promise<any>;
    } catch (e) {
      return null;
    }
  }

  async loginUser(email: string, password: string): Promise<any> {
    try {
      const result = await this.httpClient.post(this.endpointLogin, {
        "username": email,
        "password": password,
      }).toPromise()
      
      return result as Promise<any>;
    } catch (error) {
      return null;
    }
  }

}
