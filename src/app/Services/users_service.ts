import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Prenda } from '../Models/prenda_class';
import { doc, setDoc, getDocs } from 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Models/user_class';
import { HttpClient } from '@angular/common/http';
import { authEnviorment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  endpointGetUsers:string;

  constructor(
    private firestore: Firestore,
    private httpClient: HttpClient,
  ) {
    this.endpointGetUsers = authEnviorment.getUser;
  }

  getUsers(): Observable<User[]> {
    const prendaRef = collection(this.firestore, 'usuarios');
    return collectionData(prendaRef, { idField: 'id' }) as Observable<User[]>;
  }

  getUserPorCorreo(correo: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      map((users) => {
        const userEncontrado = users.find((user) => user.correo === correo);
        return userEncontrado;
      })
    );
  }
}
