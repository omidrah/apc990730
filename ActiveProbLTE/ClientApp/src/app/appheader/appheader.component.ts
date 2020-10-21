import { Component, OnInit } from '@angular/core';
import { User } from '../Shared/models/user';
import { AuthenticationService } from '../Shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  user: User;
  constructor(private auth: AuthenticationService, private route: Router) {

    //auth.getLoggedInUser.subscribe(user => this.setUser(user));

    this.setUser(JSON.parse(sessionStorage.getItem("currentUser")));
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.route.navigate(['login']);
  }

  private setUser(user: User): void {
    this.user = user;
  }
}
