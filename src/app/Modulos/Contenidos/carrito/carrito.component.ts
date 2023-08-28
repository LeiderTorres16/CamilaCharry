import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart_service';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  productosCarrito: any[] = [];

  constructor(private cartService: CartService) {
    this.productosCarrito = this.cartService.getItems();
  }

  agregarProducto(producto: any) {
    this.productosCarrito.push(producto);
  }

  eliminarProducto(index: number) {
    this.productosCarrito.splice(index, 1);
  }
}

