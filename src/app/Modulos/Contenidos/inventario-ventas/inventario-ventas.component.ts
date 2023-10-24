import { Component } from '@angular/core';
import { Prenda } from 'src/app/Models/prenda_class';
import { PrendasService } from 'src/app/Services/prendas_Service';

@Component({
  selector: 'app-inventario-ventas',
  templateUrl: './inventario-ventas.component.html',
  styleUrls: ['./inventario-ventas.component.css']
})
export class InventarioVentasComponent{
  mostrarInventario = false;
  mostrarVentas = false;
  
  // Aquí podrías agregar la lógica para cargar productos de inventario y ventas
  productosEspeciales: any[] = []; // Agrega tus productos aquí
  productosDestacados: any[] = [];

  constructor(private prendasService: PrendasService) {
  }

  agregarProductoE(producto: any) {
    this.productosEspeciales.push(producto);
  }
  agregarProducto(prenda: Prenda) {
    this.productosDestacados.push(prenda);
  }
  
  editarProducto(producto: any){

  }

  eliminarProducto(producto: any){

  }



  ngOnInit():void{
    this.mostrarInventario = true; // Inicialmente mostrar el inventario
    this.mostrarVentas = false; 

    this.prendasService.getPrendas().subscribe(prendas=> {
      
    
      prendas.forEach(prenda => {
        if(prenda.estado == 'activo'){
          this.agregarProducto(prenda);
        }else{
          this.agregarProductoE(prenda);

        }
      });    
        console.log(prendas);
    })
  }
}
