import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Prenda } from 'src/app/Models/prenda_class';
import { Venta } from 'src/app/Models/venta.class';
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

  productosInventario: Prenda[] = [];
  productosVentas: Venta[] = [];

  constructor(private prendasService: PrendasService, private router: Router) {}

  ngOnInit(): void {
    this.productosInventario=[];
    this.productosVentas = [];
    this.mostrarInventario = true;
    this.mostrarVentas = false;
    this.cargarInventario();
    this.cargarVentas();
  }

  agregarVentas(producto: Venta) {
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
        if(response == "Prenda eliminada con exito"){
          Swal.fire({
            title: 'Se elimino con exito!',
            text: `El producto ${producto.nombre} se elimino`,
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#28A745',
          });
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
    this.prendasService.getPrendas().subscribe((prendas) => {
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
    if (producto.imagenes && producto.imagenes.length > 0) {
      return producto.imagenes[0];
    } else {
      return '';
    }
  }


}
