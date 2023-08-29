import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart_service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-superior',
  templateUrl: './superior.component.html',
  styleUrls: ['./superior.component.css'],
})
export class SuperiorComponent {
  productosCarrito: any[] = [];
  private cartItemsSubscription: Subscription;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.productosCarrito = this.cartService.getItems();

    this.cartItemsSubscription = this.cartService.getItemsChangedObservable()
      .subscribe((cartItems: any[]) => {
        this.productosCarrito = cartItems;
      });
  }

  ngOnDestroy(): void {
    if (this.cartItemsSubscription) {
      this.cartItemsSubscription.unsubscribe();
    }
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

  InventarioVentas() {
    this.router.navigateByUrl('/InventarioVentas');
  }
}
