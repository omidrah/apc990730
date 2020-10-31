import { Injectable } from "@angular/core";
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { AuthTokenType } from "../models/auth-token-type";
import { Router } from "@angular/router";

//interceptor in any requset set AccessToken for use in server 
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.auth.getRawAuthToken(AuthTokenType.AccessToken);
    if (accessToken) {
      req = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${accessToken}`)
      });
      return next.handle(req)
        //.catch((error: any) => {
        //  if (error.status === 401 || error.status === 403) {
        //    this.router.navigate(["/login"]);
        //  }
        //  return Observable.throw(error);
        //});
    }
    else {
      //reoute to login page
      return next.handle(req);
    }
    
  }
}
