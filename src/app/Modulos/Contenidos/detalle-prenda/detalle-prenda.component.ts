import { Component, OnInit } from '@angular/core';
import { PrendasService } from 'src/app/Services/prendas_Service';
import { Prenda } from 'src/app/Models/prenda_class';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart_service';

@Component({
  selector: 'app-detalle-prenda',
  templateUrl: './detalle-prenda.component.html',
  styleUrls: ['./detalle-prenda.component.css']
})
export class DetallePrendaComponent implements OnInit{
  prenda: Prenda;
  prendaId: string;
  mostrarPersonalizacion = false;

  cuelloSeleccionado: string = 'Ninguno';
  mangaSeleccionada: string = 'Ninguno';
  estampadoSeleccionado: string = 'Ninguno';
  encajeSeleccionado: string = 'Ninguno';
  botonSeleccionado: string = 'Ninguno';
  doblezSeleccionado: string = 'Ninguno';
  constructor(
    private route: ActivatedRoute,

    private prendasService: PrendasService,

    private cartService: CartService
  ) {}

  addToCart(prenda: Prenda): void {
     let precioFinal = this.prenda.precio;
    if (this.cuelloSeleccionado !== 'Ninguno') {
      precioFinal += 20000;
    }
    if (this.mangaSeleccionada !== 'Ninguno') {
      precioFinal += 25000;
    }
    if (this.estampadoSeleccionado !== 'Ninguno') {
      precioFinal += 24000;
    }
    if (this.encajeSeleccionado !== 'Ninguno') {
      precioFinal += 30000;
    }
    if (this.botonSeleccionado !== 'Ninguno') {
      precioFinal += 10000;
    }
    if (this.doblezSeleccionado !== 'Ninguno') {
      precioFinal += 15000;
    }
    const listaAtributos = [
      this.cuelloSeleccionado,
      this.mangaSeleccionada,
      this.estampadoSeleccionado,
      this.encajeSeleccionado,
      this.botonSeleccionado,
      this.doblezSeleccionado,
    ].filter(valor => valor !== null);
    prenda.precio = precioFinal;
    prenda.personalizacion = listaAtributos;

    this.cartService.addToCart(prenda);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.prendaId = params['id']; 
      console.log('PRENDA ID:', this.prendaId);
      
      this.prendasService.getPrendaPorId(this.prendaId).subscribe(prenda => {
        if (prenda) {
          this.prenda = prenda;
          console.log(this.prenda.id);
        } else {
          console.log('noprenda');
        }
      });
      
    });
  }
}
