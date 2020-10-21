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
var UserChangePassComponent = /** @class */ (function () {
    function UserChangePassComponent(_fb, _router, _avRouted, _manager) {
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
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });
    }
    UserChangePassComponent.prototype.ngOnInit = function () {
    };
    UserChangePassComponent.prototype.Save = function () {
        var _this = this;
        if (!this.passChangeForm.valid) {
            return;
        }
        this.passChangeForm.get('id').setValue(this.id);
        this._manager.UpdatePassword(this.passChangeForm.value).subscribe(function (res) {
            alert(res["msg"]);
            _this._router.navigate(['manager']);
        }, function (err) { console.log(err); });
    };
    UserChangePassComponent.prototype.cancel = function () {
        this._router.navigate(['manager']);
    };
    UserChangePassComponent = __decorate([
        Component({
            selector: 'app-user-change-pass',
            templateUrl: './user-change-pass.component.html',
            styleUrls: ['./user-change-pass.component.css'],
            providers: [ManagerService]
        }),
        __metadata("design:paramtypes", [FormBuilder, Router,
            ActivatedRoute, ManagerService])
    ], UserChangePassComponent);
    return UserChangePassComponent;
}());
export { UserChangePassComponent };
//# sourceMappingURL=user-change-pass.component.js.map