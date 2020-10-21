
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  
  private currentUserSubject = new BehaviorSubject<boolean>(false);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private storageService: StorageService, private http: HttpClient, private router: Router) {
    this.updateStatus();
  }

  private updateStatus(): void {
    this.currentUserSubject.next(true)//this.isLoggedIn());
  }

  login(u: User) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post<any>('api/user/authenticate', u, { headers: headers })
      .pipe(map(user => {
        this.storageService.setLocal("RememberMe",u.rememberMe);
        if (!user) {
          this.currentUserSubject.next(false);
          return false;
        }
        this.storageService.setSession('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(true);
        return true;
      }));
  }
  logout() {
    this.storageService.removeSession('currentUser');
    this.currentUserSubject.next(false);
    this.router.navigate(["/login"]);
  }

  private updateStatusOnPageRefresh(): void {
    this.currentUserSubject.next(this.isAuthUserLoggedIn());
  }

  isAuthUserLoggedIn(): boolean {
    var data = this.storageService.getSession('currentUser');
    return true;
  }
}
