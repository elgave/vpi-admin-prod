import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { UsuarioLogin } from 'src/app/models/usuario/usuario-login';
import { ToastrService } from 'ngx-toastr';
import { Email } from 'src/app/models/usuario/email';
import { EmailPasswordService } from 'src/app/service/email-password.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  usuarioLogin : UsuarioLogin;
  email: string;
  password: string; 
  roles : string[] =[];
  errMsj: string;
  resetearPass = false;
  dto: Email;
  isAdmin: boolean = false;

  constructor(
    private tokenService : TokenService,
    private authService : AuthService,
    private router : Router,
    private toastr : ToastrService,
    private emailPasswordService: EmailPasswordService
  ) { }


  ngOnInit() {
    console.log('token: ' + this.tokenService.getToken())
    if (this.tokenService.getToken()){
      console.log('paso el if del token')
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
      this.router.navigate(['/home']);
    }
  }

  onLogin():void{
    this.usuarioLogin = new UsuarioLogin(this.email, this.password);
    this.authService.login(this.usuarioLogin).subscribe(
      data=> {

        this.tokenService.setAuthorities(data.authorities);
        this.roles = this.tokenService.getAuthorities();
        this.roles.forEach( rol=>{
          if(rol === 'Admin'){
            this.isAdmin = true; 
          }
        })
        if(this.isAdmin){
          this.isLogged = true;
          
          this.tokenService.setToken(data.token);
          this.tokenService.setUsername(data.email);
          
          this.roles = data.authorities;
          this.toastr.success('Va pa i '+ data.email, '',{
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.router.navigate(['/home']);
          console.log(data);
        }else{
          this.isLogged = false;   
          this.toastr.error('Usuario con credenciales invalidas para el tipo de aplicacion', '',{
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          sessionStorage.clear();
        }
      },
      err=>{
        this.isLogged = false;   
        this.toastr.error(err.error, '',{
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err.error);
      }
    );
  }

  ResetPass():void{
    if(this.resetearPass == false)
      this.resetearPass = true;
    else
    this.resetearPass = false;
  }

  onSendEmail():void{
    this.dto = new Email(this.email);
    this.emailPasswordService.sendEmail(this.dto).subscribe(
      data =>{
        this.toastr.success('Correo enviado', '', {
          timeOut : 3000 , positionClass: 'toast-top-center',
        });
        this.router.navigate(['/cambioContraseña']);
      },
      err => {
        this.toastr.error(err.error , '',{
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err);
      }
    )

  }

}

