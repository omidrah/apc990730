var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleAccessComponent } from './role-access/role-access.component';
import { RoleManagerComponent } from './role-manager/role-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { RoleeditComponent } from './roleedit/roleedit.component';
import { UsereditComponent } from './useredit/useredit.component';
import { UserChangePassComponent } from './user-change-pass/user-change-pass.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
var routes = [{
        path: '',
        children: [
            { path: '', component: UserManagerComponent },
            { path: 'Users/Create', component: UsereditComponent },
            { path: 'Users/Edit/:id', component: UsereditComponent },
            { path: 'Users/ChangePassword/:id', component: UserChangePassComponent },
            { path: 'Users/AsginRole/:id', component: UserRolesComponent },
            { path: 'Roles', component: RoleManagerComponent },
            { path: 'Roles/Create', component: RoleeditComponent },
            { path: 'Roles/Edit/:id', component: RoleeditComponent },
            { path: 'Roles/Access/:id', component: RoleAccessComponent }
        ]
    }];
var ManagerRoutingModule = /** @class */ (function () {
    function ManagerRoutingModule() {
    }
    ManagerRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ManagerRoutingModule);
    return ManagerRoutingModule;
}());
export { ManagerRoutingModule };
//# sourceMappingURL=manager-routing.module.js.map