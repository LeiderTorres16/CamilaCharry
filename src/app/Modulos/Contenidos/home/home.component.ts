import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  productosDestacados: any[] = [];
  productosEspeciales: any[] = [];

  constructor(private prendasService: PrendasService, private router: Router) {

    this.agregarProductoE({
      imagen: '../../../assets/images/c_western-shirt.png',
      nombreProducto: 'Camisa Gris',
      precio: 45.50,
    });

    this.agregarProductoE({
      imagen: '../../../assets/images/c_western-shirt.png',
      nombreProducto: 'Camisa Gris',
      precio: 45.50,
    });

    this.agregarProductoE({
      imagen: '../../../assets/images/c_western-shirt.png',
      nombreProducto: 'Camisa Gris',
      precio: 45.50,
    });
  }

  agregarProducto(prenda: Prenda) {
    this.productosDestacados.push(prenda);
  }

  agregarProductoE(producto: any) {
    this.productosEspeciales.push(producto);

  }
  detallePrenda(){
    this.router.navigateByUrl('/DetallePrenda');
  }

  detallePrenda(prenda: Prenda){
    console.log(prenda.id);
    
    this.router.navigate(['/DetallePrenda', prenda.id]);
  }

  ngOnInit():void{
    this.prendasService.getPrendas().subscribe(prendas=> {
      
      prendas.forEach(prenda => {
        this.agregarProducto(prenda);
      });    
        console.log(prendas);
    })
  }

}
