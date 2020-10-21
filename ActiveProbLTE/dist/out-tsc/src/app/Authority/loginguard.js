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
        this.myAppUrl = '';
        this.myAppUrl = baseUrl;
    }
    LoginGruard.prototype.canActivate = function (route, state) {
        var _this = this;
        this.logSubc = this.auth.currentUser.subscribe(function (data) { data ? _this.islogged = true : _this.islogged = false; });
        if (this.islogged) {
            //this.router.navigateByUrl(state.url);         
            return true;
        }
        this.router.navigate(['login'], { queryParams: { returnURL: route.url } });
        this.toast.error(this.translate.instant('NoAccessToThisPage'), this.translate.instant('Warning'));
        return false;
    };
    LoginGruard.prototype.ngOnDestroy = function () {
        this.logSubc.unsubscribe();
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