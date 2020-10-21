import { InjectionToken } from "@angular/core";
export let APP_CONFIG = new InjectionToken<string>("config");
  
export interface IAppConfig {
  apiUrl: string;
  loginPath: string;
  logoutPath: string;
  refreshTokenPath: string;
  accessTokenObjectKey: string;
  refreshTokenObjectKey: string;
}

export const AppConfig: IAppConfig = {
  apiUrl: "/185.192.112.74/api",
  loginPath: "login",
  logoutPath: "logout",
  refreshTokenPath: "RefreshToken",
  accessTokenObjectKey: "access_token",
  refreshTokenObjectKey: "refresh_token"
};

