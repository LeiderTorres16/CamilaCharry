import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart_service';

@Component({
  selector: 'app-superior',
  templateUrl: './superior.component.html',
  styleUrls: ['./superior.component.css'],
})
export class SuperiorComponent {
  productosCarrito: any[] = [];

  constructor(private router: Router,private cartService: CartService) {
    this.productosCarrito = this.cartService.getItems();

  }

  Carrito() {
    this.router.navigateByUrl('/Carrito');
  }

  registroPrenda() {
    this.router.navigateByUrl('/RegistroPrenda');
  }

  Principal() {
    this.router.navigateByUrl('/Principal');
  }
}
