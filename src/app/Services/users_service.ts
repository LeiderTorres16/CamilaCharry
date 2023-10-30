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

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private firestore: Firestore,
  ) {}

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

  async getNumberOfUsers(): Promise<number> {
    const userRef = collection(this.firestore, 'usuarios');
    const querySnapshot = await getDocs(userRef);
    return querySnapshot.size;
  }
}
