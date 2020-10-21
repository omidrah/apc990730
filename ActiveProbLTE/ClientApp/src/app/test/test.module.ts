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
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    DefinedTestComponent,
    DefinedTestEditComponent,
    DefinedTestMachineAssignmentComponent,
    DefinedTestGroupAssignmentComponent,
    DefinedTestMachineAssignmentEditComponent,
    DefinedTestGroupAssignmentEditComponent,

    //BreadcrumbComponent
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
  //exports: [
  //  BreadcrumbComponent,
  //],
})
export class TestModule { }
