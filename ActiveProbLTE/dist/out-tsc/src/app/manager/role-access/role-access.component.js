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
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from 'src/app/Shared/services/manager.service';
import { map } from 'rxjs/internal/operators/map';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
var RoleAccessComponent = /** @class */ (function () {
    function RoleAccessComponent(_avRoute, _manager, _router, _fb) {
        this._avRoute = _avRoute;
        this._manager = _manager;
        this._router = _router;
        this._fb = _fb;
        this.checkedArray = new FormArray([]);
        this.controllers = [];
        if (this._avRoute.snapshot.params['id']) {
            this.selectedRoleId = this._avRoute.snapshot.params['id'];
        }
        this.AccessForm = this._fb.group({
            acts: new FormArray([])
        });
        this.DynamicCtrl();
    }
    RoleAccessComponent.prototype.ngOnInit = function () {
    };
    RoleAccessComponent.prototype.DynamicCtrl = function () {
        var _this = this;
        this._manager.getAccess(this.selectedRoleId).pipe(map(function (data) {
            var _loop_1 = function (k) {
                var curActions = data["securedControllerActions"][k]["mvcActions"];
                var act = [];
                var _loop_2 = function (j) {
                    if (curActions[j]["actionDisplayName"] != null && curActions[j]["actionDisplayName"] != "") {
                        claims = data["roleIncludeRoleClaims"].claims;
                        var iSselected_1 = false;
                        claims.forEach(function (tmp, key) {
                            if (tmp["claimType"] == "dynKkomAuthorizationClaimType" &&
                                tmp["claimValue"] == curActions[j]["actionId"])
                                iSselected_1 = true;
                        });
                        act.push({ actionName: curActions[j]["actionDisplayName"], actionId: curActions[j]["actionId"], selected: iSselected_1 ? "Checked" : "" });
                    }
                };
                for (var j in curActions) {
                    _loop_2(j);
                }
                ctr = {
                    disp: data["securedControllerActions"][k]["controllerDisplayName"],
                    controllerId: data["securedControllerActions"][k]["controllerName"],
                    actions: act
                };
                _this.controllers.push(ctr);
            };
            var claims, ctr;
            for (var k in data["securedControllerActions"]) {
                _loop_1(k);
            }
            return data;
        }))
            .subscribe(function (poco) {
            _this.access = poco;
            //console.log(this.access);
            _this.selectedRoleName = _this.access.roleIncludeRoleClaims.name;
            _this.addCheckboxes();
        });
    };
    RoleAccessComponent.prototype.submit = function () {
        var dd = [];
        this.checkedArray.controls.forEach(function (key, value) {
            //alert(key.value);
            dd.push(key.value);
        });
        this._manager.updateAccess(+this.selectedRoleId, dd).subscribe(function (data) {
            alert("بروزرسانی گردید");
        });
        ;
    };
    RoleAccessComponent.prototype.addCheckboxes = function () {
        var _this = this;
        this.controllers.forEach(function (item, ind) {
            _this.actsFormArray.push(new FormControl({ 'disp': item["disp"], 'controllerId': item["controllerId"], 'actions': item["actions"] }));
        });
    };
    Object.defineProperty(RoleAccessComponent.prototype, "actsFormArray", {
        get: function () {
            return this.AccessForm.controls.acts;
        },
        enumerable: false,
        configurable: true
    });
    RoleAccessComponent.prototype.onCheckboxChange = function (e) {
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
    RoleAccessComponent.prototype.cancel = function () {
        this._router.navigate(['manager', 'Roles']);
    };
    var _a;
    RoleAccessComponent = __decorate([
        Component({
            selector: 'app-role-access',
            templateUrl: './role-access.component.html',
            styleUrls: ['./role-access.component.css'],
            providers: [ManagerService]
        }),
        __metadata("design:paramtypes", [ActivatedRoute, typeof (_a = typeof ManagerService !== "undefined" && ManagerService) === "function" ? _a : Object, Router,
            FormBuilder])
    ], RoleAccessComponent);
    return RoleAccessComponent;
}());
export { RoleAccessComponent };
//# sourceMappingURL=role-access.component.js.map