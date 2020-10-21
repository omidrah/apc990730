var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthenticationService } from './Shared/services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
var AppComponent = /** @class */ (function () {
    function AppComponent(auth, route) {
        this.auth = auth;
        this.route = route;
        this.route.events.subscribe(function (e) {
            if (e instanceof NavigationEnd) {
                window.dispatchEvent(new Event('resize'));
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.logoutSubsc = this.auth.currentUser.subscribe(function (data) {
            if (data) {
                _this.isAuthenticate = true;
            }
            else {
                _this.isAuthenticate = false;
            }
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.logoutSubsc.unsubscribe();
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html'
        }),
        __metadata("design:paramtypes", [AuthenticationService, Router])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map