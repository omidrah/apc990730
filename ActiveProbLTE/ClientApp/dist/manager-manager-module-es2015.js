(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["manager-manager-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/manager/role-access/role-access.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/manager/role-access/role-access.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\n<div class=\"content-wrapper\">\n  <!-- Content Header (Page header) -->\n  <section class=\"content-header\">\n    <h1>\n      <h2>تنظیم سطوح دسترسی پویای نقش {{selectedRoleName}}</h2>\n    </h1>\n    <ol class=\"breadcrumb\">\n      <li><a [routerLink]=\"['']\" translate><i class=\"fa fa-dashboard\"></i>Home</a></li>\n      <li class=\"active\" translate>RoleList</li>\n    </ol>\n\n  </section>\n\n  <!--<app-breadcrumb></app-breadcrumb>-->\n  <!-- Main content -->\n  <section class=\"content\">\n\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box box-primary\">\n          <div class=\"box-body\">\n            <div class=\"row\">\n              <div class=\"col-md-12\">\n                <mat-form-field>\n                  <mat-label translate>Search</mat-label>\n                  <input matInput #input [(ngModel)]=\"search\">\n                </mat-form-field>\n              </div>\n            </div>\n            <form [formGroup]=\"AccessForm\" (ngSubmit)=\"submit()\">\n              <ul *ngFor=\"let d of actsFormArray.controls; let i=index\">\n                <input type=\"checkbox\" [value]=\"d.value.controllerId\" /> {{d.value.disp}}\n                <li *ngFor=\"let data of d.value.actions; let j=index\">\n                  <label>\n                    <input type=\"checkbox\" [value]=\"data.actionId\" checked=\"{{data.selected}}\" (change)=\"onCheckboxChange($event)\" />\n                    {{data.actionName}}\n                  </label>\n                </li>\n              </ul>\n              <button class=\"btn btn-primary\" translate>submit</button>\n              <button class=\"btn btn-danger \" (click)=\"cancel()\" translate>Cancel</button>\n            </form>\n          </div><!-- /.box-body -->\n          <div class=\"overlay\" *ngIf=\"showloader \">\n            <i class=\"fa fa-refresh fa-spin\"></i>\n          </div>\n        </div><!-- /.box -->\n      </div><!-- /.col -->\n    </div><!-- /.row -->\n\n  </section><!-- /.content -->\n</div><!-- /.content-wrapper -->\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/manager/role-manager/role-manager.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/manager/role-manager/role-manager.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\n<div class=\"content-wrapper\">\n  <!-- Content Header (Page header) -->\n  <section class=\"content-header\">\n    <h1>\n      <span translate>RoleList</span>\n    </h1>\n    <ol class=\"breadcrumb\">\n      <li><a [routerLink]=\"['']\" translate><i class=\"fa fa-dashboard\"></i>Home</a></li>\n      <li class=\"active\" translate>RoleList</li>\n    </ol>\n\n  </section>\n\n  <!--<app-breadcrumb></app-breadcrumb>-->\n  <!-- Main content -->\n  <section class=\"content\">\n\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box box-primary\">\n          <div class=\"box-body\">\n            <div class=\"row\">\n              <div class=\"col-md-12\">\n                <mat-form-field>\n                  <mat-label translate>Search</mat-label>\n                  <input matInput (keyup)=\"applyFilter($event)\" #input>\n                </mat-form-field>\n                <a class=\"btn btn-success btn-lg rowEndAligne\" [routerLink]=\"['/manager/Roles/Create']\" ><span translate>Add Role</span><i class=\"fa fa-plus\"></i></a>\n              </div>\n            </div>\n\n            <div class=\"mat-table-container mat-elevation-z8\">\n              <table mat-table [dataSource]=\"dataSource\" matSort #sort1=\"matSort\"  class=\"table table-hover table-striped text-nowrap\" >\n\n\n                <ng-container matColumnDef=\"index\">\n                  <th mat-header-cell *matHeaderCellDef><span translate>Row</span></th>\n                  <td mat-cell *matCellDef=\"let element;let i = index;\">\n                    {{this.paginator.pageIndex == 0 ? i + 1 : 1 + i + this.paginator.pageIndex * this.paginator.pageSize}}\n                  </td>\n                </ng-container>\n\n\n                <ng-container matColumnDef=\"name\">\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>Name</span></th>\n                  <td mat-cell *matCellDef=\"let element\"> {{element.role.name}} </td>\n                </ng-container>\n\n                <ng-container matColumnDef=\"description\">\n                  <th mat-header-cell *matHeaderCellDef><span translate>description</span></th>\n                  <td mat-cell *matCellDef=\"let element\"> {{element.role.description}} </td>\n                </ng-container>\n\n                <ng-container matColumnDef=\"UserCount\">\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>UsersCount</span></th>\n                  <td mat-cell *matCellDef=\"let element\"> {{element.usersCount}} </td>\n                </ng-container>\n\n                <ng-container matColumnDef=\"actions\" sticky [stickyEnd]=\"true\">\n                  <th mat-header-cell *matHeaderCellDef></th>\n                  <td mat-cell *matCellDef=\"let element\">\n                    <a class=\"btn btn-default gridbutton\" [routerLink]=\"['/manager/Roles/Edit/' , element.role.id]\" title=\"{{ 'Edit' | translate }}\">Edit<i class=\"fa fa-edit\"></i></a>\n                    <a class=\"btn btn-default gridbutton\" (click)=\"doDelete(element.role)\" title=\"{{ 'Delete' | translate }}\"><i class=\"fa fa-trash\">Delete</i></a>\n                    <a class=\"btn btn-default gridbutton\" [routerLink]=\"['/manager/Roles/Access/' , element.role.id ]\" title=\"{{ 'Access Controle' | translate }}\">AccessControl<i class=\"fa fa-upload\"></i></a>\n                  </td>\n                </ng-container>\n\n                <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n                <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n              </table>\n              <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[10 , 25 , 50 , 100]\" [showFirstLastButtons]=\"true\"></mat-paginator>\n            </div>\n          </div><!-- /.box-body -->\n          <div class=\"overlay\" *ngIf=\"showloader \">\n            <i class=\"fa fa-refresh fa-spin\"></i>\n          </div>\n        </div><!-- /.box -->\n      </div><!-- /.col -->\n    </div><!-- /.row -->\n\n\n    <div class=\"modal fade\" id=\"modal-default\" data-backdrop=\"static\" style=\"display: none;\">\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">×</span>\n            </button>\n            <h4 class=\"modal-title\" translate>Noticeable</h4>\n          </div>\n          <div class=\"modal-body\">\n            <p translate>DeleteDeviceConfirmMessage</p>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-default pull-left\" data-dismiss=\"modal\" translate>No</button>\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"doDelete()\" translate>Yse</button>\n          </div>\n        </div>\n        <!-- /.modal-content -->\n      </div>\n      <!-- /.modal-dialog -->\n    </div>\n\n\n\n  </section><!-- /.content -->\n</div><!-- /.content-wrapper -->\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/manager/roleedit/roleedit.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/manager/roleedit/roleedit.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>roleedit works!</p>\n<div class=\"box box-primary\">\n  <form [formGroup]=\"roleForm\" (ngSubmit)=\"Save()\" #formDir=\"ngForm\" novalidate>\n    <div class=\"box-body\">\n      <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <div class=\"form-group\">\n            <label class=\"col-sm-3 control-label\" for=\"name\">\n              <span class=\"text-danger\">*</span>\n              <span >Name</span>\n            </label>\n            <div class=\"col-sm-9\">\n              <input class=\"form-control\" type=\"text\" formControlName=\"name\" required />\n              <span class=\"text-danger\" *ngIf=\"name?.invalid && (name?.touched || formDir.submitted)\">Name Is Required</span  >\n            </div>\n          </div>\n        </div>\n        </div>\n      <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <div class=\"form-group\">\n            <label for=\"description\" class=\"col-sm-3 control-label\">\n              <span>Description</span>:\n            </label>\n            <div class=\"col-sm-9\">\n              <input class=\"form-control\" type=\"text\" formControlName=\"description\" />\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"box-footer\">\n      <button class=\"btn btn-danger  rowEndAligne\" (click)=\"cancel()\" translate>Cancel</button>\n      <button type=\"submit\" class=\"btn btn-primary  rowEndAligne\" translate>Save</button>\n    </div><!-- /.box-footer -->\n  </form>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/manager/user-change-pass/user-change-pass.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/manager/user-change-pass/user-change-pass.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"box box-primary\">\n  <form [formGroup]=\"passChangeForm\" (ngSubmit)=\"Save()\" #formDir=\"ngForm\" novalidate>\n    <div class=\"box-body  justify-content-center\">\n      <div class=\"row\">\n        <div class=\"col-lg-6\">\n          <div class=\"form-group\">\n            <label for=\"newPassword\" class=\"col-sm-3 control-label\">\n              <span class=\"text-danger\">*</span>\n              <span translate>New Password</span>:\n            </label>\n            <div class=\"col-sm-9\">\n              <input class=\"form-control\" type=\"password\" formControlName=\"newPassword\" required>\n              <span class=\"text-danger\" *ngIf=\"newPassword?.invalid && ( newPassword.touched || formDir.submitted)\" translate>newPasswordIsRequired</span>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-6\">\n          <div class=\"form-group\">\n            <label for=\"confirmPassword\" class=\"col-sm-3 control-label\">\n              <span class=\"text-danger\">* </span>\n              <span translate>ConfirmPassword</span>:\n            </label>\n            <div class=\"col-sm-9\">\n              <input class=\"form-control\" type=\"password\" formControlName=\"confirmPassword\" required>\n              <span class=\"text-danger\" *ngIf=\"confirmPassword?.invalid && ( confirmPassword.touched || formDir.submitted)\" translate>ConfirmPasswordIsRequired</span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"box-footer\">\n      <button class=\"btn btn-danger  rowEndAligne\" (click)=\"cancel()\" translate>Cancel</button>\n      <button type=\"submit\" class=\"btn btn-primary  rowEndAligne\" translate>Save</button>\n    </div><!-- /.box-footer -->\n  </form>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/manager/user-manager/user-manager.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/manager/user-manager/user-manager.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\n<div class=\"content-wrapper\">\n  <!-- Content Header (Page header) -->\n  <section class=\"content-header\">\n    <h1>\n      <span translate>UserList</span>\n    </h1>\n    <ol class=\"breadcrumb\">\n      <li><a [routerLink]=\"['']\" translate><i class=\"fa fa-dashboard\"></i>Home</a></li>\n      <li class=\"active\" translate>UserList</li>\n    </ol>\n\n  </section>\n\n  <!--<app-breadcrumb></app-breadcrumb>-->\n  <!-- Main content -->\n  <section class=\"content\">\n\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"box box-primary\">\n          <div class=\"box-body\">\n            <div class=\"row\">\n              <div class=\"col-md-12\">\n                <mat-form-field>\n                  <mat-label translate>Search</mat-label>\n                  <input matInput (keyup)=\"applyFilter($event)\" #input>\n                </mat-form-field>\n                <a class=\"btn btn-success btn-lg rowEndAligne\" [routerLink]=\"['/manager/Users/Create']\"><span translate>Add User</span><i class=\"fa fa-plus\"></i></a>\n              </div>\n            </div>\n\n            <div class=\"mat-table-container mat-elevation-z8\">\n              <table mat-table [dataSource]=\"dataSource\" matSort #sort1=\"matSort\" class=\"table table-hover table-striped text-nowrap\">\n\n\n                <ng-container matColumnDef=\"index\">\n                  <th mat-header-cell *matHeaderCellDef><span translate>Row</span></th>\n                  <td mat-cell *matCellDef=\"let element;let i = index;\">\n                    {{this.paginator.pageIndex == 0 ? i + 1 : 1 + i + this.paginator.pageIndex * this.paginator.pageSize}}\n                  </td>\n                </ng-container>\n                <ng-container matColumnDef=\"FirstName\">\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>FirstName</span></th>\n                  <td mat-cell *matCellDef=\"let element\"> {{element.firstName}} </td>\n                </ng-container>\n\n                <ng-container matColumnDef=\"LastName\">\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>LastName</span></th>\n                  <td mat-cell *matCellDef=\"let element\"> {{element.lastName}} </td>\n                </ng-container>\n                \n                <ng-container matColumnDef=\"IsActive\">\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>IsActive</span></th>\n                  <td mat-cell *matCellDef=\"let element\"> {{element.isActive}} </td>\n                </ng-container>\n\n                <ng-container matColumnDef=\"actions\" sticky [stickyEnd]=\"true\">\n                  <th mat-header-cell *matHeaderCellDef></th>\n                  <td mat-cell *matCellDef=\"let element\">\n                    <a class=\"btn btn-default gridbutton\" [routerLink]=\"['/manager/Users/Edit/' , element.id]\" title=\"{{ 'Edit' | translate }}\">Edit<i class=\"fa fa-edit\"></i></a>\n                    <a class=\"btn btn-default gridbutton\" [routerLink]=\"['/manager/Users/ChangePassword/' , element.id]\" title=\"{{ 'Change Password' | translate }}\">Change Password<i class=\"fa fa-edit\"></i></a>\n                    <a class=\"btn btn-default gridbutton\" (click)=\"doDelete(element)\" title=\"{{ 'Delete' | translate }}\"><i class=\"fa fa-trash\">Delete</i></a>\n                    <a class=\"btn btn-default gridbutton\" [routerLink]=\"['/manager/Users/AsginRole/' , element.id ]\" title=\"{{ 'Asgin Role' | translate }}\">Role<i class=\"fa fa-upload\"></i></a>\n                  </td>\n                </ng-container>\n\n                <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n                <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n              </table>\n              <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[10 , 25 , 50 , 100]\" [showFirstLastButtons]=\"true\"></mat-paginator>\n            </div>\n          </div><!-- /.box-body -->\n          <div class=\"overlay\" *ngIf=\"showloader \">\n            <i class=\"fa fa-refresh fa-spin\"></i>\n          </div>\n        </div><!-- /.box -->\n      </div><!-- /.col -->\n    </div><!-- /.row -->\n\n\n    <div class=\"modal fade\" id=\"modal-default\" data-backdrop=\"static\" style=\"display: none;\">\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">×</span>\n            </button>\n            <h4 class=\"modal-title\" translate>Noticeable</h4>\n          </div>\n          <div class=\"modal-body\">\n            <p translate>DeleteDeviceConfirmMessage</p>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-default pull-left\" data-dismiss=\"modal\" translate>No</button>\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"doDelete()\" translate>Yse</button>\n          </div>\n        </div>\n        <!-- /.modal-content -->\n      </div>\n      <!-- /.modal-dialog -->\n    </div>\n\n\n\n  </section><!-- /.content -->\n</div><!-- /.content-wrapper -->\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/manager/user-roles/user-roles.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/manager/user-roles/user-roles.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\r\n<div class=\"content-wrapper\">\r\n  <!-- Content Header (Page header) -->\r\n  <section class=\"content-header\">\r\n    <h1>\r\n      <h2>تنظیم نقش کاربر </h2>\r\n    </h1>\r\n    <ol class=\"breadcrumb\">\r\n      <li><a [routerLink]=\"['']\" translate><i class=\"fa fa-dashboard\"></i>Home</a></li>\r\n      <li class=\"active\" translate>نقش کاربری</li>\r\n    </ol>\r\n  </section>\r\n  <!--<app-breadcrumb></app-breadcrumb>-->\r\n  <!-- Main content -->\r\n  <section class=\"content\">\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12\">\r\n        <div class=\"box box-primary\">\r\n          <div class=\"box-body\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <mat-form-field>\r\n                  <mat-label translate>Search</mat-label>\r\n                  <input matInput #input [(ngModel)]=\"search\">\r\n                </mat-form-field>\r\n              </div>\r\n            </div>\r\n            <form [formGroup]=\"asignRoleForm\" (ngSubmit)=\"submit()\">\r\n              <ul>\r\n                <li *ngFor=\"let d of rlsFormArray.controls; let i=index\">\r\n                  <label>\r\n                    <input type=\"checkbox\" [value]=\"d.value.id\" \r\n                           checked=\"{{d.value.selected==true?'checked':''}}\"\r\n                           (change)=\"onCheckboxChange($event)\" /> {{d.value.title}}\r\n                  </label>\r\n                </li>\r\n              </ul>\r\n              <button class=\"btn btn-primary\" translate>submit</button>\r\n              <button class=\"btn btn-danger \" (click)=\"cancel()\" translate>Cancel</button>\r\n            </form>\r\n          </div><!-- /.box-body -->\r\n          <div class=\"overlay\" *ngIf=\"showloader \">\r\n            <i class=\"fa fa-refresh fa-spin\"></i>\r\n          </div>\r\n        </div><!-- /.box -->\r\n      </div><!-- /.col -->\r\n    </div><!-- /.row -->\r\n  </section><!-- /.content -->\r\n</div><!-- /.content-wrapper -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/manager/useredit/useredit.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/manager/useredit/useredit.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>roleedit works!</p>\n<div class=\"box box-primary\">\n  <form [formGroup]=\"usrForm\" (ngSubmit)=\"Save()\" #formDir=\"ngForm\" novalidate>\n    <div class=\"box-body \">\n      <div class=\"row\">\n        <div class=\"col-lg-6\">\n          <div class=\"form-group\">\n            <label for=\"firstName\" class=\"col-sm-3 control-label\">\n              <span class=\"text-danger\">*</span>\n              <span translate>FirstName</span>:\n            </label>\n            <div class=\"col-sm-9\">\n              <input class=\"form-control\" type=\"text\" formControlName=\"firstName\" required>\n              <span class=\"text-danger\" *ngIf=\"firstName?.invalid && ( firstName.touched || formDir.submitted)\" translate>FirstNameIsRequired</span>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-6\">\n          <div class=\"form-group\">\n            <label for=\"lastName\" class=\"col-sm-3 control-label\">\n              <span class=\"text-danger\">* </span>\n              <span translate>LastName</span>:\n            </label>\n            <div class=\"col-sm-9\">\n              <input class=\"form-control\" type=\"text\" formControlName=\"lastName\" required>\n              <span class=\"text-danger\" *ngIf=\"lastName?.invalid && ( lastName.touched || formDir.submitted)\" translate>LastNameIsRequired</span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-lg-6\">\n          <div class=\"form-group\">\n            <label for=\"userName\" class=\"col-sm-3 control-label\">\n              <span class=\"text-danger\">*</span>\n              <span translate>UserName</span>:\n            </label>\n            <div class=\"col-sm-9\">\n              <input class=\"form-control\" type=\"text\" formControlName=\"userName\" required>\n              <span class=\"text-danger\" *ngIf=\"userName?.invalid && ( userName.touched || formDir.submitted)\" translate>userNameIsRequired</span>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-6\">\n          <div class=\"form-group\">\n            <label for=\"email\" class=\"col-sm-3 control-label\">\n              <span class=\"text-danger\">*</span>\n              <span translate>Email</span>:\n            </label>\n            <div class=\"col-sm-9\">\n              <input class=\"form-control\" type=\"text\" formControlName=\"email\" required>\n              <span class=\"text-danger\" *ngIf=\"email?.invalid && ( email.touched || formDir.submitted)\" translate>emailIsRequired</span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"row\" [hidden]=\"formTitle=='Edit'\">\n        <div class=\"col-lg-6\">\n          <div class=\"form-group\">\n            <label for=\"pasword\" class=\"col-sm-3 control-label\">\n              <span class=\"text-danger\">*</span>\n              <span translate>Password</span>:\n            </label>\n            <div class=\"col-sm-9\">\n              <input class=\"form-control\" type=\"text\" formControlName=\"password\" required>\n              <span class=\"text-danger\" *ngIf=\"password?.invalid && ( password.touched || formDir.submitted)\" translate>passwordIsRequired</span>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-lg-6\">\n          <div class=\"form-group\">\n            <label for=\"confirmPassword\" class=\"col-sm-3 control-label\">\n              <span class=\"text-danger\">*</span>\n              <span translate>ConfirmPassword</span>:\n            </label>\n            <div class=\"col-sm-9\">\n              <input class=\"form-control\" type=\"text\" formControlName=\"confirmPassword\" required>\n              <span class=\"text-danger\" *ngIf=\"confirmPassword?.invalid && ( confirmPassword.touched || formDir.submitted)\" translate>confirmPasswordIsRequired</span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"box-footer\">\n      <button class=\"btn btn-danger  rowEndAligne\" (click)=\"cancel()\" translate>Cancel</button>\n      <button type=\"submit\" class=\"btn btn-primary  rowEndAligne\" translate>Save</button>\n    </div><!-- /.box-footer -->\n  </form>\n</div>\n"

/***/ }),

