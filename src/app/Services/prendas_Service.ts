import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Prenda } from '../Models/prenda_class';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Venta } from '../Models/venta.class';
import { HttpClient } from '@angular/common/http';
import { prendaEnvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrendasService {

  endpointCrearPrenda:string;
  endpointUpdatePrenda:string;
  endpointGetPrendas: string;

  constructor(
    private firestore: Firestore,
    private fireStorage: AngularFireStorage,
    private httpClient: HttpClient
  ) {
    this.endpointCrearPrenda = prendaEnvironment.crearPrenda;
    this.endpointUpdatePrenda = prendaEnvironment.updatePrenda;
    this.endpointGetPrendas = prendaEnvironment.getPrendas;
  }

  async añadirPrenda(prenda: Prenda): Promise<string | undefined> {
    try {
      const result = await this.httpClient.post(this.endpointCrearPrenda, {
        "id": prenda.id,
        "nombre": prenda.nombre,
        "precio": prenda.precio,
        "descripcion": prenda.descripcion,
        "colores": prenda.colores,
        "imagen": prenda.imagen,
        "estado":prenda.estado,
        "existencias": prenda.existencias,
        "categorias": prenda.categorias
      }).toPromise(); 
    
      return result as Promise<string | undefined>;
    } catch (error) {
      return "error"
    }
  }

  async desactivarPrenda(producto: Prenda): Promise<string> {
    try {
      const result = await this.httpClient.put(this.endpointUpdatePrenda+producto.id, {
        "id": producto.id,
        "nombre": producto.nombre,
        "precio": producto.precio,
        "descripcion": producto.descripcion,
        "colores": producto.colores,
        "imagen": producto.imagen,
        "estado":'desactivado',
        "existencias": producto.existencias,
        "categorias": producto.categorias
      }).toPromise(); 
      return result as Promise<string>;
    } catch (error: string | any) {
      return error;
    }
  }

  async updatePrenda(prenda: Prenda): Promise<string> {
    try {
      const result = await this.httpClient.put(this.endpointUpdatePrenda+prenda.id, {
        "id": prenda.id,
        "nombre": prenda.nombre,
        "precio": prenda.precio,
        "descripcion": prenda.descripcion,
        "colores": prenda.colores,
        "imagen": prenda.imagen,
        "estado":prenda.estado,
        "existencias": prenda.existencias,
        "categorias": prenda.categorias
      }).toPromise(); 
      return result as Promise<string>;
    } catch (error: string | any) {
      return error;
    }
  }

  getPrendaPorId(id: string): Observable<Prenda | undefined> {
    return this.allPrendas().pipe(
      map((prendas) => {
        const prendaEncontrada = prendas.find((prenda) => prenda.id === id);
        return prendaEncontrada;
      })
    );
  }


  allPrendas(): Observable<any[]>{
    const result = this.httpClient.get(this.endpointGetPrendas);
    return result as Observable<any[]>;
  }

  getVentas(): Observable<any[]> {
    const ventaRef = collection(this.firestore, 'ventas');
    return collectionData(ventaRef, { idField: 'id' }) as Observable<any[]>;
  }

  getVentaPorReferencia(referencia: string) {
    return this.getVentas().pipe(
      map((ventas) => {
        const ventasEncontradas = ventas.find(
          (venta) => venta.referencia === referencia
        );
        return ventasEncontradas;
      })
    );
  }
}
