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
import { ConfigService } from '../Shared/services/config.service';
import { AuthenticationService } from '../Shared/services/authentication.service';
import { LanguageService } from '../Shared/services/Language.service';
var AppmenuComponent = /** @class */ (function () {
    function AppmenuComponent(auth, _config, langServvice) {
        //auth.getLoggedInUser.subscribe(user => this.setUser(user));
        this.auth = auth;
        this._config = _config;
        this.langServvice = langServvice;
        this.setUser(JSON.parse(sessionStorage.getItem("currentUser")));
    }
    AppmenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._config.currentConfigurations.subscribe(function (a) {
            _this.config = a;
        });
        this._config.getTime().subscribe(function (t) {
            _this.time = _this.langServvice.convertShortDate(t);
        });
    };
    AppmenuComponent.prototype.setUser = function (user) {
        this.user = user;
    };
    AppmenuComponent = __decorate([
        Component({
            selector: 'app-appmenu',
            templateUrl: './appmenu.component.html',
            styleUrls: ['./appmenu.component.css']
        }),
        __metadata("design:paramtypes", [AuthenticationService,
            ConfigService,
            LanguageService])
    ], AppmenuComponent);
    return AppmenuComponent;
}());
export { AppmenuComponent };
//# sourceMappingURL=appmenu.component.js.map