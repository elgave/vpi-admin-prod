import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private router : Router

  ) { }

  ngOnInit() {
  }

  onLogOut(): void{
    this.tokenService.logOut();
    this.router.navigate(['/login']);
    
  }

}
