import { ToastrService } from 'ngx-toastr'; 
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, CanActivateChild, Data, Route } from '@angular/router';
import { AuthenticationService } from '../Shared/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
@Injectable({ providedIn: 'root' })
export class LoginGruard implements CanActivate, CanActivateChild, CanLoad {
  
  constructor(
    private router: Router,
    private toast: ToastrService,
    private auth: AuthenticationService,
    private translate: TranslateService,
    @Inject('BASE_URL') baseUrl: string) {    
  }

  private permissionObjectKey = "permission";

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {    
        const RouteData = route.data;
        const returnUrl = state.url;
         return this.hasAuthUserAccessToThisRoute(RouteData, returnUrl);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const RouteData = childRoute.data;
    const returnUrl = state.url;
    return this.hasAuthUserAccessToThisRoute(RouteData, returnUrl);
  }

  canLoad(route: Route): boolean {
    if (route.data) {
      const permissionData = route.data[this.permissionObjectKey] as AuthGuardPermission;
      const returnUrl = `/${route.path}`;
      return this.hasAuthUserAccessToThisRoute(permissionData, returnUrl);
    } else {
      return true;
    }
  }

  private hasAuthUserAccessToThisRoute(permissionData: Data, returnUrl: string): boolean {
    if (!this.auth.isAuthUserLoggedIn()) {
      this.showAccessDenied(returnUrl);
      return false;
    }
    var TokenHelp = this.auth.getDecodedAccessToken();;
    if (this.auth.isAuthUserInRole("Admin")) {
      return true;
    }

    if (Array.isArray(permissionData.deniedRoles) && Array.isArray(permissionData.permittedRoles)) {
      throw new Error("Don't set both 'deniedRoles' and 'permittedRoles' in route data.");
    }

    if (Array.isArray(permissionData.permittedRoles)) {
      const isInRole = this.auth.isAuthUserInRoles(permissionData.permittedRoles);
      if (isInRole) {
        return true;
      }

      this.showAccessDenied(returnUrl);
      return false;
    }

    if (Array.isArray(permissionData.deniedRoles)) {
      const isInRole = this.auth.isAuthUserInRoles(permissionData.deniedRoles);
      if (!isInRole) {
        return true;
      }
      this.showAccessDenied(returnUrl);
      return false;
    }
    return true;
  }  
  private showAccessDenied(returnUrl: string) {
    this.router.navigate(['/login'], { queryParams: { returnURL: returnUrl } });
    this.toast.error(this.translate.instant('NoAccessToThisPage'), this.translate.instant('Warning'));
  }
}

export interface AuthGuardPermission {
  permittedRoles?: string[];
  deniedRoles?: string[];
}

