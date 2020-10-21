import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './../Shared/models/user';
import { Component,  OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../Shared/services/authentication.service';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {  
  isExpanded = false;   
  user:User;
  constructor(private auth:AuthenticationService,private route:Router) {
    this.user = JSON.parse(sessionStorage.getItem("currentUser"));        
  }
  collapse() {
    this.isExpanded = false;
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logout(){
    this.auth.logout();  
    this.route.navigate(['login']);
  }
}
