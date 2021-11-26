import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GuardService as guard} from './service/guard/guard.service';
import { SendEmailComponent } from './changePassword/send-email/send-email.component';
import { ChangePasswordComponent } from './changePassword/change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { AdministradorRestaurantesComponent } from './administradorRestaurantes/administradorRestaurantes.component';
import { AdministradorAltaComponent } from './administradorAlta/administradorAlta.component';
import { AdministradorUsuariosComponent } from './administradorUsuarios/administradorUsuarios.component';
import { RegistroRestauranteDetalleComponent } from './registroRestauranteDetalle/registroRestauranteDetalle.component';




const routes: Routes = [
  /*pantallas*/  
  /****/
  {path: 'home', component: HomeComponent, canActivate: [guard], data:{expectedRol: ['Admin']}},
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cambioContraseña', component: ChangePasswordComponent},
  {path: 'restaurantes', component: AdministradorRestaurantesComponent, canActivate: [guard], data:{expectedRol: ['Admin']}},
  {path: 'altaAdministrador', component: AdministradorAltaComponent, canActivate: [guard], data:{expectedRol: ['Admin']}},
  {path: 'usuarios', component: AdministradorUsuariosComponent, canActivate: [guard], data:{expectedRol: ['Admin']}},
  {path: 'restauranteDetalle/:nombreRest', component: RegistroRestauranteDetalleComponent, canActivate: [guard], data:{expectedRol: ['Admin']}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
