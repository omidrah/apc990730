import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { sharedModule } from './../Shared/shared.modules';
import { ManagerService } from './../Shared/services/manager.service';

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

@NgModule({
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
export class ManagerModule { }