/***/ "./node_modules/rxjs/internal/operators/map.js":
/*!*****************************************************!*\
  !*** ./node_modules/rxjs/internal/operators/map.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Subscriber_1 = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/internal/Subscriber.js");
function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
exports.map = map;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
exports.MapOperator = MapOperator;
var MapSubscriber = (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "./src/app/Shared/services/manager.service.ts":
/*!****************************************************!*\
  !*** ./src/app/Shared/services/manager.service.ts ***!
  \****************************************************/
/*! exports provided: ManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerService", function() { return ManagerService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ManagerService = class ManagerService {
    constructor(_http) {
        this._http = _http;
    }
    getUsers() {
        return this._http.get('api/UsersManager/Index');
    }
    AddUser(newUser) {
        return this._http.post('api/UsersManager/Register', newUser);
    }
    getUserById(id) {
        return this._http.get('api/UsersManager/GetUserById/' + id);
    }
    UpdateUser(updateUser) {
        var body = {
            firstName: updateUser.firstName,
            lastName: updateUser.lastName,
            id: updateUser.id,
            email: updateUser.email,
            userName: updateUser.userName
        };
        return this._http.put('api/UsersManager/Edit/', body);
    }
    UpdatePassword(newpass) {
        return this._http.post('api/UsersManager/ChangePassword', newpass);
    }
    GetRoleAsignToUser(id) {
        return this._http.get('api/UsersManager/userRoles/' + id);
    }
    UpdateUserRole(userId, rolesId) {
        return this._http.put('api/UsersManager/ChangeUserRoles/' + userId, rolesId);
    }
    /************ */
    getRole() {
        return this._http.get('api/RoleManager/Index').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(_ => console.log("list of roles")));
    }
    getRoleById(id) {
        return this._http.get("api/RoleManager/GetRoleById/" + id);
    }
    getAccess(roleId) {
        return this._http.get('api/RoleManager/AccessControl?id=' + roleId);
    }
    updateRoleAccess(roleId, actions) {
        return this._http.post('api/RoleManager/UpdateAccess/' + roleId, actions);
    }
    AddRole(newRole) {
        return this._http.post('api/RoleManager/Create', newRole);
    }
    UpdateRole(newRole) {
        return this._http.post('api/RoleManager/Edit', newRole);
    }
    DeleteRole(id) {
        return this._http.delete('api/RoleManager/Delete/' + id);
    }
};
ManagerService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] }
];
ManagerService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
], ManagerService);



