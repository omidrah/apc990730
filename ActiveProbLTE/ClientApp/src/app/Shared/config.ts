import { InjectionToken } from "@angular/core";
export let APP_CONFIG = new InjectionToken<string>("config");
  
export interface IAppConfig {
  apiUrl: string;
  loginPath: string;
  logoutPath: string;
  refreshTokenPath: string;
  accessTokenObjectKey: string;
  refreshTokenObjectKey: string;
  adminRoleName: string;
}

export const AppConfig: IAppConfig = {
  apiUrl: "http://185.192.112.74/",
  loginPath: "login",
  logoutPath: "logout",
  refreshTokenPath: "RefreshToken",
  accessTokenObjectKey: "access_token",
  refreshTokenObjectKey: "refresh_token",
  adminRoleName:'Admin'
};

