import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../service/admin/admin.service';
import { BusquedaUsuario } from 'src/app/models/usuario/busquedaUsuario';
import { Usuario } from '../models/usuario/usuario';
import { RechazoRest } from '../models/Restaurante/RechazoRest';
import { Restaurante } from '../models/Restaurante/Restaurante';
import { EliminarUsuario } from '../models/usuario/eliminarUsuario';

@Component({
  selector: 'app-administradorUsuarios',
  templateUrl: './administradorUsuarios.component.html',
  styleUrls: ['./administradorUsuarios.component.css']
})
export class AdministradorUsuariosComponent implements OnInit {

  busquedaUsuario: BusquedaUsuario;
  isCliente: boolean;
  isBloqueado: boolean;
  textoBusqueda: string
  usuarios: Usuario[] = [];
  seleccionado: string = "Clientes";
  capturado: string;
  marked = false;
  theCheckbox = false;
  restBloq: RechazoRest;
  usuarioSeleccionado: Usuario;
  motivo: string = '';
  ready: boolean;
  eliUsu:EliminarUsuario;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
  ) { }
  
  ngOnInit() {
    this.isCliente = true;
    this.isBloqueado = false;
    this.textoBusqueda = "";
    this.seleccionado = '1';
    this.ready = false;
    this.cargarRest();
  }

  cargarRest() {
    this.busquedaUsuario = new BusquedaUsuario(this.isCliente, this.isBloqueado, this.textoBusqueda);
    this.adminService.listarUsuarios(this.busquedaUsuario).subscribe(
      data => {
        this.usuarios = data;  
      },
      err => {
        console.log(err);
      }
    );
  }

  capturar() {
    this.capturado = this.seleccionado;
    if (this.capturado === "2")
      this.isCliente = false;
      else
      this.isCliente = true;

      this.cargarRest();
  }

  capturarBloqueado(e:any){
    this.marked= e.target.checked;
    this.cargarRest();
  }

  seleccionar(res: Usuario){
    this.ready = true;
    this.usuarioSeleccionado = res;

  }

  bloquearUsuario(){
    this.restBloq = new RechazoRest(this.usuarioSeleccionado.email, this.motivo)
    if(!this.isCliente){  
    this.adminService.bloquearRest(this.restBloq).subscribe(
      data=> {
        this.toastr.success('Restaurante bloqueado con exito', '',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log(data);
        this.cargarRest();
        this.motivo = '';
        },
        err=>{
         this.toastr.error( 'error', '',{
            timeOut: 3000, positionClass: 'toast-top-center',
        });
         this.cargarRest();
        }
      );
    }
    else{
      this.adminService.bloquearCliente(this.restBloq).subscribe(
        data=> {
          this.toastr.success('Cliente bloqueado con exito', '',{
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          console.log(data);
          this.cargarRest();
          this.motivo = '';
          },
          err=>{
           this.toastr.error( 'error', '',{
              timeOut: 3000, positionClass: 'toast-top-center',
          });
           this.cargarRest();
          }
        );

    }
    }

    onKey(event: any) { 
      this.textoBusqueda = event.target.value;
      this.cargarRest();
    }

    eliminarUsuario(){
      if(!this.isCliente){  
         this.eliUsu = new EliminarUsuario(false,this.usuarioSeleccionado.email);
          
      }else{
        this.eliUsu = new EliminarUsuario(true,this.usuarioSeleccionado.email);
      }

      this.adminService.eliminarUsuario(this.eliUsu).subscribe(
        data=>{
          
          this.toastr.success('Usuario eliminado con exito', '',{
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarRest();
        }
      )

    }
   

}
