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
var UsereditComponent = /** @class */ (function () {
    function UsereditComponent(_fb, _avRoute, _router, _manager) {
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
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userName: ['', Validators.required],
            email: ['info@info.ir', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });
    }
    UsereditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.id > 0) {
            this.formTitle = 'Edit';
            this.breadcroumb = 'EditUser';
            this._manager.getUserById(this.id).subscribe(function (res) {
                _this.usrForm.get('firstName').setValue(res['firstName']);
                _this.usrForm.get('lastName').setValue(res['lastName']);
                _this.usrForm.get('userName').setValue(res['userName']);
                _this.usrForm.get('email').setValue(res['email']);
                //password donot show in Edit mode... 
                _this.usrForm.get('password').setValue('noChange');
                _this.usrForm.get('confirmPassword').setValue('noChange');
            }, function (err) { console.log(err); });
        }
    };
    UsereditComponent.prototype.Save = function () {
        var _this = this;
        if (!this.usrForm.valid) {
            return;
        }
        if (this.formTitle === 'Create') {
            this._manager.AddUser(this.usrForm.value).subscribe(function (data) {
                alert("کاربر جدید ایجاد گردید");
            });
        }
        else if (this.formTitle == 'Edit') {
            this.usrForm.get('id').setValue(this.id); //set id 
            this._manager.UpdateUser(this.usrForm.value).subscribe(function (data) {
                alert("کاربر مورد نظر ویرایش گردید");
                _this._router.navigate(['manager']);
            });
        }
    };
    UsereditComponent.prototype.cancel = function () {
        this._router.navigate(['manager']);
    };
    UsereditComponent = __decorate([
        Component({
            selector: 'app-useredit',
            templateUrl: './useredit.component.html',
            styleUrls: ['./useredit.component.css'],
            providers: [ManagerService]
        }),
        __metadata("design:paramtypes", [FormBuilder,
            ActivatedRoute, Router,
            ManagerService])
    ], UsereditComponent);
    return UsereditComponent;
}());
export { UsereditComponent };
export function forbiddenNameValidator(nameRe) {
    return function (control) {
        var forbidden = nameRe.test(control.value);
        return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
}
//# sourceMappingURL=useredit.component.js.map