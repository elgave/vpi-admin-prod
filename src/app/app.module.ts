import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { TokenService } from './service/token.service';
import { AuthService } from './service/auth.service';
import { InterceptorService, interceptorProvider } from './service/interceptor/interceptor.service';
import { ChangePasswordComponent } from './changePassword/change-password/change-password.component';
import { SendEmailComponent } from './changePassword/send-email/send-email.component';
import { FooterComponent } from './footer/footer.component';


import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AdministradorRestaurantesComponent } from './administradorRestaurantes/administradorRestaurantes.component';
import { AdministradorAltaComponent } from './administradorAlta/administradorAlta.component';
import { AdministradorUsuariosComponent } from './administradorUsuarios/administradorUsuarios.component';
import { RegistroRestauranteDetalleComponent } from './registroRestauranteDetalle/registroRestauranteDetalle.component';




@NgModule({
  declarations: [								
    AppComponent,
    LoginComponent,
    ChangePasswordComponent,
    SendEmailComponent,
    FooterComponent,
    HomeComponent,
    NavMenuComponent,
    AdministradorRestaurantesComponent,
    AdministradorRestaurantesComponent,
    AdministradorAltaComponent,
    RegistroRestauranteDetalleComponent,
    AdministradorUsuariosComponent,
      RegistroRestauranteDetalleComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
