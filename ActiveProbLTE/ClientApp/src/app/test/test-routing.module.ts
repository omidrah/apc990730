import { LoginGruard } from '../Authority/loginguard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefinedTestEditComponent } from './definedTestEdit/definedTestEdit.component';
import { DefinedTestMachineAssignmentComponent } from './definedTestMachineAssignment/definedTestMachineAssignment.component';
import { DefinedTestGroupAssignmentComponent } from './definedTestGroupAssignment/definedTestGroupAssignment.component';
import { DefinedTestMachineAssignmentEditComponent } from './definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component';
import { DefinedTestGroupAssignmentEditComponent } from './definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component';
import { DefinedTestComponent } from './definedTest/definedTest.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DefinedTestComponent, data: { breadcrumb: 'فهرست تست ها ', pageTitle: "فهرست تست ها" } },
      { path: 'Create', component: DefinedTestEditComponent, data: { breadcrumb: 'ایجاد تست ', pageTitle: "فهرست تست ها" } },
      { path: 'edit/:id', component: DefinedTestEditComponent, data: { breadcrumb: 'اصلاح تست ', pageTitle: "فهرست تست ها" } },
      { path: 'Assignment/Machine/:id/:Title', component: DefinedTestMachineAssignmentComponent, data: { breadcrumb: 'فهرست تست های دستگاه ', pageTitle: "فهرست تست های دستگاه"} },
      { path: 'Assignment/edit/:id/:Title', component: DefinedTestMachineAssignmentEditComponent, data: { breadcrumb: 'تخصیص تست به دستگاه ', pageTitle: "تخصیص تست به دستگاه"} },
      { path: 'Assignment/create/:id/:Title', component: DefinedTestMachineAssignmentEditComponent, data: { breadcrumb: 'اصلاح تست دستگاه ', pageTitle: "اصلاح تست دستگاه"} },
      { path: 'Group/Assignment/:id/:Title', component: DefinedTestGroupAssignmentComponent, data: { breadcrumb: 'فهرست تست های گروه ', pageTitle: "فهرست تست های گروه"} },
      { path: 'Group/Assignment/Create/:id/:Title', component: DefinedTestGroupAssignmentEditComponent, data: { breadcrumb: 'تخصیص تست به گروه ', pageTitle: "تخصیص تست به گروه"} },
      { path: 'Group/Assignment/Edit/:id/:Title', component: DefinedTestGroupAssignmentEditComponent, data: { breadcrumb: 'اصلاح تست گروه ', pageTitle: "اصلاح تست گروه"} },
    ], canActivate: [LoginGruard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
