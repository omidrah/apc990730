var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../Shared/services/manager.service';
var RoleeditComponent = /** @class */ (function () {
    function RoleeditComponent(_fb, _avRoute, _router, _manager) {
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
            name: ['', [Validators.required]],
            description: ['']
        });
    }
    RoleeditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.id > 0) {
            this.formTitle = 'Edit';
            this.breadcroumb = 'EditRole';
            this._manager.getRoleById(this.id).subscribe(function (res) {
                _this.roleForm.get('name').setValue(res['name']);
                _this.roleForm.get('description').setValue(res['description']);
            }, function (err) { console.log(err); });
        }
    };
    RoleeditComponent.prototype.Save = function () {
        if (!this.roleForm.valid) {
            return;
        }
        if (this.formTitle === 'Create') {
            this._manager.AddRole(this.roleForm.value).subscribe(function (data) { alert("نقش مورد نظر ایجاد گردید"); });
        }
        else if (this.formTitle == 'Edit') {
            this.roleForm.get('id').setValue(this.id); //set id 
            this._manager.UpdateRole(this.roleForm.value).subscribe(function (data) { alert("نقش مورد نظر ویرایش گردید"); });
        }
    };
    RoleeditComponent.prototype.cancel = function () {
        this._router.navigate(['manager', 'Roles']);
    };
    RoleeditComponent = __decorate([
        Component({
            selector: 'app-roleedit',
            templateUrl: './roleedit.component.html',
            styleUrls: ['./roleedit.component.css'],
            providers: [ManagerService]
        }),
        __metadata("design:paramtypes", [FormBuilder,
            ActivatedRoute,
            Router,
            ManagerService])
    ], RoleeditComponent);
    return RoleeditComponent;
}());
export { RoleeditComponent };
//# sourceMappingURL=roleedit.component.js.map