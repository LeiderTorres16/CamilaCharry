import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './Modulos/principal/principal.component';
import { HeaderComponent } from './Modulos/header/header.component';
import { FooterComponent } from './Modulos/footer/footer.component';

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
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase )),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }