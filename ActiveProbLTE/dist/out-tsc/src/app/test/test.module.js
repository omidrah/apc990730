var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { sharedModule } from './../Shared/shared.modules';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { DefinedTestComponent } from './definedTest/definedTest.component';
import { DefinedTestEditComponent } from './definedTestEdit/definedTestEdit.component';
import { DefinedTestMachineAssignmentComponent } from './definedTestMachineAssignment/definedTestMachineAssignment.component';
import { DefinedTestGroupAssignmentComponent } from './definedTestGroupAssignment/definedTestGroupAssignment.component';
import { DefinedTestMachineAssignmentEditComponent } from './definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component';
import { DefinedTestGroupAssignmentEditComponent } from './definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
var TestModule = /** @class */ (function () {
    function TestModule() {
    }
    TestModule = __decorate([
        NgModule({
            declarations: [
                DefinedTestComponent,
                DefinedTestEditComponent,
                DefinedTestMachineAssignmentComponent,
                DefinedTestGroupAssignmentComponent,
                DefinedTestMachineAssignmentEditComponent,
                DefinedTestGroupAssignmentEditComponent,
            ],
            imports: [
                CommonModule,
                TestRoutingModule,
                MatProgressBarModule,
                sharedModule,
                MatCheckboxModule,
                MatDatepickerModule,
                MatInputModule,
                MatFormFieldModule,
                MatIconModule,
                MatTableModule,
                MatPaginatorModule
            ],
        })
    ], TestModule);
    return TestModule;
}());
export { TestModule };
//# sourceMappingURL=test.module.js.map