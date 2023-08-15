import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './Modulos/principal/principal.component';
import { HomeComponent } from './Modulos/Contenidos/home/home.component';
import { CarritoComponent } from './Modulos/Contenidos/carrito/carrito.component';
import { RegistroPrendaComponent } from './Modulos/Contenidos/registro-prenda/registro-prenda.component';
import { DetallePrendaComponent } from './Modulos/Contenidos/detalle-prenda/detalle-prenda.component';

const routes: Routes = [
  {path: '',redirectTo: '/Principal', pathMatch: 'full'},
  {path: 'Principal',component: PrincipalComponent},
  {path: 'Home',component: HomeComponent},
  {path: 'Carrito',component: CarritoComponent},
  {path: 'RegistroPrenda',component: RegistroPrendaComponent},
  { path: 'DetallePrenda/:id', component: DetallePrendaComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
