import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrendasService } from 'src/app/Services/prendas_Service';

@Component({
  selector: 'app-referencia',
  templateUrl: './referencia.component.html',
  styleUrls: ['./referencia.component.css'],
})
export class ReferenciaComponent implements OnInit {
  referencia: number;
  venta: any; // Aquí almacenarás los datos de la venta específica

  constructor(
    private route: ActivatedRoute,
    private prendasService: PrendasService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const referenciaParam = params.get('referencia');
      if (referenciaParam !== null) {
        this.referencia = parseInt(referenciaParam);
        // Realiza la consulta a Firebase para obtener los datos de la venta específica
        this.prendasService.getVentaPorReferencia(this.referencia).subscribe((venta) => {
          this.venta = venta;
        });
      } else {
        // Manejo de error o acción si 'referencia' es nulo
      }
    });
  }
  
}
