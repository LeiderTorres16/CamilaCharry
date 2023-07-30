import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './Modulos/principal/principal.component';
import { HomeComponent } from './Modulos/Contenidos/home/home.component';

const routes: Routes = [
  {path: '',redirectTo: '/Principal', pathMatch: 'full'},
  {path: 'Principal',component: PrincipalComponent},
  {path: 'Home',component: HomeComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
