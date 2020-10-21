import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Configurations } from '../models/Configurations';
import { map } from 'rxjs/operators';

@Injectable(
  {providedIn: 'root'}
)
export class ConfigService {

  public time = new Observable<string>(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  //Config = new Subject<Configurations>();

  private currentConfigurationsSubject: BehaviorSubject<Configurations> = new BehaviorSubject<Configurations>(JSON.parse(sessionStorage.getItem('Configuration')));

  public currentConfigurations: Observable<Configurations> =
    this.currentConfigurationsSubject.asObservable();



  constructor(private _http: HttpClient) {
    this._http.get<Configurations>('api/Config/GetAppConfigurations').subscribe(a => {
      console.log("aaa");

      sessionStorage.setItem('Configuration', JSON.stringify(a));

      //this.Config.next(a);
      this.currentConfigurationsSubject.next(a);
    });
  }  

  getTime() {
    return this.time;
  } 
}
