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
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { throwError, timer } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthTokenType } from "./../models/auth-token-type";
import { APP_CONFIG } from "../config";
import { BrowserStorageService } from "./browser-storage.service";
import { TokenStoreService } from "./token-store.service";
var RefreshTokenService = /** @class */ (function () {
    function RefreshTokenService(tokenStoreService, appConfig, http, browserStorageService) {
        this.tokenStoreService = tokenStoreService;
        this.appConfig = appConfig;
        this.http = http;
        this.browserStorageService = browserStorageService;
        this.refreshTokenTimerCheckId = "is_refreshToken_timer_started";
        this.refreshTokenSubscription = null;
    }
    RefreshTokenService.prototype.scheduleRefreshToken = function (isAuthUserLoggedIn, calledFromLogin) {
        var _this = this;
        this.unscheduleRefreshToken(false);
        if (!isAuthUserLoggedIn) {
            return;
        }
        var expDateUtc = this.tokenStoreService.getAccessTokenExpirationDateUtc();
        if (!expDateUtc) {
            throw new Error("This access token has not the `exp` property.");
        }
        var expiresAtUtc = expDateUtc.valueOf();
        var nowUtc = new Date().valueOf();
        var threeSeconds = 3000;
        // threeSeconds instead of 1 to prevent other tab timers run less than threeSeconds
        var initialDelay = Math.max(threeSeconds, expiresAtUtc - nowUtc - threeSeconds);
        console.log("Initial scheduleRefreshToken Delay(ms)", initialDelay);
        var timerSource$ = timer(initialDelay);
        this.refreshTokenSubscription = timerSource$.subscribe(function () {
            if (calledFromLogin || !_this.isRefreshTokenTimerStartedInAnotherTab()) {
                _this.refreshToken(isAuthUserLoggedIn);
            }
            else {
                _this.scheduleRefreshToken(isAuthUserLoggedIn, false);
            }
        });
        if (calledFromLogin || !this.isRefreshTokenTimerStartedInAnotherTab()) {
            this.setRefreshTokenTimerStarted();
        }
    };
    RefreshTokenService.prototype.unscheduleRefreshToken = function (cancelTimerCheckToken) {
        if (this.refreshTokenSubscription) {
            this.refreshTokenSubscription.unsubscribe();
        }
        if (cancelTimerCheckToken) {
            this.deleteRefreshTokenTimerCheckId();
        }
    };
    RefreshTokenService.prototype.invalidateCurrentTabId = function () {
        if (!this.tokenStoreService.rememberMe()) {
            return;
        }
        //const currentTabId = this.utilsService.getCurrentTabId();
        //const timerStat = this.browserStorageService.getLocal(
        //  this.refreshTokenTimerCheckId
        //);
        //if (timerStat && timerStat.tabId === currentTabId) {
        //  this.setRefreshTokenTimerStopped();
        //}
    };
    RefreshTokenService.prototype.refreshToken = function (isAuthUserLoggedIn) {
        var _this = this;
        var headers = new HttpHeaders({ "Content-Type": "application/json" });
        var model = { refreshToken: this.tokenStoreService.getRawAuthToken(AuthTokenType.RefreshToken) };
        return this.http
            .post(this.appConfig.apiUrl + "/" + this.appConfig.refreshTokenPath, model, { headers: headers })
            .pipe(map(function (response) { return response || {}; }), catchError(function (error) { return throwError(error); }))
            .subscribe(function (result) {
            console.log("RefreshToken Result", result);
            _this.tokenStoreService.storeLoginSession(result);
            // this.deleteRefreshTokenTimerCheckId();
            _this.scheduleRefreshToken(isAuthUserLoggedIn, false);
        });
    };
    RefreshTokenService.prototype.isRefreshTokenTimerStartedInAnotherTab = function () {
        if (!this.tokenStoreService.rememberMe()) {
            return false; // It uses the session storage for the tokens and its access scope is limited to the current tab.
        }
        //const currentTabId = this.utilsService.getCurrentTabId();
        //const timerStat = this.browserStorageService.getLocal(this.refreshTokenTimerCheckId);
        //console.log("RefreshTokenTimer Check", {
        //  refreshTokenTimerCheckId: timerStat,
        //  currentTabId: currentTabId
        //});
        //const isStarted = timerStat && timerStat.isStarted === true && timerStat.tabId !== currentTabId;
        //if (isStarted) {
        //  console.log(`RefreshToken timer has already been started in another tab with tabId=${timerStat.tabId}.
        //  currentTabId=${currentTabId}.`);
        //}
        //return isStarted;
        return true;
    };
    RefreshTokenService.prototype.setRefreshTokenTimerStarted = function () {
        this.browserStorageService.setLocal(this.refreshTokenTimerCheckId, {
            isStarted: true,
        });
    };
    RefreshTokenService.prototype.deleteRefreshTokenTimerCheckId = function () {
        this.browserStorageService.removeLocal(this.refreshTokenTimerCheckId);
    };
    RefreshTokenService.prototype.setRefreshTokenTimerStopped = function () {
        this.browserStorageService.setLocal(this.refreshTokenTimerCheckId, {
            isStarted: false,
            tabId: -1
        });
    };
    RefreshTokenService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Inject(APP_CONFIG)),
        __metadata("design:paramtypes", [TokenStoreService, Object, HttpClient,
            BrowserStorageService])
    ], RefreshTokenService);
    return RefreshTokenService;
}());
export { RefreshTokenService };
//# sourceMappingURL=refresh-token.service.js.map