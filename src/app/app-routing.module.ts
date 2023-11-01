import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './Modulos/principal/principal.component';
import { HomeComponent } from './Modulos/Contenidos/home/home.component';
import { CarritoComponent } from './Modulos/Contenidos/carrito/carrito.component';
import { RegistroPrendaComponent } from './Modulos/Contenidos/registro-prenda/registro-prenda.component';
import { DetallePrendaComponent } from './Modulos/Contenidos/detalle-prenda/detalle-prenda.component';
import { InventarioVentasComponent } from './Modulos/Contenidos/inventario-ventas/inventario-ventas.component';
import { LoginComponent } from './Modulos/Contenidos/login/login.component';
import { RegistroComponent } from './Modulos/Contenidos/registro/registro.component';
import { ReferenciaComponent } from './Modulos/Contenidos/referencia/referencia.component';


const routes: Routes = [
  { path: '', redirectTo: '/Principal', pathMatch: 'full' },
  { path: 'Principal', component: PrincipalComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Carrito', component: CarritoComponent },
  { path: 'RegistroPrenda', component: RegistroPrendaComponent },
  { path: 'DetallePrenda/:id', component: DetallePrendaComponent },
  { path: 'InventarioVentas', component: InventarioVentasComponent },
  { path: 'InicioSesion', component: LoginComponent },
  { path: 'Registro', component: RegistroComponent },
  { path: 'EditarPrenda/:id', component: RegistroPrendaComponent },
  {path: 'Referencia/:referencia', component: ReferenciaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
