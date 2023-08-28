// cart.service.ts
import { Injectable } from '@angular/core';
import { Prenda } from '../Models/prenda_class';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
    export class CartService {
    private cartItems:Prenda[] = [];

    addToCart(prenda: Prenda): void {
        if (this.validation(prenda)) {
          this.cartItems.push(prenda);
          Swal.fire({
            icon: 'success',
            title: 'La prenda ha sido añadida al carrito con éxito.',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'La prenda ya está registrada en el carrito.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#CAA565',
        
              });        }
      }
    validation(prenda: Prenda): boolean {
        const prendaRegistrada = this.cartItems.find(item => item.id === prenda.id);
        return !prendaRegistrada;
      }
    
    getItems(): any[] {
        return this.cartItems;
    }

    clearCart(): void {
        this.cartItems = [];
    }
    }
