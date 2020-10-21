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

@NgModule({
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
export class ReportModule { }
