var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@angular/core";
var StorageService = /** @class */ (function () {
    function StorageService() {
    }
    StorageService.prototype.getSession = function (key) {
        var data = window.sessionStorage.getItem(key);
        return JSON.parse(data);
    };
    StorageService.prototype.setSession = function (key, value) {
        var data = value === undefined ? null : JSON.stringify(value);
        window.sessionStorage.setItem(key, data);
    };
    StorageService.prototype.removeSession = function (key) {
        window.sessionStorage.removeItem(key);
    };
    StorageService.prototype.removeAllSessions = function () {
        for (var key in window.sessionStorage) {
            if (window.sessionStorage.hasOwnProperty(key)) {
                this.removeSession(key);
            }
        }
    };
    /*************/
    StorageService.prototype.getLocal = function (key) {
        var data = window.localStorage.getItem(key);
        return JSON.parse(data);
    };
    StorageService.prototype.setLocal = function (key, value) {
        var data = value === undefined ? null : JSON.stringify(value);
        window.localStorage.setItem(key, data);
    };
    StorageService.prototype.removeLocal = function (key) {
        window.localStorage.removeItem(key);
    };
    StorageService.prototype.removeAllLocals = function () {
        for (var key in window.localStorage) {
            if (window.localStorage.hasOwnProperty(key)) {
                this.removeLocal(key);
            }
        }
    };
    StorageService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], StorageService);
    return StorageService;
}());
export { StorageService };
//# sourceMappingURL=storage.service.js.map