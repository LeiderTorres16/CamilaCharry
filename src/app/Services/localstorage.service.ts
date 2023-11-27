import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(value: any): void {
    localStorage.setItem("Usuario", JSON.stringify(value));
  }

  getItem(): any {
    const item = localStorage.getItem("Usuario");
    return item ? JSON.parse(item) : null;
  }

  removeItem(): void {
    localStorage.removeItem("Usuario");
  }
}
