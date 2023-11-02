import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart_service';
import { DataService } from 'src/app/Services/data.service';
import { PrendasService } from 'src/app/Services/prendas_Service';
import { VentaService } from 'src/app/Services/venta_service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  productosCarrito: any[] = [];
  cantidades: number[] = [];
  totalCarrito: number = 0;
  formatoFechaHora: string;
  data: any;

  constructor(
    private cartService: CartService,
    private prendasService: PrendasService,
    private ventaService: VentaService,
    private dataService: DataService
  ) {
    this.productosCarrito = this.cartService.getItems();
    this.cantidades = new Array(this.productosCarrito.length).fill(1);
    this.actualizarTotal();
  }

  agregarProducto(producto: any, index: number) {
    this.productosCarrito.push({ ...producto });
    this.cantidades.push(1);
    this.actualizarTotal();
  }

  eliminarProducto(index: number) {
    this.productosCarrito.splice(index, 1);
    this.cantidades.splice(index, 1);
    this.actualizarTotal();
  }

  fechaHora() {
    const fechaHoraActual = new Date();
    const year = fechaHoraActual.getFullYear().toString();
    const month = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0');
    const day = fechaHoraActual.getDate().toString().padStart(2, '0');
    const hours = fechaHoraActual.getHours().toString().padStart(2, '0');
    const minutes = fechaHoraActual.getMinutes().toString().padStart(2, '0');

    this.formatoFechaHora = year + month + day + hours + minutes;
  }
  async finalizarCompra() {
    this.dataService.data$.subscribe(async (data) => {
      this.data = data;
      if (this.data) {
        await this.ventaService.addVenta(this.productosCarrito);
        this.fechaHora();

        Swal.fire({
          icon: 'success',
          title: `Gracias por tu compra -REF:${this.formatoFechaHora+data.id}`,
          text: 'El siguiente paso es consignar a xxxxxxxxxxxxxxxx',
          showConfirmButton: false,
        });

        this.cartService.clearCart();
        this.productosCarrito = [];
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'No puedes comprar sin haber iniciado sesion',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#CAA565',
        });
      }
    });
  }

  actualizarCantidad(index: number) {
    this.actualizarTotal();
  }

  getImageUrl(producto: any): string {
    if (producto.imagenes && producto.imagenes.length > 0) {
      return producto.imagenes[0];
    } else {
      return '';
    }
  }

  private actualizarTotal() {
    this.totalCarrito = this.productosCarrito.reduce(
      (total, producto, index) =>
        total + producto.precio * this.cantidades[index],
      0
    );
  }
}
