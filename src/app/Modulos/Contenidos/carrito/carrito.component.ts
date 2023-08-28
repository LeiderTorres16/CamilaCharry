import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart_service';
import { PrendasService } from 'src/app/Services/prendas_Service';
import { VentaService } from 'src/app/Services/venta_service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  productosCarrito: any[] = [];
  cantidades: number[] = []; 
  totalCarrito: number = 0;
  formatoFechaHora: string;

  constructor(private cartService: CartService,private prendasService: PrendasService, private ventaService:VentaService) {
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
    this.cartService.eliminarProducto(index);
 
    this.actualizarTotal();
  }


  fechaHora(){
    const fechaHoraActual = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    
    const formatter = new Intl.DateTimeFormat('es-ES');
     this.formatoFechaHora = formatter.format(fechaHoraActual);
  }
  async finalizarCompra() {
    const resultado = await this.prendasService.actualizarEstadoEnBaseDeDatos(this.productosCarrito);
    await this.ventaService.addVenta(this.productosCarrito);
    this.fechaHora();
  if ( resultado != 'error') {
    Swal.fire({
      icon: 'success',
      title: `Gracias por tu compra -REF:${this.formatoFechaHora}`,
      text: 'El siguiente paso es consignar a xxxxxxxxxxxxxxxx',
      showConfirmButton: false,
    }); 

    this.cartService.clearCart();
    this.productosCarrito = []
  }else{

  }
  }
  actualizarCantidad(index: number) {
    this.actualizarTotal();
  }

  private actualizarTotal() {
    this.totalCarrito = this.productosCarrito.reduce(
      (total, producto, index) => total + producto.precio * this.cantidades[index],
      0
    );
  }
}
