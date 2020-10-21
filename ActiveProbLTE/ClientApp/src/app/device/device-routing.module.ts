import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MachineComponent } from './machine/machine.component';
import { MachineVersionComponent } from './machine-version/machine-version.component';
import { GroupVersionComponent } from './machine-group-version/group-version.component';
import { MachineEditComponent } from './machineEdit/machineEdit.component';
import { MachineGroupComponent } from './machineGroup/machineGroup.component';
import { MachineGroupEditComponent } from './machineGroupEdit/machineGroupEdit.component';
import { LoginGruard } from '../Authority/loginguard';
import { TreeTestAddComponent } from './tree-test-add/tree-test-add.component';
import { TreeMediumTestComponent } from './tree-medium-test/tree-medium-test.component';
import { MatTableTestComponent } from './mat-table-test/mat-table-test.component';
import { MessageComponent } from './message/message.component';
import { MessageEditComponent } from './message-edit/message-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MachineComponent, data: { breadcrumb: 'دستگاه ها ', pageTitle: 'فهرست دستگاه ها' } },
      { path: 'Create', component: MachineEditComponent, data: { breadcrumb: 'ایجاد دستگاه', pageTitle: 'ایجاد دستگاه' } },
      { path: 'edit/:id', component: MachineEditComponent, data: { breadcrumb: 'ویرایش دستگاه', pageTitle: 'ویرایش دستگاه' } },
      { path: 'Version/:id/:Name/:IMEI1', component: MachineVersionComponent, data: { breadcrumb: 'به روزرسانی', pageTitle: 'به روزرسانی نرم افزار دستگاه' } },
      { path: 'Group', component: MachineGroupComponent, data: { breadcrumb: 'گروه ها', pageTitle: 'فهرست گروه ها' } },
      { path: 'Group/edit/:id/:Title', component: MachineGroupEditComponent, data: { breadcrumb: 'ویرایش گروه', pageTitle: 'ویرایش گروه' } },
      { path: 'Group/Version/:id/:GroupTitle', component: GroupVersionComponent, data: { breadcrumb: 'به روزرسانی', pageTitle: 'به روزرسانی نرم افزار گروه' } },
      { path: 'Message/Create/:machinId/:machineName', component: MessageEditComponent },
      { path: 'Message/Edit/:machinId/:machineName/:id', component: MessageEditComponent },
      { path: 'Message/:id/:Name', component: MessageComponent },
      { path: 'tree', component: TreeTestAddComponent },
      { path: 'decode', component: TreeMediumTestComponent },
      { path: 'mattable', component: MatTableTestComponent },
    ],
    canActivate: [LoginGruard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
