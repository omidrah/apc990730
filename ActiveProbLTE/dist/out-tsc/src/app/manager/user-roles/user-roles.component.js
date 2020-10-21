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
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../Shared/services/manager.service';
var UserRolesComponent = /** @class */ (function () {
    function UserRolesComponent(_fb, _router, _avRouted, _manager) {
        var _this = this;
        this._fb = _fb;
        this._router = _router;
        this._avRouted = _avRouted;
        this._manager = _manager;
        if (this._avRouted.snapshot.params['id']) {
            this.id = this._avRouted.snapshot.params['id'];
        }
        this.asignRoleForm = this._fb.group({
            rls: new FormArray([])
        });
        this._manager.GetRoleAsignToUser(this.id).subscribe(function (res) {
            res["roles"].forEach(function (value, index) {
                _this.checkedArray = new FormArray([]);
                _this.rlsFormArray.push(new FormControl({
                    'id': value['id'],
                    'title': value['name'],
                    'selected': value['selected']
                }));
                if (value['selected'] == true) {
                    _this.checkedArray.push(new FormControl({
                        'id': value['id'],
                        'title': value['name'],
                        'selected': value['selected']
                    }));
                }
            });
            return res;
        });
    }
    UserRolesComponent.prototype.ngOnInit = function () { };
    Object.defineProperty(UserRolesComponent.prototype, "rlsFormArray", {
        get: function () {
            return this.asignRoleForm.controls.rls;
        },
        enumerable: false,
        configurable: true
    });
    UserRolesComponent.prototype.onCheckboxChange = function (e) {
        var _this = this;
        if (e.target.checked) {
            this.checkedArray.push(new FormControl(e.target.value));
        }
        else {
            var i_1 = 0;
            this.checkedArray.controls.forEach(function (item) {
                if (item.value == e.target.value) {
                    _this.checkedArray.removeAt(i_1);
                    return;
                }
                i_1++;
            });
        }
    };
    UserRolesComponent.prototype.cancel = function () {
        this._router.navigate(['manager']);
    };
    UserRolesComponent.prototype.submit = function () {
        var _this = this;
        var dd = [];
        this.checkedArray.controls.forEach(function (key, value) {
            dd.push(key.value);
        });
        this._manager.UpdateUserRole(+this.id, dd).subscribe(function (data) {
            alert(data["msg"]);
            _this._router.navigate(['manager']);
        });
        ;
    };
    UserRolesComponent = __decorate([
        Component({
            selector: 'app-user-roles',
            templateUrl: './user-roles.component.html',
            styleUrls: ['./user-roles.component.css'],
            providers: [ManagerService]
        }),
        __metadata("design:paramtypes", [FormBuilder, Router,
            ActivatedRoute, ManagerService])
    ], UserRolesComponent);
    return UserRolesComponent;
}());
export { UserRolesComponent };
//# sourceMappingURL=user-roles.component.js.map