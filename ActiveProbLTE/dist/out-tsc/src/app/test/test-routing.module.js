var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LoginGruard } from '../Authority/loginguard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefinedTestEditComponent } from './definedTestEdit/definedTestEdit.component';
import { DefinedTestMachineAssignmentComponent } from './definedTestMachineAssignment/definedTestMachineAssignment.component';
import { DefinedTestGroupAssignmentComponent } from './definedTestGroupAssignment/definedTestGroupAssignment.component';
import { DefinedTestMachineAssignmentEditComponent } from './definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component';
import { DefinedTestGroupAssignmentEditComponent } from './definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component';
import { DefinedTestComponent } from './definedTest/definedTest.component';
var routes = [
    {
        path: '',
        children: [
            { path: '', component: DefinedTestComponent, data: { breadcrumb: 'فهرست تست ها ', pageTitle: "فهرست تست ها" } },
            { path: 'Create', component: DefinedTestEditComponent, data: { breadcrumb: 'ایجاد تست ', pageTitle: "فهرست تست ها" } },
            { path: 'edit/:id', component: DefinedTestEditComponent, data: { breadcrumb: 'اصلاح تست ', pageTitle: "فهرست تست ها" } },
            { path: 'Assignment/Machine/:id/:Title', component: DefinedTestMachineAssignmentComponent, data: { breadcrumb: 'فهرست تست های دستگاه ', pageTitle: "فهرست تست های دستگاه" } },
            { path: 'Assignment/edit/:id/:Title', component: DefinedTestMachineAssignmentEditComponent, data: { breadcrumb: 'تخصیص تست به دستگاه ', pageTitle: "تخصیص تست به دستگاه" } },
            { path: 'Assignment/create/:id/:Title', component: DefinedTestMachineAssignmentEditComponent, data: { breadcrumb: 'اصلاح تست دستگاه ', pageTitle: "اصلاح تست دستگاه" } },
            { path: 'Group/Assignment/:id/:Title', component: DefinedTestGroupAssignmentComponent, data: { breadcrumb: 'فهرست تست های گروه ', pageTitle: "فهرست تست های گروه" } },
            { path: 'Group/Assignment/Create/:id/:Title', component: DefinedTestGroupAssignmentEditComponent, data: { breadcrumb: 'تخصیص تست به گروه ', pageTitle: "تخصیص تست به گروه" } },
            { path: 'Group/Assignment/Edit/:id/:Title', component: DefinedTestGroupAssignmentEditComponent, data: { breadcrumb: 'اصلاح تست گروه ', pageTitle: "اصلاح تست گروه" } },
        ], canActivate: [LoginGruard]
    }
];
var TestRoutingModule = /** @class */ (function () {
    function TestRoutingModule() {
    }
    TestRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], TestRoutingModule);
    return TestRoutingModule;
}());
export { TestRoutingModule };
//# sourceMappingURL=test-routing.module.js.map