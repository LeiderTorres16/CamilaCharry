import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Prenda } from 'src/app/Models/prenda_class';
import { PrendasService } from 'src/app/Services/prendas_Service';

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

  editarProducto(producto: any) {}

  eliminarProducto(producto: any) {}

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

  navigateToReferencia(referencia: number){
    this.router.navigate(['/Referencia', referencia]);
  }

  ngOnInit(): void {
    this.mostrarInventario = true;
    this.mostrarVentas = false;
    this.cargarInventario();
    this.cargarVentas();
  }
}
