import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAccessComponent } from './role-access/role-access.component';
import { RoleManagerComponent } from './role-manager/role-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { RoleeditComponent } from './roleedit/roleedit.component';
import { UsereditComponent } from './useredit/useredit.component';
import { UserChangePassComponent } from './user-change-pass/user-change-pass.component';
import { UserRolesComponent } from './user-roles/user-roles.component';

const routes: Routes = [{
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
