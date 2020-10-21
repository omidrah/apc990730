import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthenticationService } from './Shared/services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public isAuthenticate:boolean;
  logoutSubsc: Subscription;

  constructor(
    private auth: AuthenticationService, private route: Router
  ) {
    this.route.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        window.dispatchEvent(new Event('resize'));
      }
    });
  }

  ngOnInit(){
    this.logoutSubsc = this.auth.currentUser.subscribe((data)=>{
        if(data){          
          this.isAuthenticate = true;          
        }else{
          this.isAuthenticate =false;
        }
    });
  }
  ngOnDestroy(){
    this.logoutSubsc.unsubscribe();
  }
}
