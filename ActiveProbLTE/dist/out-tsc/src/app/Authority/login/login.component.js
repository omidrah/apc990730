var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../Shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, authenticationService, toastrService, translate) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.toastrService = toastrService;
        this.translate = translate;
        this.submitted = false;
        this.u = {
            username: "",
            password: "",
            rememberMe: false
        };
        // redirect to home if already logged in
        if (this.authenticationService.currentUser) {
            this.router.navigate(['/']);
        }
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [true]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        //reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        get: function () { return this.loginForm.controls; },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.u.username = this.f.username.value;
        this.u.password = this.f.password.value;
        this.u.rememberMe = this.f.rememberMe.value;
        this.authenticationService.login(this.u)
            .subscribe(function (isLoggedIn) {
            if (isLoggedIn) {
                if (_this.returnUrl) {
                    _this.router.navigate([_this.returnUrl]);
                }
                else {
                    _this.router.navigate(["/"]);
                }
                //this.toastrService.success('Success login', 'Welcome!', { timeOut: 2000 });
            }
            else {
                //this.toastrService.warning('WrongUsernameOrPassword', 'Warning');            
                _this.toastrService.warning(_this.translate.instant('WrongUsernameOrPassword'), _this.translate.instant('Warning'));
            }
        }, function (error) {
            console.log("Login error", error);
            //this.toastrService.warning('{{WrongUsernameOrPassword | translate}}', 'Warning');
            if (error.status === 401) {
                console.log("Invalid User name or Password. Please try again.");
            }
            else {
                console.log(error.statusText + ": " + error.message);
            }
            _this.toastrService.warning(_this.translate.instant('WrongUsernameOrPassword'), _this.translate.instant('Warning'));
        });
    };
    LoginComponent.prototype.changeLangage = function (lang) {
        var language = localStorage.getItem('Language');
        if (lang !== language) {
            localStorage.setItem('Language', lang);
            window.location.reload();
            //  this.languageService.changeLangage(lang);
        }
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            encapsulation: ViewEncapsulation.None,
        }),
        __metadata("design:paramtypes", [FormBuilder,
            ActivatedRoute,
            Router,
            AuthenticationService,
            ToastrService,
            TranslateService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map