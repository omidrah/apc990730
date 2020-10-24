import { InjectionToken } from "@angular/core";
export var APP_CONFIG = new InjectionToken("config");
export var AppConfig = {
    apiUrl: "/185.192.112.74/",
    loginPath: "login",
    logoutPath: "logout",
    refreshTokenPath: "RefreshToken",
    accessTokenObjectKey: "access_token",
    refreshTokenObjectKey: "refresh_token",
    adminRoleName: 'Admin'
};
//# sourceMappingURL=config.js.map