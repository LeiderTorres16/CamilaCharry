import { Component } from '@angular/core';
import { PrendasService } from 'src/app/Services/prendas_Service';
import { Prenda } from 'src/app/Models/prenda_class';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart_service';
import { DataService } from 'src/app/Services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  productosDestacados: Prenda[] = [];
  productosEspeciales: any[] = [];
  data: any;

  constructor(
    private prendasService: PrendasService,
    private router: Router,
    private cartService: CartService,
    private dataService: DataService
  ) {
    this.agregarProductoE({
      imagen: '../../../assets/images/c_western-shirt.png',
      nombreProducto: 'Camisa Gris',
      precio: 45.5,
    });

    this.agregarProductoE({
      imagen: '../../../assets/images/c_western-shirt.png',
      nombreProducto: 'Camisa Gris',
      precio: 45.5,
    });

    this.agregarProductoE({
      imagen: '../../../assets/images/c_western-shirt.png',
      nombreProducto: 'Camisa Gris',
      precio: 45.5,
    });
  }

  agregarProducto(prenda: Prenda) {
    this.productosDestacados.push(prenda);
  }

  agregarProductoE(producto: any) {
    this.productosEspeciales.push(producto);
  }

  detallePrenda(prenda: Prenda) {
    console.log(prenda.id);

    this.router.navigate(['/DetallePrenda', prenda.id]);
  }
  addToCart(prenda: Prenda): void {
    this.cartService.addToCart(prenda);
  }

  getImageUrl(producto: any): string {
    if (producto.imagen && producto.imagen.length > 0) {
      return producto.imagen[0];
    } else {
      return '';
    }
  }

  ngOnInit(): void {
    this.productosDestacados = [];
    window.scrollTo(0, 0);
    this.prendasService.allPrendas().subscribe((prendas) => {
      prendas.forEach((prenda) => {
        if(prenda.estado == "activo" && prenda.existencias > 0){
          this.agregarProducto(prenda);
        }
      });
    });
  }
}
