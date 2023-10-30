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
  productosDestacados: any[] = [];
  productosEspeciales: any[] = [];
  data: any;

  constructor(private prendasService: PrendasService, private router: Router,private cartService: CartService, private dataService: DataService) {

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

  detallePrenda(prenda: Prenda){
    console.log(prenda.id);
    
    this.router.navigate(['/DetallePrenda', prenda.id]);
  }
  addToCart(prenda: Prenda): void {
    this.cartService.addToCart(prenda);
  }

  ngOnInit():void{
    this.prendasService.getPrendas().subscribe(prendas=> {
      
      prendas.forEach(prenda => {
        this.agregarProducto(prenda);
      });    
    })
  }
}
