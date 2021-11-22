import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioNuevo } from '../models/usuario/usuario-nuevo';
import { Observable } from 'rxjs';
import { UsuarioLogin } from '../models/usuario/usuario-login';
import { JwtDto } from '../models/usuario/jwt-dto';
import { NuevoRestaurante } from '../models/Restaurante/NuevoRestaurante';
import { NuevoMenu } from '../models/Restaurante/NuevoMenu';
import { Restaurante } from '../models/Restaurante/Restaurante';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Base = environment.baseauth;
  authURL = this.Base
  authURL2 = 'http://localhost:8282/cliente/'
  
constructor(private httpClient: HttpClient) { }

public login(usuarioLogin: UsuarioLogin): Observable<JwtDto>{
  return this.httpClient.post<JwtDto>(this.authURL + 'Login', usuarioLogin);
}


}
