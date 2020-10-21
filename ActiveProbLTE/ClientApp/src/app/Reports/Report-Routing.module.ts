import { ExportComponent } from './export/export.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginGruard } from '../Authority/loginguard';
import { NotificationManagerComponent } from './notification-manager/notification-manager.component';
import { NotificationEditComponent } from './notification-edit/notification-edit.component';
const routes: Routes = [
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
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
