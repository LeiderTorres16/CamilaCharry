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
import { HttpClient } from '@angular/common/http';
import { ventasEnvironment } from 'src/environments/environment';
import { PrendaCarrito } from '../Models/prendaCarrito.class';

@Injectable({
  providedIn: 'root',
})
export class VentaService {


  endpointCrearVenta:string;


  fechaActual: Date;
  fechaActualFormateada: string;
  data: any;
  fecha: string;
  constructor(
    private firestore: Firestore,
    private fireStorage: AngularFireStorage,
    private dataService: DataService,
    private httpClient: HttpClient
  ) {
    this.endpointCrearVenta = ventasEnvironment.crearVenta;

    this.fechaActual = new Date();
    this.fechaActualFormateada = this.formatoFechaHora(this.fechaActual);
    this.fecha = this.formatoFecha(this.fechaActual);
  }
  formatoFechaHora(fecha: Date): string {
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    const hours = fecha.getHours().toString().padStart(2, '0');
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    return year + month + day + hours + minutes;
  }

  formatoFecha(fecha: Date): string {
    const year = fecha.getFullYear().toString();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    return year + '/' + month + '/' + day;
  }

  async addVenta(prendas: PrendaCarrito[]): Promise<any> {
    try {
      this.dataService.data$.subscribe(async (data) => {
        this.data = data;
        const totalVenta = prendas.reduce(
          (total, prenda) => total + prenda.totalProducto,
          0
        );
        // const ventasDocRef = doc(
        //   this.firestore,
        //   'ventas',
        //   this.fechaActualFormateada+data.id
        // );
        // await setDoc(ventasDocRef, {
        //   referencia: this.fechaActualFormateada+data.id,
        //   productos: prendas,
        //   total: totalVenta,
        //   usuario: this.data,
        //   fecha: this.fecha
        //  });

        const result = await this.httpClient.post(this.endpointCrearVenta, {
          "fecha": this.fecha,
          "productos":prendas,
          "referencia":this.fechaActualFormateada+data.usr.nombre,
          "total":totalVenta,
          "usuario":this.data.usr,
          "estado":"Activo"
        }).toPromise();

        return result as Promise<any>;
      });
    } catch (error: string | any) {
      return null;
    }
  }
}
