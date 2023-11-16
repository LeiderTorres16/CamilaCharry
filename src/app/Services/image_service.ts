import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';
import { ImageFile } from '../Models/imagefile';
import { CloudinaryAsset } from '../Models/cloudinary_asset';

const uploadsUrl = 'http://localhost:3000/image/uploads';
@Injectable({
  providedIn: 'root',
})
export class ImageUploaderService {
  constructor(private httpClient: HttpClient) {}

  async uploadImage(files: File[]): Promise<string[] | undefined> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name);
   });
    
   const result = await this.httpClient.post(uploadsUrl, formData).toPromise();
    return result as Promise<string[] | undefined>;
  }
}
