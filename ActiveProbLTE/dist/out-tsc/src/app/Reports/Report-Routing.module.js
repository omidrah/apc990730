var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ExportComponent } from './export/export.component';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginGruard } from '../Authority/loginguard';
import { NotificationManagerComponent } from './notification-manager/notification-manager.component';
import { NotificationEditComponent } from './notification-edit/notification-edit.component';
var routes = [
    {
        path: '',
        children: [
            { path: '', component: ExportComponent },
            { path: 'Notification', component: NotificationManagerComponent },
            { path: 'Notification/Create', component: NotificationEditComponent },
            { path: 'Notification/Edit/:id', component: NotificationEditComponent }
        ],
        canActivate: [LoginGruard]
    }
];
var ReportRoutingModule = /** @class */ (function () {
    function ReportRoutingModule() {
    }
    ReportRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ReportRoutingModule);
    return ReportRoutingModule;
}());
export { ReportRoutingModule };
//# sourceMappingURL=Report-Routing.module.js.map