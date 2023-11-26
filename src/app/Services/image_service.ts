import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';
import { ImageFile } from '../Models/imagefile';
import { CloudinaryAsset } from '../Models/cloudinary_asset';
import { imagenEnvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageUploaderService {

  endpointCargarImagenes: string;

  constructor(private httpClient: HttpClient) {
    this.endpointCargarImagenes = imagenEnvironment.cargarImagenes;
  }

  async uploadImage(files: File[]): Promise<string[] | undefined> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name);
   });
    
   const result = await this.httpClient.post(this.endpointCargarImagenes, formData).toPromise();
    return result as Promise<string[] | undefined>;
  }
}
