import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../Shared/services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  isLoggedIn = false;
  displayName= '';
  constructor(private auth: AuthenticationService, private route: Router) { }

  ngOnInit() {
    this.subscription = this.auth.currentUser.subscribe(st => {
      this.isLoggedIn = st;
      if (st) {
        let NCuser = this.auth.getAuthUserDisplayName();
        this.displayName = NCuser ? NCuser: "";
      }
    });
  }
  ngOnDestroy() {    
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.auth.logout();
    this.route.navigate(['login']);
  }
}
