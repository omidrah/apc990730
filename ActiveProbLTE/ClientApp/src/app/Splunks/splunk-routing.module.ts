import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGruard } from '../Authority/loginguard';
import { SplunkComponent } from './splunk/splunk.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
const routes: Routes = [
  {
    path:'',
    children:[
      { path: '', component: SplunkComponent, data: { breadcrumb: 'مانیتورینگ دستگاه ها', pageTitle: 'مانیتورینگ دستگاه ها' } },
      { path: 'fetch-data', component: FetchDataComponent, data: { breadcrumb: 'گزارش تست ها', pageTitle: 'گزارش کامل تست ها' }},                       
    ],
    canActivate: [LoginGruard]
  }  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SplunkRoutingModule { }
