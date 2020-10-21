var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var DeviceModule = /** @class */ (function () {
    function DeviceModule() {
    }
    DeviceModule = __decorate([
        NgModule({
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
                MatProgressBarModule,
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
    ], DeviceModule);
    return DeviceModule;
}());
export { DeviceModule };
//# sourceMappingURL=device.module.js.map