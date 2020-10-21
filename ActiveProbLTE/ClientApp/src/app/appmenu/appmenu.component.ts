import { Component, OnInit } from '@angular/core';
import { User } from '../Shared/models/user';
import { ConfigService } from '../Shared/services/config.service';
import { Configurations } from '../Shared/models/Configurations';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../Shared/services/authentication.service';
import { LanguageService } from '../Shared/services/Language.service';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {

  user: User;
  config : Configurations;
  time: string;

  constructor(
    private auth: AuthenticationService,
    private _config: ConfigService,
    private langServvice: LanguageService
  ) {
    
    //auth.getLoggedInUser.subscribe(user => this.setUser(user));

    this.setUser(JSON.parse(sessionStorage.getItem("currentUser")));
  }


  ngOnInit() {
    this._config.currentConfigurations.subscribe(a => {
      this.config = a;
    });

    this._config.getTime().subscribe(t => {

      this.time = this.langServvice.convertShortDate(t);
    });
  }

  private setUser(user: User): void {
    this.user = user;
  }
}