/***/ }),

/***/ "./src/app/manager/manager-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/manager/manager-routing.module.ts ***!
  \***************************************************/
/*! exports provided: ManagerRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerRoutingModule", function() { return ManagerRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _role_access_role_access_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./role-access/role-access.component */ "./src/app/manager/role-access/role-access.component.ts");
/* harmony import */ var _role_manager_role_manager_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./role-manager/role-manager.component */ "./src/app/manager/role-manager/role-manager.component.ts");
/* harmony import */ var _user_manager_user_manager_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user-manager/user-manager.component */ "./src/app/manager/user-manager/user-manager.component.ts");
/* harmony import */ var _roleedit_roleedit_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./roleedit/roleedit.component */ "./src/app/manager/roleedit/roleedit.component.ts");
/* harmony import */ var _useredit_useredit_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useredit/useredit.component */ "./src/app/manager/useredit/useredit.component.ts");
/* harmony import */ var _user_change_pass_user_change_pass_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user-change-pass/user-change-pass.component */ "./src/app/manager/user-change-pass/user-change-pass.component.ts");
/* harmony import */ var _user_roles_user_roles_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./user-roles/user-roles.component */ "./src/app/manager/user-roles/user-roles.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









const routes = [{
        path: '',
        children: [
            { path: '', component: _user_manager_user_manager_component__WEBPACK_IMPORTED_MODULE_4__["UserManagerComponent"] },
            { path: 'Users/Create', component: _useredit_useredit_component__WEBPACK_IMPORTED_MODULE_6__["UsereditComponent"] },
            { path: 'Users/Edit/:id', component: _useredit_useredit_component__WEBPACK_IMPORTED_MODULE_6__["UsereditComponent"] },
            { path: 'Users/ChangePassword/:id', component: _user_change_pass_user_change_pass_component__WEBPACK_IMPORTED_MODULE_7__["UserChangePassComponent"] },
            { path: 'Users/AsginRole/:id', component: _user_roles_user_roles_component__WEBPACK_IMPORTED_MODULE_8__["UserRolesComponent"] },
            { path: 'Roles', component: _role_manager_role_manager_component__WEBPACK_IMPORTED_MODULE_3__["RoleManagerComponent"] },
            { path: 'Roles/Create', component: _roleedit_roleedit_component__WEBPACK_IMPORTED_MODULE_5__["RoleeditComponent"] },
            { path: 'Roles/Edit/:id', component: _roleedit_roleedit_component__WEBPACK_IMPORTED_MODULE_5__["RoleeditComponent"] },
            { path: 'Roles/Access/:id', component: _role_access_role_access_component__WEBPACK_IMPORTED_MODULE_2__["RoleAccessComponent"] }
        ]
    }];
