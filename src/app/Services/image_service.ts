import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';
import { ImageFile } from '../Models/imagefile';
import { CloudinaryAsset } from '../Models/cloudinary_asset';

const uploadUrl = 'http://localhost:3000/image/upload';
@Injectable({
  providedIn: 'root',
})
export class ImageUploaderService {
  constructor(private httpClient: HttpClient) {}

async uploadImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const result = await this.httpClient
      .post<string>(uploadUrl, formData)
      .toPromise(); // Devuelve la URL de la imagen como Promise<string>
      
    if (result) {
      return result;
    } else {
      return 'error'; // Otra opción en caso de result sea undefined
    }
  } catch (error) {
    return 'error';
  }
}

  
  

  uploadImages(imageFiles: ImageFile[]): Observable<CloudinaryAsset[]> {
    const files = imageFiles.map((imageFile) => imageFile.file);
    const files$ = from(files);
    return files$.pipe(
      map((file) => this.getFormData(file)),
      mergeMap((formData) =>
        this.httpClient.post<CloudinaryAsset>(uploadUrl, formData)
      ),
      toArray()
    );
  }

  private getFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }
}