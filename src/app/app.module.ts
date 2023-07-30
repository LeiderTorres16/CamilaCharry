import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './Modulos/principal/principal.component';
import { HeaderComponent } from './Modulos/header/header.component';
import { FooterComponent } from './Modulos/footer/footer.component';
import { HomeComponent } from './Modulos/Contenidos/home/home.component';
import { SuperiorComponent } from './Modulos/superior/superior.component';
import { CarritoComponent } from './Modulos/Contenidos/carrito/carrito.component';
import { FormsModule } from '@angular/forms';
import { RegistroPrendaComponent } from './Modulos/Contenidos/registro-prenda/registro-prenda.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SuperiorComponent,
    RegistroPrendaComponent,
    CarritoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
