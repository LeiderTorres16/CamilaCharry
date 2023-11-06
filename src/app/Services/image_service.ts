import { HttpClient,HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';
import { ImageFile } from '../Models/imagefile';
import { CloudinaryAsset } from '../Models/cloudinary_asset';
import { catchError } from 'rxjs/operators';
import sharp from 'sharp';

const uploadUrl = 'http://localhost:3000/image/upload';
const uploadsUrl = 'http://localhost:3000/image/uploads';

@Injectable({
  providedIn: 'root',
})
export class ImageUploaderService {
  constructor(private httpClient: HttpClient) {}

// async uploadImage(file: File): Promise<string> {
//   try {
//     const formData = new FormData();
//     formData.append('file', file);
    
//     const result = await this.httpClient
//       .post<string>(uploadUrl, formData)
//       .toPromise(); 
      
//     if (result) {
//       return result;
//     } else {
//       return 'error';
//     }
//   } catch (error) {
//     return 'error';
//   }
// }
uploadImage(file: File): Observable<string> {
  const formData = new FormData();
  formData.append('file', file);
 
  return this.httpClient.post(uploadUrl, formData, { responseType: 'text' }).pipe(
      map((imageUrl: string) => {
        if (!imageUrl) {
          throw new Error('Image upload failed.');
        }
        return imageUrl;
      })
  );
 }
  

 uploadImages(imageFiles: ImageFile[]): Observable<CloudinaryAsset[]> {
  const files = imageFiles.map((imageFile) => imageFile.file);
  const files$ = from(files);
  return files$.pipe(
     map((file) => this.getFormData(file)),
     mergeMap((formData) =>
       this.httpClient.post<CloudinaryAsset>(uploadsUrl, formData)
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