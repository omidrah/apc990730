var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginGruard } from '../Authority/loginguard';
import { SplunkComponent } from './splunk/splunk.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
var routes = [
    {
        path: '',
        children: [
            { path: '', component: SplunkComponent, data: { breadcrumb: 'مانیتورینگ دستگاه ها', pageTitle: 'مانیتورینگ دستگاه ها' } },
            { path: 'fetch-data', component: FetchDataComponent, data: { breadcrumb: 'گزارش تست ها', pageTitle: 'گزارش کامل تست ها' } },
        ],
        canActivate: [LoginGruard]
    }
];
var SplunkRoutingModule = /** @class */ (function () {
    function SplunkRoutingModule() {
    }
    SplunkRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], SplunkRoutingModule);
    return SplunkRoutingModule;
}());
export { SplunkRoutingModule };
//# sourceMappingURL=splunk-routing.module.js.map