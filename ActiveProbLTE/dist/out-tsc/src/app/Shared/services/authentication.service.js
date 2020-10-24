var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { APP_CONFIG } from '../config';
import { BrowserStorageService } from './browser-storage.service';
import { TokenStoreService } from './token-store.service';
import { RefreshTokenService } from './refresh-token.service';
import { AuthTokenType } from '../models/auth-token-type';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(storageService, http, router, tokenStoreService, refreshTokenService, appConfig) {
        this.storageService = storageService;
        this.http = http;
        this.router = router;
        this.tokenStoreService = tokenStoreService;
        this.refreshTokenService = refreshTokenService;
        this.appConfig = appConfig;
        this.currentUserSubject = new BehaviorSubject(false);
        this.currentUser = this.currentUserSubject.asObservable();
        this.updateStatusOnPageRefresh();
        this.refreshTokenService.scheduleRefreshToken(this.isAuthUserLoggedIn(), false);
    }
    AuthenticationService.prototype.updateStatusOnPageRefresh = function () {
        this.currentUserSubject.next(this.isAuthUserLoggedIn()); //init behavior
    };
    AuthenticationService.prototype.login = function (u) {
        var _this = this;
        var headers = new HttpHeaders({ "Content-Type": "application/json" });
        return this.http.post('api/user/authenticate', u, { headers: headers })
            .pipe(map(function (user) {
            _this.storageService.setLocal("RememberMe", u.rememberMe);
            if (!user) {
                console.error("There is no `{'" + _this.appConfig.accessTokenObjectKey +
                    "':'...','" + _this.appConfig.refreshTokenObjectKey + "':'...value...'}` response after login.");
                _this.currentUserSubject.next(false);
                return false;
            }
            _this.tokenStoreService.storeLoginSession(user);
            console.log("Logged-in user info", _this.getAuthUser());
            _this.refreshTokenService.scheduleRefreshToken(true, true);
            _this.currentUserSubject.next(true);
            return true;
        }));
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        var headers = new HttpHeaders({ "Content-Type": "application/json" });
        var refreshToken = encodeURIComponent(this.tokenStoreService.getRawAuthToken(AuthTokenType.RefreshToken));
        return this.http.post('api/user/logoff?refreshToken=' + refreshToken, { headers: headers })
            .pipe(map(function (res) { return res || {}; }), catchError(function (error) { return throwError(error); }), finalize(function () {
            _this.tokenStoreService.deleteAuthTokens();
            _this.refreshTokenService.unscheduleRefreshToken(true);
            _this.currentUserSubject.next(false);
            _this.router.navigate(["/login"]);
        }))
            .subscribe(function (result) {
            console.log("logout", result);
        });
    };
    AuthenticationService.prototype.isAuthUserLoggedIn = function () {
        return this.tokenStoreService.hasStoredAccessAndRefreshTokens() &&
            !this.tokenStoreService.isAccessTokenTokenExpired();
    };
    AuthenticationService.prototype.getBearerAuthHeader = function () {
        return new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken)
        });
    };
    AuthenticationService.prototype.getAuthUser = function () {
        if (!this.isAuthUserLoggedIn()) {
            return null;
        }
        var decodedToken = this.tokenStoreService.getDecodedAccessToken();
        var roles = this.tokenStoreService.getDecodedTokenRoles();
        return Object.freeze({
            userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
            userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            displayName: decodedToken["DisplayName"],
            roles: roles
        });
    };
    AuthenticationService.prototype.isAuthUserInRoles = function (requiredRoles) {
        var user = this.getAuthUser();
        if (!user || !user.roles) {
            return false;
        }
        if (user.roles.indexOf(this.appConfig.adminRoleName.toLowerCase()) >= 0) {
            return true; // The `Admin` role has full access to every pages.
        }
        return requiredRoles.some(function (requiredRole) {
            if (user.roles) {
                return user.roles.indexOf(requiredRole.toLowerCase()) >= 0;
            }
            else {
                return false;
            }
        });
    };
    AuthenticationService.prototype.isAuthUserInRole = function (requiredRole) {
        return this.isAuthUserInRoles([requiredRole]);
    };
    AuthenticationService = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(5, Inject(APP_CONFIG)),
        __metadata("design:paramtypes", [BrowserStorageService,
            HttpClient, Router,
            TokenStoreService,
            RefreshTokenService, Object])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map