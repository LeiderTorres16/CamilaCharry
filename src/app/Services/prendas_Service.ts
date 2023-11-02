  import { Injectable } from '@angular/core';
  import {
    Firestore,
    collection,
    addDoc,
    collectionData,
  } from '@angular/fire/firestore';
  import { Prenda } from '../Models/prenda_class';
  import { doc, setDoc, updateDoc } from 'firebase/firestore';
  import { AngularFireStorage } from '@angular/fire/compat/storage';
  import { Observable } from 'rxjs';
  import { map, distinctUntilChanged  } from 'rxjs/operators';
import { Venta } from '../Models/venta.class';
  
  @Injectable({
    providedIn: 'root',
  })
  export class PrendasService {
    private prendas: Prenda[];
    constructor(
      private firestore: Firestore,
      private fireStorage: AngularFireStorage
    ) {}
  
    addPrenda(prenda: Prenda): string {
      try {
        const prendaRef = collection(this.firestore, 'prendas');
  
        setDoc(doc(this.firestore, 'prendas', prenda.id), {
          id: prenda.id,
          nombre: prenda.nombre,
          precio: prenda.precio,
          descripcion: prenda.descripcion,
          colores: prenda.colores,
          imagenes: prenda.imagenes,
          categorias: prenda.categorias,
          estado: prenda.estado,
          existencias: prenda.existencias
        });
        return 'Prenda registrada con exito';
      } catch (error: string | any) {
        return error;
      }
    }
  
    async desactivarPrenda(producto: Prenda) {
      try {
        await updateDoc(
          doc(this.firestore, 'prendas', producto.id),
          {
            estado: 'desactivado',
          },
        );
        return 'Prenda eliminada con exito';
      } catch (error) {
        return 'error';
      }
    }
  
    updatePrenda(prenda: Prenda): string {
      try {
        updateDoc(
          doc(this.firestore, 'prendas', prenda.id),
          {
            id: prenda.id,
            nombre: prenda.nombre,
            precio: prenda.precio,
            descripcion: prenda.descripcion,
            colores: prenda.colores,
            imagenes: prenda.imagenes,
            categorias: prenda.categorias,
            estado: prenda.estado,
            existencias: prenda.existencias,
          },
        );
        return 'Prenda actualizada con exito';
      } catch (error: string | any) {
        return error;
      }
    }
  
    getPrendaPorId(id: string): Observable<Prenda | undefined> {
      return this.getPrendas().pipe(
        map((prendas) => {
          const prendaEncontrada = prendas.find((prenda) => prenda.id === id);
          return prendaEncontrada;
        })
      );
    }
  
    async addImage(image: any) {
      try {
        const path = `prendas/${image.name}`;
        const uploadTask = await this.fireStorage.upload(path, image);
        return await uploadTask.ref.getDownloadURL();
      } catch (error) {
        return 'error';
      }
    }
  
    getPrendas(): Observable<Prenda[]> {
      const prendaRef = collection(this.firestore, 'prendas');
      return collectionData(prendaRef, { idField: 'id' }) as Observable<Prenda[]>;
    }

    getVentas(): Observable<any[]> {
      const ventaRef = collection(this.firestore, 'ventas');
      return collectionData(ventaRef, { idField: 'id' }) as Observable<any[]>;
    }

    getVentaPorReferencia(referencia: string){
      return this.getVentas().pipe(
        map((ventas) => {
        const ventasEncontradas = ventas.find((venta) => venta.referencia === referencia);
        return ventasEncontradas;
      }))
    }
  }
  