var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
var ManagerService = /** @class */ (function () {
    function ManagerService(_http) {
        this._http = _http;
    }
    ManagerService.prototype.getUsers = function () {
        return this._http.get('api/UsersManager/Index');
    };
    ManagerService.prototype.AddUser = function (newUser) {
        return this._http.post('api/UsersManager/Register', newUser);
    };
    ManagerService.prototype.getUserById = function (id) {
        return this._http.get('api/UsersManager/GetUserById/' + id);
    };
    ManagerService.prototype.UpdateUser = function (updateUser) {
        var body = {
            firstName: updateUser.firstName,
            lastName: updateUser.lastName,
            id: updateUser.id,
            email: updateUser.email,
            userName: updateUser.userName
        };
        return this._http.put('api/UsersManager/Edit/', body);
    };
    ManagerService.prototype.UpdatePassword = function (newpass) {
        return this._http.post('api/UsersManager/ChangePassword', newpass);
    };
    ManagerService.prototype.GetRoleAsignToUser = function (id) {
        return this._http.get('api/UsersManager/userRoles/' + id);
    };
    ManagerService.prototype.UpdateUserRole = function (userId, rolesId) {
        return this._http.put('api/UsersManager/ChangeUserRoles/' + userId, rolesId);
    };
    /************ */
    ManagerService.prototype.getRole = function () {
        return this._http.get('api/RoleManager/Index').pipe(tap(function (_) { return console.log("list of roles"); }));
    };
    ManagerService.prototype.getRoleById = function (id) {
        return this._http.get("api/RoleManager/GetRoleById/" + id);
    };
    ManagerService.prototype.getAccess = function (roleId) {
        return this._http.get('api/RoleManager/AccessControl?id=' + roleId);
    };
    ManagerService.prototype.updateRoleAccess = function (roleId, actions) {
        return this._http.post('api/RoleManager/UpdateAccess/' + roleId, actions);
    };
    ManagerService.prototype.AddRole = function (newRole) {
        return this._http.post('api/RoleManager/Create', newRole);
    };
    ManagerService.prototype.UpdateRole = function (newRole) {
        return this._http.post('api/RoleManager/Edit', newRole);
    };
    ManagerService.prototype.DeleteRole = function (id) {
        return this._http.delete('api/RoleManager/Delete/' + id);
    };
    ManagerService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], ManagerService);
    return ManagerService;
}());
export { ManagerService };
//# sourceMappingURL=manager.service.js.map