var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { AuthTokenType } from "../models/auth-token-type";
import { Router } from "@angular/router";
//interceptor in any requset set AccessToken for use in server 
var AuthenticationInterceptor = /** @class */ (function () {
    function AuthenticationInterceptor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthenticationInterceptor.prototype.intercept = function (req, next) {
        var accessToken = this.auth.getRawAuthToken(AuthTokenType.AccessToken);
        if (accessToken) {
            req = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + accessToken)
            });
            return next.handle(req);
            //.catch((error: any) => {
            //  if (error.status === 401 || error.status === 403) {
            //    this.router.navigate(["/login"]);
            //  }
            //  return Observable.throw(error);
            //});
        }
        else {
            //reoute to login page
            return next.handle(req);
        }
    };
    AuthenticationInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AuthenticationService, Router])
    ], AuthenticationInterceptor);
    return AuthenticationInterceptor;
}());
export { AuthenticationInterceptor };
//# sourceMappingURL=authentication.interceptor.js.map