let ManagerRoutingModule = class ManagerRoutingModule {
};
ManagerRoutingModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })
], ManagerRoutingModule);



/***/ }),

/***/ "./src/app/manager/manager.module.ts":
/*!*******************************************!*\
  !*** ./src/app/manager/manager.module.ts ***!
  \*******************************************/
/*! exports provided: ManagerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerModule", function() { return ManagerModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _Shared_shared_modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../Shared/shared.modules */ "./src/app/Shared/shared.modules.ts");
/* harmony import */ var _manager_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./manager-routing.module */ "./src/app/manager/manager-routing.module.ts");
/* harmony import */ var _role_manager_role_manager_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./role-manager/role-manager.component */ "./src/app/manager/role-manager/role-manager.component.ts");
/* harmony import */ var _user_manager_user_manager_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-manager/user-manager.component */ "./src/app/manager/user-manager/user-manager.component.ts");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm2015/form-field.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm2015/table.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm2015/paginator.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm2015/input.js");
/* harmony import */ var _role_access_role_access_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./role-access/role-access.component */ "./src/app/manager/role-access/role-access.component.ts");
/* harmony import */ var _roleedit_roleedit_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./roleedit/roleedit.component */ "./src/app/manager/roleedit/roleedit.component.ts");
/* harmony import */ var _useredit_useredit_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./useredit/useredit.component */ "./src/app/manager/useredit/useredit.component.ts");
/* harmony import */ var _user_change_pass_user_change_pass_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./user-change-pass/user-change-pass.component */ "./src/app/manager/user-change-pass/user-change-pass.component.ts");
/* harmony import */ var _user_roles_user_roles_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./user-roles/user-roles.component */ "./src/app/manager/user-roles/user-roles.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















