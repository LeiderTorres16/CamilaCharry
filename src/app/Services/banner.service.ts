import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Banner } from '../Models/banner.class';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(
    private firestore: Firestore,
    private fireStorage: AngularFireStorage
  ) {}

  addBanner(banner: Banner): string {
    try {
      setDoc(doc(this.firestore, 'banner', banner.id), {
        id: banner.id,
        titulo: banner.titulo,
        texto: banner.texto,
        imagen: banner.imagen,
      });
      return 'Banner registrado con exito';
    } catch (error: string | any) {
      return error;
    }
  }

  async borrarBanner(banner: Banner) {
    try {
      await deleteDoc(doc(this.firestore, 'banner', banner.id));
      return 'Banner eliminado con exito';
    } catch (error) {
      return 'error';
    }
  }

  async updateBanner(banner: Banner): Promise<string> {
    try {
    await updateDoc(doc(this.firestore, 'banner', banner.id), {
        id: banner.id,
        titulo: banner.titulo,
        texto: banner.texto,
        imagen: banner.imagen,
      });
      return 'Banner actualizado con exito';
    } catch (error: string | any) {
      return error;
    }
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

  async getNumberOfBanners(): Promise<number> {
    const bannerRef = collection(this.firestore, 'banner');
    const querySnapshot = await getDocs(bannerRef);
    return querySnapshot.size;
  }

  getBanners(): Observable<Banner[]> {
    const prendaRef = collection(this.firestore, 'banner');
    return collectionData(prendaRef, { idField: 'id' }) as Observable<Banner[]>;
  }
}
