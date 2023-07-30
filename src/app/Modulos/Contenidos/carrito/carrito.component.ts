import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  productosCarrito: any[] = [];

  constructor() {
    // Agregar algunos productos de ejemplo al carrito
    this.agregarProducto({
      nombre: 'Camiseta Roja',
      precio: 25.99,
      descripcion: 'Una camiseta roja de algodón.',
    });

    this.agregarProducto({
      nombre: 'Pantalones Vaqueros',
      precio: 39.99,
      descripcion: 'Pantalones vaqueros de corte clásico.',
    });

    this.agregarProducto({
      nombre: 'Zapatos Deportivos',
      precio: 59.99,
      descripcion: 'Zapatos deportivos cómodos y elegantes.',
    });
  }

  agregarProducto(producto: any) {
    this.productosCarrito.push(producto);
  }

  eliminarProducto(index: number) {
    this.productosCarrito.splice(index, 1);
  }
}