let ManagerModule = class ManagerModule {
};
ManagerModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
        declarations: [_role_manager_role_manager_component__WEBPACK_IMPORTED_MODULE_4__["RoleManagerComponent"], _user_manager_user_manager_component__WEBPACK_IMPORTED_MODULE_5__["UserManagerComponent"], _role_access_role_access_component__WEBPACK_IMPORTED_MODULE_10__["RoleAccessComponent"], _roleedit_roleedit_component__WEBPACK_IMPORTED_MODULE_11__["RoleeditComponent"], _useredit_useredit_component__WEBPACK_IMPORTED_MODULE_12__["UsereditComponent"], _user_change_pass_user_change_pass_component__WEBPACK_IMPORTED_MODULE_13__["UserChangePassComponent"], _user_roles_user_roles_component__WEBPACK_IMPORTED_MODULE_14__["UserRolesComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _Shared_shared_modules__WEBPACK_IMPORTED_MODULE_2__["sharedModule"],
            _manager_routing_module__WEBPACK_IMPORTED_MODULE_3__["ManagerRoutingModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__["MatPaginatorModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_9__["MatInputModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"]
        ]
    })
], ManagerModule);



/***/ }),

/***/ "./src/app/manager/role-access/role-access.component.css":
/*!***************************************************************!*\
  !*** ./src/app/manager/role-access/role-access.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hbmFnZXIvcm9sZS1hY2Nlc3Mvcm9sZS1hY2Nlc3MuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/manager/role-access/role-access.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/manager/role-access/role-access.component.ts ***!
  \**************************************************************/
