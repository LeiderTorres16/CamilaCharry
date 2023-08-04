import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  productosDestacados: any[] = [];
  productosEspeciales: any[] = [];

  constructor() {
    // Agregar algunos productos de ejemplo al carrito
    this.agregarProducto({
      imagen: '../../../assets/images/c_formal_gray_shirt.png',
      nombreProducto: 'Camiseta Blanca',
      codigo: 'CM001',
      precio: 99.99,
    });

    this.agregarProducto({
      imagen: '../../../assets/images/c_formal_gray_shirt.png',
      nombreProducto: 'Camiseta Negra',
      codigo: 'CM001',
      precio: 99.99,
    });

    this.agregarProducto({
      imagen: '../../../assets/images/c_formal_gray_shirt.png',
      nombreProducto: 'Camiseta Blanca',
      codigo: 'CM001',
      precio: 99.99,
    });

    this.agregarProducto({
      imagen: '../../../assets/images/c_formal_gray_shirt.png',
      nombreProducto: 'Camiseta Blanca',
      codigo: 'CM001',
      precio: 99.99,
    });
    this.agregarProducto({
      imagen: '../../../assets/images/c_formal_gray_shirt.png',
      nombreProducto: 'Camiseta Blanca',
      codigo: 'CM001',
      precio: 99.99,
    });
    this.agregarProducto({
      imagen: '../../../assets/images/c_formal_gray_shirt.png',
      nombreProducto: 'Camiseta Blanca',
      codigo: 'CM001',
      precio: 99.99,
    });


    this.agregarProductoE({
      imagen: '../../../assets/images/c_western-shirt.png',
      nombreProducto: 'Camisa Gris',
      precio: 45.50,
    });

    this.agregarProductoE({
      imagen: '../../../assets/images/c_western-shirt.png',
      nombreProducto: 'Camisa Gris',
      precio: 45.50,
    });

    this.agregarProductoE({
      imagen: '../../../assets/images/c_western-shirt.png',
      nombreProducto: 'Camisa Gris',
      precio: 45.50,
    });

    this.agregarProductoE({
      imagen: '../../../assets/images/c_western-shirt.png',
      nombreProducto: 'Camisa Gris',
      precio: 45.50,
    });

    this.agregarProductoE({
      imagen: '../../../assets/images/c_western-shirt.png',
      nombreProducto: 'Camisa Gris',
      precio: 45.50,
    });

    this.agregarProductoE({
      imagen: '../../../assets/images/c_western-shirt.png',
      nombreProducto: 'Camisa Gris',
      precio: 45.50,
    });

    this.agregarProductoE({
      imagen: '../../../assets/images/c_western-shirt.png',
      nombreProducto: 'Camisa Gris',
      precio: 45.50,
    });
  }

  agregarProducto(producto: any) {
    this.productosDestacados.push(producto);
  }

  agregarProductoE(producto: any) {
    this.productosEspeciales.push(producto);
  }
}
