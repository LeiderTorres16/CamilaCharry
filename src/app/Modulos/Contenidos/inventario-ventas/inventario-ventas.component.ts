import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Prenda } from 'src/app/Models/prenda_class';
import { Venta } from 'src/app/Models/venta.class';
import { LocalStorageService } from 'src/app/Services/localstorage.service';
import { PrendasService } from 'src/app/Services/prendas_Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario-ventas',
  templateUrl: './inventario-ventas.component.html',
  styleUrls: ['./inventario-ventas.component.css'],
})
export class InventarioVentasComponent {
  mostrarInventario = false;
  mostrarVentas = false;
  filtroCorreo: string = '';

  productosInventario: any[] = [];
  productosVentas: any[] = [];

  constructor(private prendasService: PrendasService, private router: Router, private localstorageService: LocalStorageService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.productosInventario=[];
    this.productosVentas = [];
    this.mostrarInventario = true;
    this.mostrarVentas = false;
    this.cargarInventario();
    this.cargarVentas();
  }

  agregarVentas(producto: any) {
    this.productosVentas.push(producto);
  }
  agregarInventario(prenda: Prenda) {
    this.productosInventario.push(prenda);
  }

  editarProducto(producto: any) {
    this.productosVentas = [];
    this.productosInventario=[];
    const id = producto.id;
    this.router.navigate(['/EditarPrenda', id]);
  }

  eliminarProducto(producto: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el producto ${producto.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#28A745',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#DC3545',
      preConfirm: async () => {
        const response = await this.prendasService.desactivarPrenda(producto);
        if(response){
          Swal.fire({
            title: 'Se elimino con exito!',
            text: `El producto ${producto.nombre} se elimino`,
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#28A745',
          });
          this.cargarInventario();
        }else{
          Swal.fire({
            title: 'Error!',
            text: "Hubo un error al eliminar la prenda",
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#CAA565',
          });
        }
      },
    });
  }

  cargarInventario() {
    this.productosInventario = []; 
    this.prendasService.allPrendas().subscribe((prendas) => {
      prendas.forEach((prenda) => {
        if(prenda.estado == 'activo'){
          this.agregarInventario(prenda);
        }
      });
    });
  }

  cargarVentas() {
    this.productosVentas = []; 
    this.prendasService.getVentas().subscribe((ventas) => {
      ventas.forEach((venta) => {
        this.agregarVentas(venta);
      });
    });
  }

  navigateToReferencia(referencia: number) {
    this.router.navigate(['/Referencia', referencia]);
  }

  getImageUrl(producto: any): string {
    if (producto.imagen && producto.imagen.length > 0) {
      return producto.imagen[0];
    } else {
      return '';
    }
  }

  obtenerCorreosClientes(): string[] {
    const correos: string[] = [];
    this.productosVentas.forEach((venta) => {
        if (venta?.usuario?.correo && !correos.includes(venta.usuario.correo)) {
            correos.push(venta.usuario.correo);
        }
    });
    return correos;
}

filtrarVentasPorCorreo(correoSeleccionado: string) {
  this.filtroCorreo = correoSeleccionado;

  // Si no se ha seleccionado ningún correo, muestra todas las ventas
  if (!this.filtroCorreo) {
      this.cargarVentas();
      return;
  }

  // Filtra las ventas por el correo seleccionado
  this.productosVentas = this.productosVentas.filter((venta) => venta?.usuario?.correo === this.filtroCorreo);
}



}
