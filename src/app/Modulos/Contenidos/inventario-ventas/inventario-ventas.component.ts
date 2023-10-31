import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Prenda } from 'src/app/Models/prenda_class';
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

  productosInventario: any[] = [];
  productosVentas: any[] = [];

  constructor(private prendasService: PrendasService, private router: Router) {}

  agregarVentas(producto: any) {
    this.productosVentas.push(producto);
  }
  agregarInventario(prenda: Prenda) {
    this.productosInventario.push(prenda);
  }

  editarProducto(producto: any) {
    let nombre: string = producto.nombre;
    let precio: string = producto.precio;
    let existencias: number = producto.existencias;
    
    Swal.fire({
      title: `Editar Producto ${producto.id}`,
      html:
        `<input id="nombre" class="swal2-input" placeholder="Nombre" value="${producto.nombre}">` +
        `<input id="precio" class="swal2-input" placeholder="Precio" value="${producto.precio}">` +
        `<input id="existencias" class="swal2-input" placeholder="Existencias" value="${producto.existencias}">`,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#28A745',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#DC3545',
      showLoaderOnConfirm: true,
      didOpen: () => {
        const nombreInput = document.getElementById(
          'nombre'
        ) as HTMLInputElement;
        const precioInput = document.getElementById(
          'precio'
        ) as HTMLInputElement;
        const existenciasInput = document.getElementById(
          'existencias'
        ) as HTMLInputElement;

        nombreInput.addEventListener('input', () => {
          nombre = nombreInput.value;
        });

        precioInput.addEventListener('input', () => {
          precio = precioInput.value;
        });

        existenciasInput.addEventListener('input', () => {
          existencias = parseInt(existenciasInput.value);
        });
      },
      preConfirm: () => {
        console.log({
          name: nombre,
          price: precio,
          exis: existencias
        })
      },
    });
  }


  
  eliminarProducto(producto:any) {

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el producto ${producto.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      confirmButtonColor: '#28A745',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#DC3545',
      preConfirm: () => {

        Swal.fire({
          title: 'Se elimino con exito!',
          text: `El producto ${producto.nombre} se elimino`,
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#28A745',
        });
      }
    });
  }
  
  

  cargarInventario() {
    this.prendasService.getPrendas().subscribe((prendas) => {
      prendas.forEach((prenda) => {
        this.agregarInventario(prenda);
      });
    });
  }

  cargarVentas() {
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

  

  ngOnInit(): void {
    this.mostrarInventario = true;
    this.mostrarVentas = false;
    this.cargarInventario();
    this.cargarVentas();
  }
}
