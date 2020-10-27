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
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { BrowserStorageService } from './browser-storage.service';
import * as jwt_decode from "jwt-decode";
import { AuthTokenType } from '../models/auth-token-type';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(storageService, http, router) {
        this.storageService = storageService;
        this.http = http;
        this.router = router;
        this.currentUserSubject = new BehaviorSubject(false);
        this.currentUser = this.currentUserSubject.asObservable();
        this.updateStatusOnPageRefresh();
    }
    AuthenticationService.prototype.updateStatusOnPageRefresh = function () {
        this.currentUserSubject.next(this.isAuthUserLoggedIn());
    };
    AuthenticationService.prototype.login = function (u) {
        var _this = this;
        return this.http.post('api/user/Authenticate', u)
            .pipe(map(function (res) {
            _this.setRememberMe(u.rememberMe);
            if (!res) {
                _this.currentUserSubject.next(false);
                return false;
            }
            _this.storeLoginSession(res);
            _this.currentUserSubject.next(true);
            return true;
        }), catchError(function (error) { return throwError(error); }));
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        var headers = new HttpHeaders({ "Content-Type": "application/json" });
        var refreshToken = encodeURIComponent(this.getRawAuthToken(AuthTokenType.RefreshToken));
        return this.http.post('api/user/LogOff?refreshToken=' + refreshToken, { headers: headers })
            .pipe(map(function (res) { return res || {}; }), catchError(function (error) { return throwError(error); }), finalize(function () {
            _this.currentUserSubject.next(false);
            _this.router.navigate(["/login"]);
        }))
            .subscribe(function (result) {
            console.log("logout", result);
        });
    };
    AuthenticationService.prototype.setRememberMe = function (value) {
        this.storageService.setLocal("rememberMe", value);
    };
    AuthenticationService.prototype.storeLoginSession = function (response) {
        this.setToken(AuthTokenType.AccessToken, response["access_token"]);
        this.setToken(AuthTokenType.RefreshToken, response["refresh_token"]);
    };
    AuthenticationService.prototype.setToken = function (tokenType, tokenValue) {
        if (this.isEmptyString(tokenValue)) {
            console.error(AuthTokenType[tokenType] + " is null or empty.");
        }
        if (tokenType === AuthTokenType.AccessToken && this.isEmptyString(tokenValue)) {
            throw new Error("AccessToken can't be null or empty.");
        }
        if (this.rememberMe()) {
            this.storageService.setLocal(AuthTokenType[tokenType], tokenValue);
        }
        else {
            this.storageService.setSession(AuthTokenType[tokenType], tokenValue);
        }
    };
    AuthenticationService.prototype.rememberMe = function () {
        return this.storageService.getLocal("rememberMe") === true;
    };
    AuthenticationService.prototype.isEmptyString = function (value) {
        return !value || 0 === value.length;
    };
    AuthenticationService.prototype.isAuthUserLoggedIn = function () {
        return this.hasStoredAccessAndRefreshTokens() &&
            !this.isAccessTokenTokenExpired();
    };
    AuthenticationService.prototype.hasStoredAccessAndRefreshTokens = function () {
        var accessToken = this.getRawAuthToken(AuthTokenType.AccessToken);
        var refreshToken = this.getRawAuthToken(AuthTokenType.RefreshToken);
        return !this.isEmptyString(accessToken) && !this.isEmptyString(refreshToken);
    };
    AuthenticationService.prototype.isAccessTokenTokenExpired = function () {
        var expirationDateUtc = this.getAccessTokenExpirationDateUtc();
        if (!expirationDateUtc) {
            return true;
        }
        return !(expirationDateUtc.valueOf() > new Date().valueOf());
    };
    AuthenticationService.prototype.getAccessTokenExpirationDateUtc = function () {
        var decoded = this.getDecodedAccessToken();
        if (decoded.exp === undefined) {
            return null;
        }
        var date = new Date(0); // The 0 sets the date to the epoch
        date.setUTCSeconds(decoded.exp);
        return date;
    };
    AuthenticationService.prototype.getDecodedAccessToken = function () {
        var dd = jwt_decode(this.getRawAuthToken(AuthTokenType.AccessToken));
        return dd;
    };
    AuthenticationService.prototype.getBearerAuthHeader = function () {
        return new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.getRawAuthToken(AuthTokenType.AccessToken)
        });
    };
    AuthenticationService.prototype.getDecodedTokenRoles = function () {
        var decodedToken = this.getDecodedAccessToken();
        var roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if (!roles) {
            return null;
        }
        if (Array.isArray(roles)) {
            return roles.map(function (role) { return role.toLowerCase(); });
        }
        else {
            return [roles.toLowerCase()];
        }
    };
    AuthenticationService.prototype.deleteAuthTokens = function () {
        if (this.rememberMe()) {
            this.storageService.removeLocal(AuthTokenType[AuthTokenType.AccessToken]);
            this.storageService.removeLocal(AuthTokenType[AuthTokenType.RefreshToken]);
        }
        else {
            this.storageService.removeSession(AuthTokenType[AuthTokenType.AccessToken]);
            this.storageService.removeSession(AuthTokenType[AuthTokenType.RefreshToken]);
        }
        this.storageService.removeLocal("rememberMe");
    };
    AuthenticationService.prototype.getRawAuthToken = function (tokenType) {
        if (this.rememberMe()) {
            return this.storageService.getLocal(AuthTokenType[tokenType]);
        }
        else {
            return this.storageService.getSession(AuthTokenType[tokenType]);
        }
    };
    AuthenticationService.prototype.getAuthUserDisplayName = function () {
        return this.getDecodedAccessToken().DisplayName;
    };
    AuthenticationService.prototype.getAuthUser = function () {
        if (!this.isAuthUserLoggedIn()) {
            return null;
        }
        var decodedToken = this.getDecodedAccessToken();
        var roles = this.getDecodedTokenRoles();
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
        if (user.roles.indexOf("Admin".toLowerCase()) >= 0) {
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
        __metadata("design:paramtypes", [BrowserStorageService, HttpClient, Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map