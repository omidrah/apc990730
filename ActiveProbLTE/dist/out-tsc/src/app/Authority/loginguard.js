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
import { ToastrService } from 'ngx-toastr';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Shared/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
var LoginGruard = /** @class */ (function () {
    function LoginGruard(router, toast, auth, translate, baseUrl) {
        this.router = router;
        this.toast = toast;
        this.auth = auth;
        this.translate = translate;
        this.permissionObjectKey = "permission";
    }
    LoginGruard.prototype.canActivate = function (route, state) {
        var RouteData = route.data;
        var returnUrl = state.url;
        return this.hasAuthUserAccessToThisRoute(RouteData, returnUrl);
    };
    LoginGruard.prototype.canActivateChild = function (childRoute, state) {
        var RouteData = childRoute.data;
        var returnUrl = state.url;
        return this.hasAuthUserAccessToThisRoute(RouteData, returnUrl);
    };
    LoginGruard.prototype.canLoad = function (route) {
        if (route.data) {
            var permissionData = route.data[this.permissionObjectKey];
            var returnUrl = "/" + route.path;
            return this.hasAuthUserAccessToThisRoute(permissionData, returnUrl);
        }
        else {
            return true;
        }
    };
    LoginGruard.prototype.hasAuthUserAccessToThisRoute = function (permissionData, returnUrl) {
        if (!this.auth.isAuthUserLoggedIn()) {
            this.showAccessDenied(returnUrl);
            return false;
        }
        var TokenHelp = this.auth.getDecodedAccessToken();
        ;
        if (this.auth.isAuthUserInRole("Admin")) {
            return true;
        }
        if (Array.isArray(permissionData.deniedRoles) && Array.isArray(permissionData.permittedRoles)) {
            throw new Error("Don't set both 'deniedRoles' and 'permittedRoles' in route data.");
        }
        if (Array.isArray(permissionData.permittedRoles)) {
            var isInRole = this.auth.isAuthUserInRoles(permissionData.permittedRoles);
            if (isInRole) {
                return true;
            }
            this.showAccessDenied(returnUrl);
            return false;
        }
        if (Array.isArray(permissionData.deniedRoles)) {
            var isInRole = this.auth.isAuthUserInRoles(permissionData.deniedRoles);
            if (!isInRole) {
                return true;
            }
            this.showAccessDenied(returnUrl);
            return false;
        }
        return true;
    };
    LoginGruard.prototype.showAccessDenied = function (returnUrl) {
        this.router.navigate(['/login'], { queryParams: { returnURL: returnUrl } });
        this.toast.error(this.translate.instant('NoAccessToThisPage'), this.translate.instant('Warning'));
    };
    LoginGruard = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(4, Inject('BASE_URL')),
        __metadata("design:paramtypes", [Router,
            ToastrService,
            AuthenticationService,
            TranslateService, String])
    ], LoginGruard);
    return LoginGruard;
}());
export { LoginGruard };
//# sourceMappingURL=loginguard.js.map