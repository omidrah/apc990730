import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { User } from '../models/user';
import { BrowserStorageService } from './browser-storage.service';
import * as jwt_decode from "jwt-decode";
import { AuthTokenType } from '../models/auth-token-type';
import { AuthUser } from '../models/AuthUser';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject = new BehaviorSubject<boolean>(false);
  public currentUser = this.currentUserSubject.asObservable();
  constructor(private storageService: BrowserStorageService,private http: HttpClient, private router: Router)
  {
    this.updateStatusOnPageRefresh();    
  }

  private updateStatusOnPageRefresh(): void {
    this.currentUserSubject.next(this.isAuthUserLoggedIn());
  }

  login(u: User) {
    return this.http.post<any>('api/user/Authenticate', u)
      .pipe(
        map((res: any) => {
          this.setRememberMe(u.rememberMe);
          if (!res) {            
            this.currentUserSubject.next(false);
            return false;
          }
          this.storeLoginSession(res);
          this.currentUserSubject.next(true);
          return true;        
        }), catchError((error: HttpErrorResponse) => throwError(error))
      );
  }
  logout() {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const refreshToken =encodeURIComponent(this.getRawAuthToken(AuthTokenType.RefreshToken));
    return this.http.post<any>('api/user/LogOff?refreshToken=' + refreshToken, { headers: headers })
      .pipe(
        map(res => res || {}),
        catchError((error: HttpErrorResponse) => throwError(error)),
        finalize(() => {         
          this.currentUserSubject.next(false);
          this.router.navigate(["/login"]);
        })
      )
      .subscribe(result => {
      console.log("logout", result);
    });
  }

  setRememberMe(value: boolean): void {
    this.storageService.setLocal("rememberMe", value);
  }
  storeLoginSession(response: any): void {
    this.setToken(AuthTokenType.AccessToken, response["access_token"]);
    this.setToken(AuthTokenType.RefreshToken, response["refresh_token"]);
  }
  setToken(tokenType: AuthTokenType, tokenValue: string): void {
    if (this.isEmptyString(tokenValue)) {
      console.error(`${AuthTokenType[tokenType]} is null or empty.`);
    }

    if (tokenType === AuthTokenType.AccessToken && this.isEmptyString(tokenValue)) {
      throw new Error("AccessToken can't be null or empty.");
    }

    if (this.rememberMe()) {
      this.storageService.setLocal(AuthTokenType[tokenType], tokenValue);
    } else {
      this.storageService.setSession(AuthTokenType[tokenType], tokenValue);
    }
  }
  rememberMe(): boolean {
    return this.storageService.getLocal("rememberMe") === true;
  }
  isEmptyString(value: string): boolean {
    return !value || 0 === value.length;
  }
  isAuthUserLoggedIn(): boolean {
    return this.hasStoredAccessAndRefreshTokens() &&
      !this.isAccessTokenTokenExpired();
  }
  hasStoredAccessAndRefreshTokens(): boolean {
    const accessToken = this.getRawAuthToken(AuthTokenType.AccessToken);
    const refreshToken = this.getRawAuthToken(AuthTokenType.RefreshToken);
    return !this.isEmptyString(accessToken) && !this.isEmptyString(refreshToken);
  }
  isAccessTokenTokenExpired(): boolean {
    const expirationDateUtc = this.getAccessTokenExpirationDateUtc();
    if (!expirationDateUtc) {
      return true;
    }
    return !(expirationDateUtc.valueOf() > new Date().valueOf());
  }
  getAccessTokenExpirationDateUtc(): Date | null {
    const decoded = this.getDecodedAccessToken();
    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0); // The 0 sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  getDecodedAccessToken(): any {
    const dd = jwt_decode(this.getRawAuthToken(AuthTokenType.AccessToken));
    return dd;
  }
  getBearerAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.getRawAuthToken(AuthTokenType.AccessToken)}`
    });
  }
  getDecodedTokenRoles(): string[] | null {
    const decodedToken = this.getDecodedAccessToken();
    const roles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if (!roles) {
      return null;
    }

    if (Array.isArray(roles)) {
      return roles.map(role => role.toLowerCase());
    } else {
      return [roles.toLowerCase()];
    }
  }
  deleteAuthTokens() {
    if (this.rememberMe()) {
      this.storageService.removeLocal(AuthTokenType[AuthTokenType.AccessToken]);
      this.storageService.removeLocal(AuthTokenType[AuthTokenType.RefreshToken]);
    } else {
      this.storageService.removeSession(AuthTokenType[AuthTokenType.AccessToken]);
      this.storageService.removeSession(AuthTokenType[AuthTokenType.RefreshToken]);
    }
    this.storageService.removeLocal("rememberMe");
  }
  getRawAuthToken(tokenType: AuthTokenType): string {
    if (this.rememberMe()) {
      return this.storageService.getLocal(AuthTokenType[tokenType]);
    } else {
      return this.storageService.getSession(AuthTokenType[tokenType]);
    }
  }
  getAuthUserDisplayName(): string {
    return this.getDecodedAccessToken().DisplayName;
  }
  getAuthUser(): AuthUser | null {
    if (!this.isAuthUserLoggedIn()) {
      return null;
    }
    const decodedToken = this.getDecodedAccessToken();
    const roles = this.getDecodedTokenRoles();
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
    if (user.roles.indexOf("Admin".toLowerCase()) >= 0) {
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
