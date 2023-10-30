import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  shouldDisplayTop: boolean = true;
  shouldDisplayFooter: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.shouldDisplayTop = !['/InicioSesion', '/Registro'].includes(event.url);
        this.shouldDisplayFooter = !['/InicioSesion', '/Registro'].includes(event.url);
      }
    });
  }
}
