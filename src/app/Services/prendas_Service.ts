import { Injectable } from "@angular/core";
import { Firestore, collection, addDoc } from "@angular/fire/firestore";
import Prenda from "../Interfaces/prenda_Interface";



@Injectable({
  providedIn: 'root'
})

export class PrendasService {

  constructor(private firestore: Firestore,
    
  ) { }

  addPrenda(prenda: Prenda) {
    try {
      const prendaRef = collection(this.firestore, 'prendas');
      addDoc(prendaRef, prenda);
      return 'Bien';
    } catch (error) {
      return 'Mal';
    }

  }
}