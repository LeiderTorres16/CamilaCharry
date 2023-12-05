import { Component } from '@angular/core';
import { EmailService } from 'src/app/Services/Email.service';
import { CartService } from 'src/app/Services/cart_service';
import { DataService } from 'src/app/Services/data.service';
import { PrendasService } from 'src/app/Services/prendas_Service';
import { VentaService } from 'src/app/Services/venta_service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { PrendaCarrito } from 'src/app/Models/prendaCarrito.class';
import { Prenda } from 'src/app/Models/prenda_class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  productosCarrito: Prenda[] = [];
  productosCompra: PrendaCarrito[] = [];
  cantidades: number[] = [];
  coloresSeleccionados: string[] = [];
  tallasSeleccionadas: string[] = [];
  totalCarrito: number = 0;
  formatoFechaHora: string;
  data: any;

  constructor(
    private cartService: CartService,
    private prendasService: PrendasService,
    private ventaService: VentaService,
    private dataService: DataService,
    private emailService: EmailService,
    private router: Router,
  ) {
    this.productosCarrito = this.cartService.getItems();
    this.cantidades = new Array(this.productosCarrito.length).fill(1);
    this.actualizarTotal();
  }

  ngOnInit(){
      this.productosCarrito.forEach((producto,i) => {
        this.coloresSeleccionados[i] = producto.colores[0];
        this.tallasSeleccionadas[i] = producto.tallas[0];
      });
  }

  agregarProducto(producto: any, index: number) {
    this.productosCarrito.push({ ...producto });
    this.cantidades.push(1);
    this.actualizarTotal();
  }

  eliminarProducto(index: number) {
    this.productosCarrito.splice(index, 1);
    this.cartService.eliminarProducto(index);
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

  fechaHoraCompra(): string {
    const fechaHoraActual = new Date();
    const year = fechaHoraActual.getFullYear().toString();
    const month = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0');
    const day = fechaHoraActual.getDate().toString().padStart(2, '0');
    const hours = fechaHoraActual.getHours().toString().padStart(2, '0');
    const minutes = fechaHoraActual.getMinutes().toString().padStart(2, '0');

    return `${year}/${month}/${day}  ${hours}:${minutes}`;
  }

  async finalizarCompra() {
    this.dataService.data$.subscribe(async (data) => {
      this.fechaHora();
      this.data = data;


      if (this.data) {
        const referencia = this.formatoFechaHora + data.usr.nombre;

        this.productosCarrito.forEach(async (producto, index) => {
          this.productosCompra.push({
            producto: producto,
            cantidad: this.cantidades[index],
            color: this.coloresSeleccionados[index],
            talla: this.tallasSeleccionadas[index],
            totalProducto: producto.precio * this.cantidades[index],
          });

          await this.prendasService.updateExistencias(
            producto,
            this.cantidades[index]
          );
        });

        const reciboInfo = {
          referencia: referencia,
          user: this.data,
          fechaCompra: this.fechaHoraCompra(),
          productos: this.productosCompra,
          bancoInfo: {
            nombre: 'Bancolombia',
            cuentaN: '52369495445',
          },
        };

        await this.ventaService.addVenta(this.productosCompra);

        this.emailService
          .confirmPurchase(this.data, this.productosCompra)
          .subscribe(
            (response) => {
              this.fechaHora();
              if (response) {
                Swal.fire({
                  title: `Gracias por tu compra -REF221-${referencia}`,
                  text: 'El siguiente paso es descargar tu recibo y consignar el dinero en algunas de las cuentas mencionadas en el recibo',
                  icon: 'success',
                  showCancelButton: true,
                  confirmButtonText: 'Descargar recibo',
                  confirmButtonColor: '#CAA565',
                  cancelButtonText: 'Cerrar',
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.downloadReceipt(reciboInfo, referencia);
                  }
                });

                this.cartService.clearCart();
                this.productosCarrito = [];
              } else {
                Swal.fire({
                  title: 'Error!',
                  text: 'Hubo un error',
                  icon: 'error',
                  confirmButtonText: 'Ok',
                  confirmButtonColor: '#CAA565',
                });

                this.cartService.clearCart();
                this.productosCarrito = [];
              }
            },
            (error) => {
              console.log(error);
              Swal.fire({
                title: 'Error!',
                text: 'Hubo un error',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#CAA565',
              });

              this.cartService.clearCart();
              this.productosCarrito = [];
            }
          );
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'No puedes comprar sin haber iniciado sesion',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#CAA565',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/InicioSesion');
          }
        });
      }
    });
  }

  actualizarCantidad(index: number) {
    this.actualizarTotal();
  }

  getImageUrl(producto: any): string {
    if (producto.imagen && producto.imagen.length > 0) {
      return producto.imagen[0];
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

  // Agregar métodos para actualizar las selecciones de colores y tallas
  actualizarColor(index: number) {
    // Puedes realizar acciones adicionales aquí si es necesario
    console.log('Color seleccionado:', this.coloresSeleccionados[index]);
  }

  actualizarTalla(index: number) {
    // Puedes realizar acciones adicionales aquí si es necesario
    console.log('Talla seleccionada:', this.tallasSeleccionadas[index]);
  }

  private downloadReceipt(reciboInfo: any, referencia: any): void {
    const doc = new jsPDF();
    // Establecer el título del documento PDF
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Recibo de Compra', 10, 20);

    // Agregar detalles del producto
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('Número de referencia de compra:', 10, 30);
    doc.text(reciboInfo.referencia, 90, 30);

    doc.text('Información del usuario:', 10, 40);
    doc.text(
      `${reciboInfo.user.usr.nombre}, ${reciboInfo.user.usr.correo}, ${reciboInfo.user.usr.direccion}`,
      70,
      40
    );

    doc.text('Fecha y hora de la compra:', 10, 50);
    doc.text(reciboInfo.fechaCompra, 80, 50);

    doc.text('Lista de productos:', 10, 60);
    let yPosition = 70;
    reciboInfo.productos.forEach((product: any, index: number) => {
      const cantidad = product.cantidad;

      doc.text(
        `Nombre: ${product.producto.nombre} - Código: ${
          product.producto.id
        } - Cantidad: ${cantidad} - Total: $${
          cantidad * product.producto.precio
        }`,
        20,
        yPosition
      );
      doc.text(`Personalizaciones: ${product.producto.personalizacion}`,20, yPosition+10)
      yPosition += 10;
    });

    doc.text('Información de cuentas para consignar:', 10, yPosition+10);
    doc.text(`Banco: ${reciboInfo.bancoInfo.nombre}`, 20, yPosition + 20);
    doc.text(
      `Número de cuenta: ${reciboInfo.bancoInfo.cuentaN}`,
      20,
      yPosition + 30
    );

    // Guardar el PDF en un Blob
    const pdfBlob = doc.output('blob');

    // Crear un enlace HTML y disparar un clic en él para iniciar la descarga del PDF
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = `recibo_compra_${referencia}.pdf`;
    link.click();

    // Libera el objeto URL creado
    window.URL.revokeObjectURL(link.href);
  }
}
