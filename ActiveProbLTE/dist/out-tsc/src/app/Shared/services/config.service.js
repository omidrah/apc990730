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
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { APP_CONFIG } from "../config";
var ConfigService = /** @class */ (function () {
    function ConfigService(_http, appConfig) {
        var _this = this;
        this._http = _http;
        this.appConfig = appConfig;
        this.time = new Observable(function (observer) {
            setInterval(function () { return observer.next(new Date().toString()); }, 1000);
        });
        //Config = new Subject<Configurations>();
        this.currentConfigurationsSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('Configuration')));
        this.currentConfigurations = this.currentConfigurationsSubject.asObservable();
        this._http.get('api/Config/GetAppConfigurations').subscribe(function (a) {
            sessionStorage.setItem('Configuration', JSON.stringify(a));
            //this.Config.next(a);
            _this.currentConfigurationsSubject.next(a);
        });
    }
    ConfigService.prototype.getTime = function () {
        return this.time;
    };
    ConfigService = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(1, Inject(APP_CONFIG)),
        __metadata("design:paramtypes", [HttpClient, Object])
    ], ConfigService);
    return ConfigService;
}());
export { ConfigService };
//# sourceMappingURL=config.service.js.map