import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';

import { RoleAndUsersCount } from './../interfaces/RoleAndUsersCount';
import { IRole } from '../interfaces/IRole';
import { IUser } from '../interfaces/IUser';
import { IPass } from '../interfaces/IPass';

@Injectable()
export class ManagerService {
  constructor(private _http: HttpClient) { }

  getUsers() {
    return this._http.get('api/UsersManager/Index');
  }
  AddUser(newUser: IUser) {
    return this._http.post<IUser>('api/UsersManager/Register', newUser);
  }
  getUserById(id: number) {
    return this._http.get('api/UsersManager/GetUserById/' + id);
  }
  UpdateUser(updateUser: IUser) {
    var body = {
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      id: updateUser.id,
      email: updateUser.email,
      userName: updateUser.userName
    };
    return this._http.put('api/UsersManager/Edit/', body);
  }
  UpdatePassword(newpass: any) {
    return this._http.post('api/UsersManager/ChangePassword', newpass);
  }
  GetRoleAsignToUser(id: number) {
    return this._http.get('api/UsersManager/userRoles/' + id);
  }
  UpdateUserRole(userId: number, rolesId: number[]) {
    return this._http.put('api/UsersManager/ChangeUserRoles/' + userId, rolesId);
  }
  /************ */
  getRole(): Observable<RoleAndUsersCount[]> {
    return this._http.get<RoleAndUsersCount[]>('api/RoleManager/Index').pipe(
      tap(_ => console.log("list of roles"))
    );
  }
  getRoleById(id: number) {
    return this._http.get<IRole>("api/RoleManager/GetRoleById/" + id);
  }
  getAccess(roleId: number) {
    return this._http.get('api/RoleManager/AccessControl?id=' + roleId);
  }
  updateRoleAccess(roleId: number, actions: string[]) {
    return this._http.post('api/RoleManager/UpdateAccess/' + roleId,
      actions);
  }
  AddRole(newRole: IRole) {
    return this._http.post('api/RoleManager/Create', newRole);
  }
  UpdateRole(newRole: IRole) {
    return this._http.post('api/RoleManager/Edit', newRole);
  }
  DeleteRole(id:number) {        
    return this._http.delete('api/RoleManager/Delete/'+id);
  }
}
