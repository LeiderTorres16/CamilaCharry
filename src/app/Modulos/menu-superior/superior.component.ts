import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart_service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/Services/localstorage.service';
import { DataService } from 'src/app/Services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-superior',
  templateUrl: './superior.component.html',
  styleUrls: ['./superior.component.css'],
})
export class SuperiorComponent {
  @Output() stateLogin = new EventEmitter<number>();

  productosCarrito: any[] = [];
  private cartItemsSubscription: Subscription;
  login: number;

  constructor(private router: Router, private cartService: CartService, private localstorageService: LocalStorageService, private dataService: DataService, ) {}

  ngOnInit(): void {
    this.validadorSesion()
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

  Login(){
    this.router.navigateByUrl('/InicioSesion');
  }

  Logout(){
    this.localstorageService.removeItem();
    this.login = 0;
    this.router.navigateByUrl('/Principal');
    window.location.reload();
  }

  validadorSesion(){
    let dataUser = this.localstorageService.getItem();
    if(dataUser == null){
      this.login = 0;
    }else{
      if(dataUser != null && dataUser.rol == "estandar"){
        this.login = 1;
        this.stateLogin.emit(this.login);
        this.dataService.sendData(dataUser);
      }else{
        this.login = 2;
        this.stateLogin.emit(this.login);
        this.dataService.sendData(dataUser);
      }
    }
  }
  
}
