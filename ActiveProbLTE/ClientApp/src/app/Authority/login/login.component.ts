import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../Shared/services/authentication.service';
import { User } from './../../Shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;      
   u:User  = {
    username: "",
    password: "",
    rememberMe: false
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,
    private translate: TranslateService,
    ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUser) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe:[true]
    });
  }
  ngOnInit() {
    //reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.u.username = this.f.username.value;
    this.u.password = this.f.password.value;
    this.u.rememberMe = this.f.rememberMe.value;
   this.authenticationService.login(this.u)      
     .subscribe(isLoggedIn  => {
          if (isLoggedIn) {
            if (this.returnUrl) {
              this.router.navigate([this.returnUrl]);
            }
            else {
              this.router.navigate(["/"]);              
            }
            //this.toastrService.success('Success login', 'Welcome!', { timeOut: 2000 });
          }
          else {
            //this.toastrService.warning('WrongUsernameOrPassword', 'Warning');            
            this.toastrService.warning(this.translate.instant('WrongUsernameOrPassword'), this.translate.instant('Warning'));
          }
        },
        error => {
          console.log("Login error", error);
          //this.toastrService.warning('{{WrongUsernameOrPassword | translate}}', 'Warning');
          if (error.status === 401) {
               console.log("Invalid User name or Password. Please try again.");
          } else {
                console.log(`${error.statusText}: ${error.message}`);
          }
          this.toastrService.warning(this.translate.instant('WrongUsernameOrPassword'), this.translate.instant('Warning'));
        });
  }

  changeLangage(lang: string) {

    var language = localStorage.getItem('Language');
    if (lang !== language) {

      localStorage.setItem('Language', lang);
      window.location.reload();
      //  this.languageService.changeLangage(lang);
    }
  }
}