/*! exports provided: RoleAccessComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleAccessComponent", function() { return RoleAccessComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/Shared/services/manager.service */ "./src/app/Shared/services/manager.service.ts");
/* harmony import */ var rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/internal/operators/map */ "./node_modules/rxjs/internal/operators/map.js");
/* harmony import */ var rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let RoleAccessComponent = class RoleAccessComponent {
    constructor(_avRoute, _manager, _router, _fb) {
        this._avRoute = _avRoute;
        this._manager = _manager;
        this._router = _router;
        this._fb = _fb;
        this.checkedArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormArray"]([]);
        this.controllers = [];
        if (this._avRoute.snapshot.params['id']) {
            this.selectedRoleId = this._avRoute.snapshot.params['id'];
        }
        this.AccessForm = this._fb.group({
            acts: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormArray"]([])
        });
        this.DynamicCtrl();
    }
    ngOnInit() {
    }
    DynamicCtrl() {
        this._manager.getAccess(this.selectedRoleId).pipe(Object(rxjs_internal_operators_map__WEBPACK_IMPORTED_MODULE_3__["map"])(data => {
            for (let k in data["securedControllerActions"]) {
                let curActions = data["securedControllerActions"][k]["mvcActions"];
                let act = [];
                for (let j in curActions) {
                    if (curActions[j]["actionDisplayName"] != null && curActions[j]["actionDisplayName"] != "") {
                        var claims = data["roleIncludeRoleClaims"].claims;
                        let iSselected = false;
                        claims.forEach((tmp, key) => {
                            if (tmp["claimType"] == "dynKkomAuthorizationClaimType" &&
                                tmp["claimValue"] == curActions[j]["actionId"])
                                iSselected = true;
                        });
                        act.push({ actionName: curActions[j]["actionDisplayName"], actionId: curActions[j]["actionId"], selected: iSselected ? "Checked" : "" });
                    }
                }
                var ctr = {
                    disp: data["securedControllerActions"][k]["controllerDisplayName"],
                    controllerId: data["securedControllerActions"][k]["controllerName"],
                    actions: act
                };
                this.controllers.push(ctr);
            }
            return data;
        }))
            .subscribe(poco => {
            this.access = poco;
            //console.log(this.access);
            this.selectedRoleName = this.access.roleIncludeRoleClaims.name;
            this.addCheckboxes();
        });
    }
    submit() {
        var dd = [];
        this.checkedArray.controls.forEach((key, value) => {
            //alert(key.value);
            dd.push(key.value);
        });
        this._manager.updateRoleAccess(+this.selectedRoleId, dd).subscribe(data => {
            alert("بروزرسانی گردید");
        });
        ;
    }
    addCheckboxes() {
        this.controllers.forEach((item, ind) => {
            this.actsFormArray.push(new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]({ 'disp': item["disp"], 'controllerId': item["controllerId"], 'actions': item["actions"] }));
        });
    }
    get actsFormArray() {
        return this.AccessForm.controls.acts;
    }
    onCheckboxChange(e) {
        if (e.target.checked) {
            this.checkedArray.push(new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](e.target.value));
        }
        else {
            let i = 0;
            this.checkedArray.controls.forEach((item) => {
                if (item.value == e.target.value) {
                    this.checkedArray.removeAt(i);
                    return;
                }
                i++;
            });
        }
    }
    cancel() {
        this._router.navigate(['manager', 'Roles']);
    }
};
RoleAccessComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
    { type: src_app_Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_2__["ManagerService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] }
];
RoleAccessComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-role-access',
        template: __webpack_require__(/*! raw-loader!./role-access.component.html */ "./node_modules/raw-loader/index.js!./src/app/manager/role-access/role-access.component.html"),
        providers: [src_app_Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_2__["ManagerService"]],
        styles: [__webpack_require__(/*! ./role-access.component.css */ "./src/app/manager/role-access/role-access.component.css")]
    }),
    __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
        src_app_Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_2__["ManagerService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]])
], RoleAccessComponent);



/***/ }),

/***/ "./src/app/manager/role-manager/role-manager.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/manager/role-manager/role-manager.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hbmFnZXIvcm9sZS1tYW5hZ2VyL3JvbGUtbWFuYWdlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/manager/role-manager/role-manager.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/manager/role-manager/role-manager.component.ts ***!
  \****************************************************************/
/*! exports provided: RoleManagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleManagerComponent", function() { return RoleManagerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm2015/table.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var _Shared_services_Language_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../Shared/services/Language.service */ "./src/app/Shared/services/Language.service.ts");
/* harmony import */ var _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../Shared/services/manager.service */ "./src/app/Shared/services/manager.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let RoleManagerComponent = class RoleManagerComponent {
    constructor(_manager, toastrService, translate, langService) {
        this._manager = _manager;
        this.toastrService = toastrService;
        this.translate = translate;
        this.langService = langService;
        this.displayedColumns = ['index', 'name', 'description', 'UserCount', 'actions'];
        this.filter = '';
        this.showloader = false;
        this.getRoles();
    }
    getRoles() {
        this.showloader = true;
        this._manager.getRole().subscribe(data => {
            this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort1;
            this.showloader = false;
        });
    }
    ngOnInit() {
    }
    applyFilter(event) {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    doDelete(elem) {
        this.showloader = true;
        this._manager.DeleteRole(elem.id).subscribe(x => {
            alert(elem);
            this.showloader = false;
            this.getRoles();
        }, err => { console.log(err); });
    }
};
RoleManagerComponent.ctorParameters = () => [
    { type: _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_6__["ManagerService"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateService"] },
    { type: _Shared_services_Language_service__WEBPACK_IMPORTED_MODULE_5__["LanguageService"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
    __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
], RoleManagerComponent.prototype, "paginator", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
    __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
], RoleManagerComponent.prototype, "sortAll", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sort1', { static: true }),
    __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
], RoleManagerComponent.prototype, "sort1", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sort2', { static: true }),
    __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
], RoleManagerComponent.prototype, "sort2", void 0);
RoleManagerComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-rolemanager',
        template: __webpack_require__(/*! raw-loader!./role-manager.component.html */ "./node_modules/raw-loader/index.js!./src/app/manager/role-manager/role-manager.component.html"),
        providers: [_Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_6__["ManagerService"]],
        styles: [__webpack_require__(/*! ./role-manager.component.css */ "./src/app/manager/role-manager/role-manager.component.css")]
    }),
    __metadata("design:paramtypes", [_Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_6__["ManagerService"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateService"],
        _Shared_services_Language_service__WEBPACK_IMPORTED_MODULE_5__["LanguageService"]])
], RoleManagerComponent);



/***/ }),

