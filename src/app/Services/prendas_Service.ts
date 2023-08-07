import { Injectable } from "@angular/core";
import { Firestore, collection, addDoc } from "@angular/fire/firestore";
import { Prenda } from "../Models/prenda_class";
import { doc, setDoc } from "firebase/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";



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
          imagen: prenda.imagen
        });
      return 'Bien';
    } catch (error) {
      return 'error';
    }

  }

  async addImage(image:any){
    const path = `prendas/${image.name}`;
    const uploadTask = await this.fireStorage.upload(path, image);
    return await uploadTask.ref.getDownloadURL();
  }
}