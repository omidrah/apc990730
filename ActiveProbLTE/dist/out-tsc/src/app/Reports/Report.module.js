var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { sharedModule } from './../Shared/shared.modules';
import { ReportRoutingModule } from './Report-Routing.module';
import { ExportComponent } from './export/export.component';
import { NgModule } from "@angular/core";
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
//import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { NotificationManagerComponent } from './notification-manager/notification-manager.component';
import { NotificationEditComponent } from './notification-edit/notification-edit.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
var ReportModule = /** @class */ (function () {
    function ReportModule() {
    }
    ReportModule = __decorate([
        NgModule({
            declarations: [
                ExportComponent,
                NotificationManagerComponent,
                NotificationEditComponent
            ],
            imports: [
                ReportRoutingModule,
                NgxSpinnerModule,
                sharedModule,
                MatDatepickerModule,
                MatFormFieldModule,
                MatInputModule,
                MatTableModule,
                MatPaginatorModule,
                MatCheckboxModule
            ],
            exports: [],
            providers: []
        })
    ], ReportModule);
    return ReportModule;
}());
export { ReportModule };
//# sourceMappingURL=Report.module.js.map