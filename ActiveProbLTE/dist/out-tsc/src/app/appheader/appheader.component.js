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
import { AuthenticationService } from '../Shared/services/authentication.service';
import { Router } from '@angular/router';
var AppheaderComponent = /** @class */ (function () {
    function AppheaderComponent(auth, route) {
        //auth.getLoggedInUser.subscribe(user => this.setUser(user));
        this.auth = auth;
        this.route = route;
        this.setUser(JSON.parse(sessionStorage.getItem("currentUser")));
    }
    AppheaderComponent.prototype.ngOnInit = function () {
    };
    AppheaderComponent.prototype.logout = function () {
        this.auth.logout();
        this.route.navigate(['login']);
    };
    AppheaderComponent.prototype.setUser = function (user) {
        this.user = user;
    };
    AppheaderComponent = __decorate([
        Component({
            selector: 'app-appheader',
            templateUrl: './appheader.component.html',
            styleUrls: ['./appheader.component.css']
        }),
        __metadata("design:paramtypes", [AuthenticationService, Router])
    ], AppheaderComponent);
    return AppheaderComponent;
}());
export { AppheaderComponent };
//# sourceMappingURL=appheader.component.js.map