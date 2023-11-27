import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Banner } from '../Models/banner.class';
import { bannerEnvironment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ImageUploaderService } from './image_service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class BannerService {

  endpointCrearBanner:string;
  endpointGetBanners: string;
  endpointUpdateBanner:string;
  endpointBorrarBanner:string;

  constructor(
    private firestore: Firestore,
    private fireStorage: AngularFireStorage,
    private httpClient: HttpClient,
    private imagenService: ImageUploaderService,
  ) {
    this.endpointCrearBanner = bannerEnvironment.crearBanner;
    this.endpointGetBanners = bannerEnvironment.getBanners;
    this.endpointUpdateBanner = bannerEnvironment.updateBanner;
    this.endpointBorrarBanner = bannerEnvironment.borrarBanner;
  }

  async addBanner(banner: Banner): Promise<string> {
    try {
      const result = await this.httpClient.post(this.endpointCrearBanner, {
        "id":banner.id,
        "imagen": banner.imagen,
        "texto":banner.texto,
        "titulo":banner.titulo
      }).toPromise();

      return result as Promise<string>;
    } catch (error: string | any) {
      return error;
    }
  }

  async borrarBanner(banner: Banner): Promise<string> {
    try {
      const result = await this.httpClient.delete(this.endpointBorrarBanner+banner.id).toPromise();
      return result as Promise<string>;
    } catch (error: string | any ) {
      return error;
    }
  }

  async updateBanner(banner: Banner): Promise<string> {
    try {
    const result = await this.httpClient.put(this.endpointUpdateBanner+banner.id, {
      "id": banner.id,
      "imagen": banner.imagen,
      "texto":banner.texto,
      "titulo":banner.titulo
    }).toPromise();
      return result as Promise<string>;
    } catch (error: string | any) {
      return error;
    }
  }

  async addImage(image: File) {
    try {
      const imagenes: File[] = [];
      imagenes.push(image)
      return await this.imagenService.uploadImage(imagenes);
    } catch (error) {
      return 'error';
    }
  }
  
  async getLastPrendaId(): Promise<number | null> {
    try {
      const prendas: any[] | undefined = await this.httpClient.get<any[]>(this.endpointGetBanners).toPromise();

      if (prendas && prendas.length > 0) {
        const ultimoId = prendas[prendas.length - 1].id;
        return ultimoId != null ? +ultimoId : null;  // Convierte el ID a número
      } else {
        return null;  // No hay registros
      }
    } catch (error) {
      console.error('Error al obtener el último ID de prendas:', error);
      throw error;  // Puedes manejar el error según tus necesidades
    }
  }

  getBanners(): Observable<any[]> {
    const result = this.httpClient.get(this.endpointGetBanners);
    return result as Observable<any[]>;
  }
}
