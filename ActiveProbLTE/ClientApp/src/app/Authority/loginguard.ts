import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../Shared/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
@Injectable({ providedIn: 'root' })
export class LoginGruard implements CanActivate, OnDestroy {
  myAppUrl = '';
  private logSubc: Subscription;
  islogged: boolean;
  constructor(
    private router: Router,
    private toast: ToastrService,
    private auth: AuthenticationService,
    private translate: TranslateService,
    @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    this.logSubc = this.auth.currentUser.subscribe((data) => { data ? this.islogged = true : this.islogged = false });
    if (this.islogged) {
      //this.router.navigateByUrl(state.url);         
      return true;
    }

    this.router.navigate(['login'], { queryParams: { returnURL: route.url } });
    this.toast.error(this.translate.instant('NoAccessToThisPage'), this.translate.instant('Warning'));
    return false;
  }
  ngOnDestroy() {
    this.logSubc.unsubscribe();
  }
}
