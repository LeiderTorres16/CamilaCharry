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
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire/compat/";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { DetallePrendaComponent } from './Modulos/Contenidos/detalle-prenda/detalle-prenda.component';
import {CloudinaryModule} from '@cloudinary/ng';
import { ImageUploaderDirective } from './Services/image_directive';
import { HttpClientModule } from '@angular/common/http';
import { InventarioVentasComponent } from './Modulos/Contenidos/inventario-ventas/inventario-ventas.component';


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
    DetallePrendaComponent,
    ImageUploaderDirective,
    InventarioVentasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CloudinaryModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase )),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }