import { Component, OnInit } from '@angular/core';
import { PrendasService } from 'src/app/Services/prendas_Service';
import { Prenda } from 'src/app/Models/prenda_class';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-prenda',
  templateUrl: './detalle-prenda.component.html',
  styleUrls: ['./detalle-prenda.component.css']
})
export class DetallePrendaComponent implements OnInit{
  prenda: Prenda;
  prendaId: string;


  constructor(
    private route: ActivatedRoute,

    private prendasService: PrendasService
  ) {}
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
