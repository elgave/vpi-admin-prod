import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Admin } from '../models/Admin/Admin';
import { AdminService } from '../service/admin/admin.service';

@Component({
  selector: 'app-administradorAlta',
  templateUrl: './administradorAlta.component.html',
  styleUrls: ['./administradorAlta.component.css']
})
export class AdministradorAltaComponent implements OnInit {

  email: string = '';
  password: string = '';
  admin: Admin;
  errMsj: string;

  constructor(
    private toastr : ToastrService,
    private adminService : AdminService
    
  ) { }

  ngOnInit() {
  }

  registroAdmin(){
    this.admin = new Admin(this.email, this.password);
    this.adminService.registarAdmin(this.admin).subscribe(
      data=> {
      this.toastr.success('Cuenta creada con exito', '',{
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      },
      err=>{
        this.errMsj = err.error;
        this.toastr.error(this.errMsj, '',{
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err);
      }
    );
  }

}
