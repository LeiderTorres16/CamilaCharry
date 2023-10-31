import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css',
    '../../../assets/css/main.css',
    '../../../assets/bootstrap-5.0.2-dist/css/bootstrap.min.css',
  ],
})
export class HeaderComponent {
  // En tu componente
  items = [
    {
      title: 'Nueva Colección 2023',
      buttonText: 'Ver aquí',
      backgroundImage: '../../../assets/images/daniele-franchi-GbAEJUJKJ88-unsplash.jpg',
    },
    {
      title: 'Aprende de los cuidados del lino',
      buttonText: 'Ver aquí',
      backgroundImage: '../../../assets/images/hannah-morgan-ycVFts5Ma4s-unsplash.jpg',
    },
    // Agrega más elementos según sea necesario
  ];
}