/***/ "./src/app/manager/roleedit/roleedit.component.css":
/*!*********************************************************!*\
  !*** ./src/app/manager/roleedit/roleedit.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hbmFnZXIvcm9sZWVkaXQvcm9sZWVkaXQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/manager/roleedit/roleedit.component.ts":
/*!********************************************************!*\
  !*** ./src/app/manager/roleedit/roleedit.component.ts ***!
  \********************************************************/
/*! exports provided: RoleeditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleeditComponent", function() { return RoleeditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Shared/services/manager.service */ "./src/app/Shared/services/manager.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let RoleeditComponent = class RoleeditComponent {
    constructor(_fb, _avRoute, _router, _manager) {
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._router = _router;
        this._manager = _manager;
        this.formTitle = "Create";
        this.breadcroumb = "CreateRole";
        if (this._avRoute.snapshot.params['id']) {
            this.id = this._avRoute.snapshot.params['id'];
        }
        this.roleForm = this._fb.group({
            id: 0,
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            description: ['']
        });
    }
    ngOnInit() {
        if (this.id > 0) {
            this.formTitle = 'Edit';
            this.breadcroumb = 'EditRole';
            this._manager.getRoleById(this.id).subscribe(res => {
                this.roleForm.get('name').setValue(res['name']);
                this.roleForm.get('description').setValue(res['description']);
            }, err => { console.log(err); });
        }
    }
    Save() {
        if (!this.roleForm.valid) {
            return;
        }
        if (this.formTitle === 'Create') {
            this._manager.AddRole(this.roleForm.value).subscribe(data => { alert("نقش مورد نظر ایجاد گردید"); });
        }
        else if (this.formTitle == 'Edit') {
            this.roleForm.get('id').setValue(this.id); //set id 
            this._manager.UpdateRole(this.roleForm.value).subscribe(data => { alert("نقش مورد نظر ویرایش گردید"); });
        }
    }
    cancel() {
        this._router.navigate(['manager', 'Roles']);
    }
};
RoleeditComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__["ManagerService"] }
];
RoleeditComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-roleedit',
        template: __webpack_require__(/*! raw-loader!./roleedit.component.html */ "./node_modules/raw-loader/index.js!./src/app/manager/roleedit/roleedit.component.html"),
        providers: [_Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__["ManagerService"]],
        styles: [__webpack_require__(/*! ./roleedit.component.css */ "./src/app/manager/roleedit/roleedit.component.css")]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__["ManagerService"]])
], RoleeditComponent);



/***/ }),

/***/ "./src/app/manager/user-change-pass/user-change-pass.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/manager/user-change-pass/user-change-pass.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hbmFnZXIvdXNlci1jaGFuZ2UtcGFzcy91c2VyLWNoYW5nZS1wYXNzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/manager/user-change-pass/user-change-pass.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/manager/user-change-pass/user-change-pass.component.ts ***!
  \************************************************************************/
/*! exports provided: UserChangePassComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserChangePassComponent", function() { return UserChangePassComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Shared/services/manager.service */ "./src/app/Shared/services/manager.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let UserChangePassComponent = class UserChangePassComponent {
    constructor(_fb, _router, _avRouted, _manager) {
        this._fb = _fb;
        this._router = _router;
        this._avRouted = _avRouted;
        this._manager = _manager;
        this.formTitle = "Change Password";
        if (this._avRouted.snapshot.params['id']) {
            this.id = this._avRouted.snapshot.params['id'];
        }
        this.passChangeForm = this._fb.group({
            id: 0,
            newPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    ngOnInit() {
    }
    Save() {
        if (!this.passChangeForm.valid) {
            return;
        }
        this.passChangeForm.get('id').setValue(this.id);
        this._manager.UpdatePassword(this.passChangeForm.value).subscribe(res => {
            alert(res["msg"]);
            this._router.navigate(['manager']);
        }, err => { console.log(err); });
    }
    cancel() {
        this._router.navigate(['manager']);
    }
};
UserChangePassComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__["ManagerService"] }
];
UserChangePassComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-user-change-pass',
        template: __webpack_require__(/*! raw-loader!./user-change-pass.component.html */ "./node_modules/raw-loader/index.js!./src/app/manager/user-change-pass/user-change-pass.component.html"),
        providers: [_Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__["ManagerService"]],
        styles: [__webpack_require__(/*! ./user-change-pass.component.css */ "./src/app/manager/user-change-pass/user-change-pass.component.css")]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__["ManagerService"]])
], UserChangePassComponent);



/***/ }),

/***/ "./src/app/manager/user-manager/user-manager.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/manager/user-manager/user-manager.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hbmFnZXIvdXNlci1tYW5hZ2VyL3VzZXItbWFuYWdlci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/manager/user-manager/user-manager.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/manager/user-manager/user-manager.component.ts ***!
  \****************************************************************/
/*! exports provided: UserManagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserManagerComponent", function() { return UserManagerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../Shared/services/manager.service */ "./src/app/Shared/services/manager.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let UserManagerComponent = class UserManagerComponent {
    constructor(_manager) {
        this._manager = _manager;
        this.displayedColumns = ['index', 'FirstName', 'LastName', 'IsActive', 'actions'];
        this.filter = '';
        this.showloader = false;
        this.getUsers();
    }
    getUsers() {
        this.showloader = true;
        this._manager.getUsers().subscribe(data => {
            //this.users = <any>data;
            this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](data["users"]);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort1;
            this.showloader = false;
        });
    }
    ngOnInit() {
    }
    applyFilter(event) {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
};
UserManagerComponent.ctorParameters = () => [
    { type: _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_1__["ManagerService"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"], { static: true }),
    __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
], UserManagerComponent.prototype, "paginator", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sort1', { static: true }),
    __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
], UserManagerComponent.prototype, "sort1", void 0);
UserManagerComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-usermanager',
        template: __webpack_require__(/*! raw-loader!./user-manager.component.html */ "./node_modules/raw-loader/index.js!./src/app/manager/user-manager/user-manager.component.html"),
        providers: [_Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_1__["ManagerService"]],
        styles: [__webpack_require__(/*! ./user-manager.component.css */ "./src/app/manager/user-manager/user-manager.component.css")]
    }),
    __metadata("design:paramtypes", [_Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_1__["ManagerService"]])
], UserManagerComponent);



