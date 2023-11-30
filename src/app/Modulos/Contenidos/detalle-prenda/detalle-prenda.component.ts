import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { PrendasService } from 'src/app/Services/prendas_Service';
import { Prenda } from 'src/app/Models/prenda_class';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart_service';

@Component({
  selector: 'app-detalle-prenda',
  templateUrl: './detalle-prenda.component.html',
  styleUrls: ['./detalle-prenda.component.css'],
})
export class DetallePrendaComponent implements OnInit, AfterViewInit {
  prenda: Prenda;
  prendaId: string;
  mostrarPersonalizacion = false;
  precioFinal: number;
  imagenesPrenda: string[] = [];
  currentIndex: number = 0;
  autoChangeInterval: any;

  cuelloSeleccionado: string = 'Ninguno';
  mangaSeleccionada: string = 'Ninguno';
  estampadoSeleccionado: string = 'Ninguno';
  encajeSeleccionado: string = 'Ninguno';
  botonSeleccionado: string = 'Ninguno';
  doblezSeleccionado: string = 'Ninguno';
  constructor(
    private route: ActivatedRoute,

    private prendasService: PrendasService,

    private cartService: CartService,
    private el: ElementRef
  ) {}

  addToCart(prenda: Prenda): void {
    this.actualizarPrecio();

    const listaAtributos = [
      this.cuelloSeleccionado,
      this.mangaSeleccionada,
      this.estampadoSeleccionado,
      this.encajeSeleccionado,
      this.botonSeleccionado,
      this.doblezSeleccionado,
    ].filter((valor) => valor !== null);
    prenda.precio = this.precioFinal;
    prenda.personalizacion = listaAtributos;

    this.cartService.addToCart(prenda);
  }

  ngAfterViewInit() {
    const miSection = this.el.nativeElement.querySelector('#miSection');

    if (miSection) {
      miSection.addEventListener('transitionend', () => {
        // Realiza el desplazamiento hacia la sección una vez que la transición ha terminado
        if (this.mostrarPersonalizacion) {
          miSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  ngOnInit(): void {
    const prendaId = this.route.snapshot.paramMap.get('id')!;
    window.scrollTo(0, 0);
    this.prendasService.getPrendaPorId(prendaId).subscribe((prenda) => {
      if (prenda) {
        this.prenda = prenda;
        this.precioFinal = Number(prenda.precio);
        prenda.imagen.forEach((imagen) => {
          this.imagenesPrenda.push(imagen);
        });
      } else {
        console.log('noprenda');
      }
    });

    this.autoChangeInterval = setInterval(() => {
      this.siguienteImagen();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.autoChangeInterval) {
      clearInterval(this.autoChangeInterval);
    }
  }

  cerrarPersonalizacion() {
    this.mostrarPersonalizacion = false;
    window.scrollTo(0, 0);
  }

  abrirPersonalizacion() {
    // Cambia el estado para mostrar o ocultar el div
    this.mostrarPersonalizacion = true;

    // Si se muestra el div, realiza el desplazamiento hacia él
    if (this.mostrarPersonalizacion) {
      const miSection = document.getElementById('personalizacion');

      if (miSection) {
        setTimeout(() => {
          miSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }

  actualizarPrecio(): void {
    this.precioFinal = Number(this.prenda.precio);

    if (this.cuelloSeleccionado !== 'Ninguno') {
      this.precioFinal += 20000;
    }
    if (this.mangaSeleccionada !== 'Ninguno') {
      this.precioFinal += 25000;
    }
    if (this.estampadoSeleccionado !== 'Ninguno') {
      this.precioFinal += 24000;
    }
    if (this.encajeSeleccionado !== 'Ninguno') {
      this.precioFinal += 30000;
    }
    if (this.botonSeleccionado !== 'Ninguno') {
      this.precioFinal += 10000;
    }
    if (this.doblezSeleccionado !== 'Ninguno') {
      this.precioFinal += 15000;
    }
  }

  siguienteImagen() {
    this.currentIndex = (this.currentIndex + 1) % this.imagenesPrenda.length;
  }

  imagenAnterior() {
    this.currentIndex =
      (this.currentIndex - 1 + this.imagenesPrenda.length) %
      this.imagenesPrenda.length;
  }

  trackByFn(index: number, item: string) {
    return index; // Puedes usar un identificador único si lo tienes
  }
}
