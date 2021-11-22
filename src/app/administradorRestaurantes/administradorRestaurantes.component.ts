import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Restaurante } from '../models/Restaurante/Restaurante';
import { AdminService } from '../service/admin/admin.service';
import { RechazoRest } from '../models/Restaurante/RechazoRest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administradorRestaurantes',
  templateUrl: './administradorRestaurantes.component.html',
  styleUrls: ['./administradorRestaurantes.component.css']
})
export class AdministradorRestaurantesComponent implements OnInit {

  restaurantes: Restaurante[] = [];
  ready: boolean;
  restauranteSeleccionado: Restaurante;
  rechazo: RechazoRest;
  motivo: string = '';
  seleccionado: string;
  capturado: string;
  pendientes: boolean = true;


  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private router : Router,
  ) { }

  ngOnInit() {
    this.ready = false;
    this.cargarRestPendientes();
    this.seleccionado = "Pendientes";
    

  }

  cargarRestPendientes() {
    this.adminService.getRestaurantesPendientes().subscribe(
      data => {
        this.restaurantes = data;       
      },
      err => {
        console.log(err);
      }
    );
  }

  seleccionar(res: Restaurante){
    this.ready = true;
    this.restauranteSeleccionado = res;

  }

  aprobarRestaurante(){
    this.adminService.aprobarRest(this.restauranteSeleccionado.email).subscribe(
      data=> {
        this.toastr.success('Restaurante aprobado con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log(data);
        this.cargarRestPendientes();
        },
        err=>{
         this.toastr.error( 'error', '',{
            timeOut: 3000, positionClass: 'toast-top-center',
        });
         this.cargarRestPendientes();
        }
      );
    }

  rechazarRestaurante(){
    this.rechazo = new RechazoRest(this.restauranteSeleccionado.email, this.motivo)  
    this.adminService.rechazarRest(this.rechazo).subscribe(
      data=> {
        this.toastr.success('Restaurante rechazado con exito con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        
        this.cargarRestPendientes();
        },
        err=>{
          this.toastr.error( 'error', '',{
            timeOut: 3000, positionClass: 'toast-top-center',
        });
          this.cargarRestPendientes();
        }
      );
    }

  detalleRest(nombreRest: string):void{
    this.router.navigate(['/restauranteDetalle/',nombreRest]);
  }

  cargarRest() {
    this.adminService.getRestaurantes().subscribe(
      data => {
        this.restaurantes = data;       
      },
      err => {
        console.log(err);
      }
    );
  }

  capturar() {
    this.capturado = this.seleccionado;
    if (this.capturado === "Pendientes"){
      this.pendientes = true;
      this.cargarRestPendientes();
    }else{
      this.pendientes = false;
      this.cargarRest();
    } 
      
  }

  calificar(idRest: string){
    this.adminService.calificarVPI(idRest).subscribe(
      data=> {
        this.toastr.success('Restaurante calificado con exito con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        
        this.cargarRest();
        },
        err=>{ 
          this.toastr.error(err.error, '',{
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          console.log(err.error);
        }
      );
    }

  
    

}
