// cart.service.ts
import { Injectable } from '@angular/core';
import { Prenda } from '../Models/prenda_class';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Prenda[] = [];
  private cartItemsChanged = new Subject<any[]>();

  addToCart(prenda: Prenda): void {
    if (this.validation(prenda)) {
      this.cartItems.push(prenda);
      this.cartItemsChanged.next(this.cartItems.slice());

      Swal.fire({
        icon: 'success',
        text: 'La prenda ha sido añadida al carrito con éxito.',
        showConfirmButton: false,
        timer: 1000
      })
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'La prenda ya está registrada en el carrito.',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#CAA565',
        timer: 2000

      });
    }
  }

  validation(prenda: Prenda): boolean {
    const prendaRegistrada = this.cartItems.find(item => item.id === prenda.id);
    return !prendaRegistrada;
  }

  getItems(): any[] {
    return this.cartItems;
  }
  
  getItemsChangedObservable() {
    return this.cartItemsChanged.asObservable();
  }
  eliminarProducto(index: number) {
    this.cartItems.splice(index, 1);
    this.cartItemsChanged.next(this.cartItems.slice()); // Emite el evento de cambio
  }
  clearCart(): void {
    this.cartItems = [];
    this.cartItemsChanged.next(this.cartItems.slice()); // Emite el evento de cambio

  }

}
