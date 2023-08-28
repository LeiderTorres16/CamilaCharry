import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart_service';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  productosCarrito: any[] = [];
  cantidades: number[] = []; // Matriz para rastrear las cantidades
  totalCarrito: number = 0;

  constructor(private cartService: CartService) {
    this.productosCarrito = this.cartService.getItems();
    this.cantidades = new Array(this.productosCarrito.length).fill(1); // Inicializa las cantidades en 1
    this.actualizarTotal();
  }

  agregarProducto(producto: any, index: number) {
    this.productosCarrito.push({ ...producto });
    this.cantidades.push(1); // Agrega una cantidad inicial de 1
    this.actualizarTotal();
  }

  eliminarProducto(index: number) {
    this.productosCarrito.splice(index, 1);
    this.cantidades.splice(index, 1); // Elimina la cantidad correspondiente
    this.actualizarTotal();
  }

  actualizarCantidad(index: number) {
    this.actualizarTotal();
  }

  private actualizarTotal() {
    this.totalCarrito = this.productosCarrito.reduce(
      (total, producto, index) => total + producto.precio * this.cantidades[index],
      0
    );
  }
}
