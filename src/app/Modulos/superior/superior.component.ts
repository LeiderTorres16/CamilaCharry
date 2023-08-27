import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superior',
  templateUrl: './superior.component.html',
  styleUrls: ['./superior.component.css'],
})
export class SuperiorComponent {
  constructor(private router: Router) {}

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