/***/ }),

/***/ "./src/app/manager/user-roles/user-roles.component.css":
/*!*************************************************************!*\
  !*** ./src/app/manager/user-roles/user-roles.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hbmFnZXIvdXNlci1yb2xlcy91c2VyLXJvbGVzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/manager/user-roles/user-roles.component.ts":
/*!************************************************************!*\
  !*** ./src/app/manager/user-roles/user-roles.component.ts ***!
  \************************************************************/
/*! exports provided: UserRolesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRolesComponent", function() { return UserRolesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Shared/services/manager.service */ "./src/app/Shared/services/manager.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let UserRolesComponent = class UserRolesComponent {
    constructor(_fb, _router, _avRouted, _manager) {
        this._fb = _fb;
        this._router = _router;
        this._avRouted = _avRouted;
        this._manager = _manager;
        if (this._avRouted.snapshot.params['id']) {
            this.id = this._avRouted.snapshot.params['id'];
        }
        this.asignRoleForm = this._fb.group({
            rls: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([])
        });
        this._manager.GetRoleAsignToUser(this.id).subscribe(res => {
            res["roles"].forEach((value, index) => {
                this.checkedArray = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"]([]);
                this.rlsFormArray.push(new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]({
                    'id': value['id'],
                    'title': value['name'],
                    'selected': value['selected']
                }));
                if (value['selected'] == true) {
                    this.checkedArray.push(new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]({
                        'id': value['id'],
                        'title': value['name'],
                        'selected': value['selected']
                    }));
                }
            });
            return res;
        });
    }
    ngOnInit() { }
    get rlsFormArray() {
        return this.asignRoleForm.controls.rls;
    }
    onCheckboxChange(e) {
        if (e.target.checked) {
            this.checkedArray.push(new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](e.target.value));
        }
        else {
            let i = 0;
            this.checkedArray.controls.forEach((item) => {
                if (item.value == e.target.value) {
                    this.checkedArray.removeAt(i);
                    return;
                }
                i++;
            });
        }
    }
    cancel() {
        this._router.navigate(['manager']);
    }
    submit() {
        var dd = [];
        this.checkedArray.controls.forEach((key, value) => {
            dd.push(key.value);
        });
        this._manager.UpdateUserRole(+this.id, dd).subscribe(data => {
            alert(data["msg"]);
            this._router.navigate(['manager']);
        });
        ;
    }
};
UserRolesComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__["ManagerService"] }
];
UserRolesComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-user-roles',
        template: __webpack_require__(/*! raw-loader!./user-roles.component.html */ "./node_modules/raw-loader/index.js!./src/app/manager/user-roles/user-roles.component.html"),
        providers: [_Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__["ManagerService"]],
        styles: [__webpack_require__(/*! ./user-roles.component.css */ "./src/app/manager/user-roles/user-roles.component.css")]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__["ManagerService"]])
], UserRolesComponent);



/***/ }),

/***/ "./src/app/manager/useredit/useredit.component.css":
/*!*********************************************************!*\
  !*** ./src/app/manager/useredit/useredit.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21hbmFnZXIvdXNlcmVkaXQvdXNlcmVkaXQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/manager/useredit/useredit.component.ts":
/*!********************************************************!*\
  !*** ./src/app/manager/useredit/useredit.component.ts ***!
  \********************************************************/
/*! exports provided: UsereditComponent, forbiddenNameValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsereditComponent", function() { return UsereditComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forbiddenNameValidator", function() { return forbiddenNameValidator; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Shared/services/manager.service */ "./src/app/Shared/services/manager.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let UsereditComponent = class UsereditComponent {
    constructor(_fb, _avRoute, _router, _manager) {
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._router = _router;
        this._manager = _manager;
        this.formTitle = "Create";
        this.breadcroumb = "CreateRole";
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
        }
        this.usrForm = this._fb.group({
            id: 0,
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            userName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: ['info@info.ir', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            confirmPassword: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    }
    ngOnInit() {
        if (this.id > 0) {
            this.formTitle = 'Edit';
            this.breadcroumb = 'EditUser';
            this._manager.getUserById(this.id).subscribe(res => {
                this.usrForm.get('firstName').setValue(res['firstName']);
                this.usrForm.get('lastName').setValue(res['lastName']);
                this.usrForm.get('userName').setValue(res['userName']);
                this.usrForm.get('email').setValue(res['email']);
                //password donot show in Edit mode... 
                this.usrForm.get('password').setValue('noChange');
                this.usrForm.get('confirmPassword').setValue('noChange');
            }, err => { console.log(err); });
        }
    }
    Save() {
        if (!this.usrForm.valid) {
            return;
        }
        if (this.formTitle === 'Create') {
            this._manager.AddUser(this.usrForm.value).subscribe(data => {
                alert("کاربر جدید ایجاد گردید");
            });
        }
        else if (this.formTitle == 'Edit') {
            this.usrForm.get('id').setValue(this.id); //set id 
            this._manager.UpdateUser(this.usrForm.value).subscribe(data => {
                alert("کاربر مورد نظر ویرایش گردید");
                this._router.navigate(['manager']);
            });
        }
    }
    cancel() {
        this._router.navigate(['manager']);
    }
};
UsereditComponent.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__["ManagerService"] }
];
UsereditComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-useredit',
        template: __webpack_require__(/*! raw-loader!./useredit.component.html */ "./node_modules/raw-loader/index.js!./src/app/manager/useredit/useredit.component.html"),
        providers: [_Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__["ManagerService"]],
        styles: [__webpack_require__(/*! ./useredit.component.css */ "./src/app/manager/useredit/useredit.component.css")]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _Shared_services_manager_service__WEBPACK_IMPORTED_MODULE_3__["ManagerService"]])
], UsereditComponent);

function forbiddenNameValidator(nameRe) {
    return (control) => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
}


/***/ })

}]);
//# sourceMappingURL=manager-manager-module-es2015.js.map