
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { APP_CONFIG, IAppConfig } from '../config';
import { BrowserStorageService } from './browser-storage.service';
import { TokenStoreService } from './token-store.service';
import { RefreshTokenService } from './refresh-token.service';
import { AuthTokenType } from '../models/auth-token-type';
import { AuthUser } from '../models/AuthUser';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  
  private currentUserSubject = new BehaviorSubject<boolean>(false);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private storageService: BrowserStorageService,
    private http: HttpClient, private router: Router,
    private tokenStoreService: TokenStoreService,
    private refreshTokenService: RefreshTokenService,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
  ) {
    
    this.updateStatusOnPageRefresh();
    this.refreshTokenService.scheduleRefreshToken(this.isAuthUserLoggedIn(), false);
  }

  private updateStatusOnPageRefresh(): void {
    this.currentUserSubject.next(this.isAuthUserLoggedIn()); //init behavior
  }

  login(u: User) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post<any>('api/user/authenticate', u, { headers: headers })
      .pipe(map(user => {
        this.storageService.setLocal("RememberMe",u.rememberMe);
        if (!user) {
          console.error("There is no `{'" + this.appConfig.accessTokenObjectKey +
            "':'...','" + this.appConfig.refreshTokenObjectKey + "':'...value...'}` response after login.");
          this.currentUserSubject.next(false);
          return false;
        }
        this.tokenStoreService.storeLoginSession(user);
        console.log("Logged-in user info", this.getAuthUser());
        this.refreshTokenService.scheduleRefreshToken(true, true);
        this.currentUserSubject.next(true);
        return true;
      }));
  }
  logout() {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const refreshToken = encodeURIComponent(this.tokenStoreService.getRawAuthToken(AuthTokenType.RefreshToken));

    return this.http.post<any>('api/user/logoff?refreshToken=' + refreshToken, { headers: headers })
      .pipe(
        map(res => res || {}),
        catchError((error: HttpErrorResponse) => throwError(error)),
        finalize(() => {
          this.tokenStoreService.deleteAuthTokens();
          this.refreshTokenService.unscheduleRefreshToken(true);
          this.currentUserSubject.next(false);
          this.router.navigate(["/login"]);
        })
      )
      .subscribe(result => {
      console.log("logout", result);
    });
  }

  isAuthUserLoggedIn(): boolean {
    return this.tokenStoreService.hasStoredAccessAndRefreshTokens() &&
      !this.tokenStoreService.isAccessTokenTokenExpired();
  }

  getBearerAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.tokenStoreService.getRawAuthToken(AuthTokenType.AccessToken)}`
    });
  }

  getAuthUser(): AuthUser | null {
    if (!this.isAuthUserLoggedIn()) {
      return null;
    }

    const decodedToken = this.tokenStoreService.getDecodedAccessToken();
    const roles = this.tokenStoreService.getDecodedTokenRoles();
    return Object.freeze({
      userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      userName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      displayName: decodedToken["DisplayName"],
      roles: roles
    });
  }

  isAuthUserInRoles(requiredRoles: string[]): boolean {
    const user = this.getAuthUser();
    if (!user || !user.roles) {
      return false;
    }

    if (user.roles.indexOf(this.appConfig.adminRoleName.toLowerCase()) >= 0) {
      return true; // The `Admin` role has full access to every pages.
    }

    return requiredRoles.some(requiredRole => {
      if (user.roles) {
        return user.roles.indexOf(requiredRole.toLowerCase()) >= 0;
      } else {
        return false;
      }
    });
  }

  isAuthUserInRole(requiredRole: string): boolean {
    return this.isAuthUserInRoles([requiredRole]);
  }
}
