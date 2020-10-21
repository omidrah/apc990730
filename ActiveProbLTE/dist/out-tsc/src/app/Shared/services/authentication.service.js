var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(storageService, http, router) {
        this.storageService = storageService;
        this.http = http;
        this.router = router;
        this.currentUserSubject = new BehaviorSubject(false);
        this.currentUser = this.currentUserSubject.asObservable();
        this.updateStatus();
    }
    AuthenticationService.prototype.updateStatus = function () {
        this.currentUserSubject.next(true); //this.isLoggedIn());
    };
    AuthenticationService.prototype.login = function (u) {
        var _this = this;
        var headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this.http.post('api/user/authenticate', u, { headers: headers })
            .pipe(map(function (user) {
            _this.storageService.setLocal("RememberMe", u.rememberMe);
            if (!user) {
                _this.currentUserSubject.next(false);
                return false;
            }
            _this.storageService.setSession('currentUser', JSON.stringify(user));
            _this.currentUserSubject.next(true);
            return true;
        }));
    };
    AuthenticationService.prototype.logout = function () {
        this.storageService.removeSession('currentUser');
        this.currentUserSubject.next(false);
        this.router.navigate(["/login"]);
    };
    AuthenticationService.prototype.updateStatusOnPageRefresh = function () {
        this.currentUserSubject.next(this.isAuthUserLoggedIn());
    };
    AuthenticationService.prototype.isAuthUserLoggedIn = function () {
        var data = this.storageService.getSession('currentUser');
        return true;
    };
    AuthenticationService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [StorageService, HttpClient, Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map