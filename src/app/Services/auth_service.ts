import { Injectable } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { User } from '../Models/user_class';
import { UserService } from './users_service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firestore: Firestore, private userService: UserService, private router: Router) {}

  registerUser(user: User): string {
    try {
      setDoc(doc(this.firestore, 'usuarios', user.id.toString()), {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        direccion: user.direccion,
        correo: user.correo,
        contraseña: user.contraseña,
        rol: user.rol,
      });
      return 'Usuario Creado con exito';
    } catch (e) {
      return 'Hubo un problema';
    }
  }

    login(email: string, password: string) {
    const resp = this.userService.getUserPorCorreo(email);
    resp.subscribe((res) =>{
      if (res?.contraseña == password) {
        this.router.navigateByUrl('/InicioSesion');
      } else {
        
      }
    });
  }
}
