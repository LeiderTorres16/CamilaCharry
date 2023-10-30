import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Prenda } from '../Models/prenda_class';
import { doc, setDoc } from 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Venta } from '../Models/venta.class';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  fechaActual: Date;
  fechaActualFormateada: string;
  data: any;
  constructor(
    private firestore: Firestore,
    private fireStorage: AngularFireStorage,
    private dataService: DataService
  ) {
    this.fechaActual = new Date();
    this.fechaActualFormateada = this.formatoFechaHora(this.fechaActual);
  }
  formatoFechaHora(fecha: Date): string {
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    const hours = fecha.getHours().toString().padStart(2, '0');
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    return year + month + day + hours + minutes;
  }
  async addVenta(prendas: Prenda[]): Promise<string> {
    try {
      this.dataService.data$.subscribe(async (data) => {
        this.data = data;
        const totalVenta = prendas.reduce(
          (total, prenda) => total + prenda.precio,
          0
        );
        const ventasDocRef = doc(
          this.firestore,
          'ventas',
          this.fechaActualFormateada
        );
        await setDoc(ventasDocRef, { 
          referencia: parseInt(this.fechaActualFormateada),
          productos: prendas,
          total: totalVenta,
          usuario: this.data,
          fecha: this.fechaActualFormateada
         });
      });
      return 'Venta registrada con exito';
    } catch (error: string | any) {
      return error;
    }
  }
}
