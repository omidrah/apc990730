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
import { Injectable, Inject } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { StorageService } from "./storage.service";
import { AuthTokenType } from "../models/auth-token-type";
import { APP_CONFIG } from "../config";
var TokenStoreService = /** @class */ (function () {
    function TokenStoreService(browserStorageService, appConfig) {
        this.browserStorageService = browserStorageService;
        this.appConfig = appConfig;
        this.rememberMeToken = "rememberMe_token";
    }
    TokenStoreService.prototype.getRawAuthToken = function (tokenType) {
        if (this.rememberMe()) {
            return this.browserStorageService.getLocal(AuthTokenType[tokenType]);
        }
        else {
            return this.browserStorageService.getSession(AuthTokenType[tokenType]);
        }
    };
    TokenStoreService.prototype.getDecodedAccessToken = function () {
        return jwt_decode(this.getRawAuthToken(AuthTokenType.AccessToken));
    };
    TokenStoreService.prototype.getAuthUserDisplayName = function () {
        return this.getDecodedAccessToken().DisplayName;
    };
    TokenStoreService.prototype.getAccessTokenExpirationDateUtc = function () {
        var decoded = this.getDecodedAccessToken();
        if (decoded.exp === undefined) {
            return null;
        }
        var date = new Date(0); // The 0 sets the date to the epoch
        date.setUTCSeconds(decoded.exp);
        return date;
    };
    TokenStoreService.prototype.isAccessTokenTokenExpired = function () {
        var expirationDateUtc = this.getAccessTokenExpirationDateUtc();
        if (!expirationDateUtc) {
            return true;
        }
        return !(expirationDateUtc.valueOf() > new Date().valueOf());
    };
    TokenStoreService.prototype.deleteAuthTokens = function () {
        if (this.rememberMe()) {
            this.browserStorageService.removeLocal(AuthTokenType[AuthTokenType.AccessToken]);
            this.browserStorageService.removeLocal(AuthTokenType[AuthTokenType.RefreshToken]);
        }
        else {
            this.browserStorageService.removeSession(AuthTokenType[AuthTokenType.AccessToken]);
            this.browserStorageService.removeSession(AuthTokenType[AuthTokenType.RefreshToken]);
        }
        this.browserStorageService.removeLocal(this.rememberMeToken);
    };
    TokenStoreService.prototype.setToken = function (tokenType, tokenValue) {
        if (this.isEmptyString(tokenValue)) {
            console.error(AuthTokenType[tokenType] + " is null or empty.");
        }
        if (tokenType === AuthTokenType.AccessToken && this.isEmptyString(tokenValue)) {
            throw new Error("AccessToken can't be null or empty.");
        }
        if (this.rememberMe()) {
            this.browserStorageService.setLocal(AuthTokenType[tokenType], tokenValue);
        }
        else {
            this.browserStorageService.setSession(AuthTokenType[tokenType], tokenValue);
        }
    };
    TokenStoreService.prototype.getDecodedTokenRoles = function () {
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
    TokenStoreService.prototype.storeLoginSession = function (response) {
        this.setToken(AuthTokenType.AccessToken, response[this.apiConfigService.configuration.accessTokenObjectKey]);
        this.setToken(AuthTokenType.RefreshToken, response[this.apiConfigService.configuration.refreshTokenObjectKey]);
    };
    TokenStoreService.prototype.rememberMe = function () {
        return this.browserStorageService.getLocal(this.rememberMeToken) === true;
    };
    TokenStoreService.prototype.setRememberMe = function (value) {
        this.browserStorageService.setLocal(this.rememberMeToken, value);
    };
    TokenStoreService.prototype.hasStoredAccessAndRefreshTokens = function () {
        var accessToken = this.getRawAuthToken(AuthTokenType.AccessToken);
        var refreshToken = this.getRawAuthToken(AuthTokenType.RefreshToken);
        return !this.isEmptyString(accessToken) && !this.isEmptyString(refreshToken);
    };
    TokenStoreService.prototype.isEmptyString = function (value) {
        return !value || 0 === value.length;
    };
    TokenStoreService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject(APP_CONFIG)),
        __metadata("design:paramtypes", [StorageService, Object])
    ], TokenStoreService);
    return TokenStoreService;
}());
export { TokenStoreService };
//# sourceMappingURL=Token.service.js.map