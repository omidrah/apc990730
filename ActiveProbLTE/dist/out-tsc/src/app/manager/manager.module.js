var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedModule } from './../Shared/shared.modules';
import { ManagerRoutingModule } from './manager-routing.module';
import { RoleManagerComponent } from './role-manager/role-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { RoleAccessComponent } from './role-access/role-access.component';
import { RoleeditComponent } from './roleedit/roleedit.component';
import { UsereditComponent } from './useredit/useredit.component';
import { UserChangePassComponent } from './user-change-pass/user-change-pass.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
var ManagerModule = /** @class */ (function () {
    function ManagerModule() {
    }
    ManagerModule = __decorate([
        NgModule({
            declarations: [RoleManagerComponent, UserManagerComponent, RoleAccessComponent, RoleeditComponent, UsereditComponent, UserChangePassComponent, UserRolesComponent],
            imports: [
                CommonModule,
                sharedModule,
                ManagerRoutingModule,
                MatFormFieldModule,
                MatInputModule,
                MatTableModule,
                MatPaginatorModule,
                MatInputModule,
                MatFormFieldModule
            ]
        })
    ], ManagerModule);
    return ManagerModule;
}());
export { ManagerModule };
//# sourceMappingURL=manager.module.js.map