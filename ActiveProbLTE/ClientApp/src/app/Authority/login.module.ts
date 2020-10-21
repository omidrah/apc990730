import { sharedModule } from './../Shared/shared.modules';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { NgModule } from "@angular/core";

@NgModule({
  declarations:[
      LoginComponent
  ],
  exports:[],
  imports:[
    sharedModule,  
    LoginRoutingModule
  ]  
})

export class LoginModule{}
