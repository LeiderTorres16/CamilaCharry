import { Injectable } from "@angular/core";
import { Firestore, collection, addDoc, collectionData } from "@angular/fire/firestore";
import { Prenda } from "../Models/prenda_class";
import { doc, setDoc } from "firebase/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})

export class PrendasService {

  constructor(private firestore: Firestore,
    private fireStorage:AngularFireStorage
  ) { }

  addPrenda(prenda: Prenda):string {
    try {
      const prendaRef = collection(this.firestore, 'prendas');
      
      setDoc(doc(this.firestore,'prendas',prenda.id),
        {
          id: prenda.id,
          nombre: prenda.nombre,
          precio: prenda.precio,
          descripcion: prenda.descripcion,
          colores: prenda.colores,
          imagen: prenda.imagen,
          categorias: prenda.categorias
        });
      return 'Prenda registrada con exito';
    } catch (error : string | any) {
      return error;
    }

  }

  async addImage(image:any){

    try {
      const path = `prendas/${image.name}`;
      const uploadTask = await this.fireStorage.upload(path, image);
      return await uploadTask.ref.getDownloadURL();
    } catch (error) {
      return 'error'
    }

  }

  getPrendas(): Observable<Prenda[]>{
    const prendaRef = collection(this.firestore,'prendas');
    return collectionData(prendaRef, {idField: 'id'})as Observable<Prenda[]>;
  }
}