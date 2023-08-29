import { Component } from '@angular/core';

@Component({
  selector: 'app-inventario-ventas',
  templateUrl: './inventario-ventas.component.html',
  styleUrls: ['./inventario-ventas.component.css']
})
export class InventarioVentasComponent{
  mostrarInventario = false;
  mostrarVentas = false;
  
  // Aquí podrías agregar la lógica para cargar productos de inventario y ventas
  productosEspeciales: any[] = []; // Agrega tus productos aquí
  ngOnInit(): void {
    this.mostrarInventario = true; // Inicialmente mostrar el inventario
    this.mostrarVentas = false; 
  }
  constructor() {

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

  agregarProductoE(producto: any) {
    this.productosEspeciales.push(producto);
  }
}
