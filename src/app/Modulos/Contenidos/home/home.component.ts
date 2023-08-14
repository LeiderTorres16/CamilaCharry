import { Component } from '@angular/core';
<<<<<<< HEAD
import { PrendasService } from 'src/app/Services/prendas_Service';
import { Prenda } from 'src/app/Models/prenda_class';
=======
import { Router } from '@angular/router';
>>>>>>> be19ef8 (Detalle prenda)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  productosDestacados: any[] = [];
  productosEspeciales: any[] = [];

<<<<<<< HEAD
  constructor(private prendasService: PrendasService) {
=======
  constructor(private router: Router) {
>>>>>>> be19ef8 (Detalle prenda)
    // Agregar algunos productos de ejemplo al carrito

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

  agregarProducto(prenda: Prenda) {
    this.productosDestacados.push(prenda);
  }

  agregarProductoE(producto: any) {
    this.productosEspeciales.push(producto);
  }

  ngOnInit():void{
    this.prendasService.getPrendas().subscribe(prendas=> {
      
      prendas.forEach(prenda => {
        this.agregarProducto(prenda);
      });    
        console.log(prendas);
    })
  }
}
