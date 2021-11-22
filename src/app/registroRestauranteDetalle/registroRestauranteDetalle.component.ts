import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { RechazoRest } from '../models/Restaurante/RechazoRest';
import { Restaurante } from '../models/Restaurante/Restaurante';
import { AdminService } from '../service/admin/admin.service';
import { Menu } from '../models/Restaurante/Menu';

@Component({
  selector: 'app-registroRestauranteDetalle',
  templateUrl: './registroRestauranteDetalle.component.html',
  styleUrls: ['./registroRestauranteDetalle.component.scss']
})
export class RegistroRestauranteDetalleComponent implements OnInit {

  restaurantes: Restaurante[] = [];
  ready: boolean;
  restauranteSeleccionado: Restaurante;
  rechazo: RechazoRest;
  motivo: string = '';
  nombreRestaurante: string;
  restaurante: Restaurante;
  s3Url: string = environment.s3url;
  menus: Menu[] = [];

  constructor(
    private adminService: AdminService, 
    private toastr: ToastrService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    ) {

    
   }

  ngOnInit() {
    this.ready = false;
    this.nombreRestaurante = this.activatedRoute.snapshot.params['nombreRest'];
    this.cargarDatosRest();
    this.cargarMenus();

  }

  cargarDatosRest() {
    this.adminService.getDatosRestaurante(this.nombreRestaurante).subscribe(
    data => {
      this.restaurante = data;  
    },
    err => {
      console.log(err);
    }
  );
}

seleccionar(){

}

cargarMenus(): void {
  this.adminService.getMenusRestaurante(this.nombreRestaurante).subscribe(
    data => {
      this.menus = data;
  },
    err => {
      console.log(err);
    }
  );
}
  

  aprobarRestaurante(){
    this.adminService.aprobarRest(this.restaurante.email).subscribe(
      data=> {
        this.toastr.success('Restaurante aprobado con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log(data);
        this.router.navigate(['/restaurantes']);
        },
        err=>{
          this.toastr.error( 'error', '',{
            timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/restaurantes']);
        }
      );
    }

  rechazarRestaurante(){
    this.rechazo = new RechazoRest(this.restaurante.email, this.motivo)  
    this.adminService.rechazarRest(this.rechazo).subscribe(
      data=> {
        this.toastr.success('Restaurante rechazado con exito con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        
        this.router.navigate(['/restaurantes']);
        },
        err=>{
          this.toastr.error( 'error', '',{
            timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/restaurantes']);
        }
      );
    }

}
