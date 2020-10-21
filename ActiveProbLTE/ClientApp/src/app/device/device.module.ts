import { sharedModule } from './../Shared/shared.modules';
import { NgModule } from '@angular/core';
import { DeviceRoutingModule } from './device-routing.module';
import { MachineVersionComponent } from '../device/machine-version/machine-version.component';
import { MachineComponent } from '../device/machine/machine.component';
import { MachineEditComponent } from '../device/machineEdit/machineEdit.component';
import { MachineGroupComponent } from '../device/machineGroup/machineGroup.component';
import { MachineGroupEditComponent } from '../device/machineGroupEdit/machineGroupEdit.component';
import { GroupVersionComponent } from './machine-group-version/group-version.component';
import { TreeviewEventParser, OrderDownlineTreeviewEventParser, TreeviewModule } from 'ngx-treeview';
import { MatProgressBarModule, MatCheckboxModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';

import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TreeTestAddComponent } from './tree-test-add/tree-test-add.component';
import { TreeMediumTestComponent } from './tree-medium-test/tree-medium-test.component';
import { MatTableTestComponent } from './mat-table-test/mat-table-test.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatRadioModule } from '@angular/material/radio';
import { MessageComponent } from './message/message.component';
import { MessageEditComponent } from './message-edit/message-edit.component';

@NgModule({
  declarations: [
    MachineComponent,
    MachineVersionComponent,
    GroupVersionComponent,
    MachineEditComponent,
    MachineGroupComponent,
    MachineGroupEditComponent,
    TreeTestAddComponent,
    TreeMediumTestComponent,
    MatTableTestComponent,

    MessageComponent,
    MessageEditComponent

  ],
  imports: [
    TreeviewModule.forRoot(),
    sharedModule,
    DeviceRoutingModule,
    MatProgressBarModule

    ,
    MatTreeModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,

    MatTableModule,
    MatPaginatorModule,

    MatRadioModule,

  ],
  providers: [{ provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
  { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
})
export class DeviceModule { }
