import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RechazoRest } from 'src/app/models/Restaurante/RechazoRest';
import { Restaurante } from 'src/app/models/Restaurante/Restaurante';
import { BusquedaUsuario } from 'src/app/models/usuario/busquedaUsuario';
import { Usuario } from '../../models/usuario/usuario';
import { Admin } from '../../models/Admin/Admin';
import { EliminarUsuario } from 'src/app/models/usuario/eliminarUsuario';
import { Menu } from 'src/app/models/Restaurante/Menu';
import { RestauranteMasVentas } from 'src/app/models/Restaurante/RestauranteMasVentas';
import { RestauranteCali } from 'src/app/models/Restaurante/RestauranteCali';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  Base = environment.baseadmin;
  authURL = this.Base
  
  constructor(private httpClient: HttpClient) { }
  
  
  public getRestaurantesPendientes(): Observable<Restaurante[]> {
    return this.httpClient.get<Restaurante[]>( `${this.authURL+'restaurantesPendientes'}`);
  }

  public aprobarRest(idRestaurante: string): Observable<string> {
    return this.httpClient.post<string>(this.authURL + 'aprobarRestaurante', idRestaurante);
  }

  public rechazarRest(rechazo: RechazoRest): Observable<RechazoRest> {
    return this.httpClient.post<RechazoRest>(this.authURL + 'rechazarRestaurante', rechazo);
  }

  public listarUsuarios(usuarioBusqueda: BusquedaUsuario): Observable<Usuario[]> {
    return this.httpClient.post<Usuario[]>(this.authURL + 'usuariosBusqueda', usuarioBusqueda);
  }
  
  public bloquearRest(bloqueo: RechazoRest): Observable<string> {
    return this.httpClient.post<string>(this.authURL + 'bloquearRestaurante', bloqueo);
  }

  public bloquearCliente(bloqueo: RechazoRest): Observable<string> {
    return this.httpClient.post<string>(this.authURL + 'bloquearCliente', bloqueo);
  }

  public eliminarUsuario(usuario: EliminarUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'eliminarUsuario', usuario);
  }

  public registarAdmin(admin: Admin): Observable<Admin> {
    return this.httpClient.post<Admin>(this.authURL + 'registroAdmin', admin);
  }

  public getDatosRestaurante(nombreRestaurante: string): Observable<Restaurante> {
    return this.httpClient.get<Restaurante>( `${this.authURL+'getDatosRestaurante?nombreRestaurante='}${nombreRestaurante}`);
  }

  public getMenusRestaurante(nombreRest: string): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>( `${this.authURL+'getMenusRestaurante?nombreRestaurante='}${nombreRest}`);
  }

  public calificarVPI(idRestaurante: string): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'calificacionVPI', idRestaurante);
  }

  public getRestaurantes(): Observable<Restaurante[]> {
    return this.httpClient.get<Restaurante[]>( `${this.authURL+'getRestaurantes'}`);
  }

  public restaurantesMasVentas(): Observable<RestauranteMasVentas[]> {
    return this.httpClient.get<RestauranteMasVentas[]>( `${this.authURL}restaurantesMasVentas`);
  }

  public restaurantesMejorCalificados(): Observable<RestauranteCali[]> {
    return this.httpClient.get<RestauranteCali[]>( `${this.authURL}restaurantesMejorVPI`);
  }

  public restaurantesMejorTiempo(): Observable<RestauranteCali[]> {
    return this.httpClient.get<RestauranteCali[]>( `${this.authURL}restaurantesMejorTiempo`);
  }

  public restaurantesMejorCaliCliente(): Observable<RestauranteCali[]> {
    return this.httpClient.get<RestauranteCali[]>( `${this.authURL}restaurantesMejorCali`);
  }

  
  }
  
