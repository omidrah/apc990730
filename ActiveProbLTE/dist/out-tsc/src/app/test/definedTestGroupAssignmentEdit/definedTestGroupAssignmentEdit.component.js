var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NgbCalendar, NgbDatepickerI18n, NgbCalendarPersian } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18nPersian } from '../../Shared/services/NgbDatepickerI18nPersian';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
var DefinedTestGroupAssignmentEditComponent = /** @class */ (function () {
    //defaultTime: NgbTimeStruct;
    function DefinedTestGroupAssignmentEditComponent(_http, _fb, _avRoute, _router, baseUrl, toastrService, translate) {
        var _this = this;
        this._http = _http;
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._router = _router;
        this.toastrService = toastrService;
        this.translate = translate;
        this.showloader = false;
        this.formTitle = 'Create';
        this.myAppUrl = '';
        this.id = 0;
        //defaultDate: NgbDateStruct;
        this.breadcroumb = 'AssignTestToGroup';
        this.ReplaceTestConfirmMessage = "";
        this.getDefinedTestList().subscribe(function (data) {
            _this.definedTestList = data;
        });
        this.definedTestGroupForm = this._fb.group({
            id: 0,
            definedTestId: [0, [Validators.required, Validators.min(1)]],
            isActive: [true, [Validators.required]],
            machineGroupId: [0],
            beginDate: [, Validators.required],
            endDate: [, Validators.required],
            sim: [0, [Validators.required, Validators.min(1)]],
            beginDateTime: [/*this.defaultTime*/ , Validators.required],
            endDateTime: [/*this.defaultTime*/ , Validators.required],
            bDate: [],
            eDate: []
        });
        if (this._avRoute.snapshot.params['id']) {
            if (this._avRoute.snapshot.params['id'].indexOf(',') == -1) {
                this.machineGroupId = this._avRoute.snapshot.params['id'];
                this.GroupTitle = this._avRoute.snapshot.params['Title'];
            }
            else {
                this.machineGroupId = this._avRoute.snapshot.params['id'].split(",")[0];
                this.id = this._avRoute.snapshot.params['id'].split(",")[1];
                this.GroupTitle = this._avRoute.snapshot.params['Title'];
            }
            if (this.id > 0) {
                this.formTitle = 'Edit';
                this.breadcroumb = 'EditGroupTest';
                this.showloader = true;
                this.getDefinedTestGroupById(this.id)
                    .subscribe(function (response) {
                    //this.definedTestGroupForm.setValue(response[0]);
                    _this.definedTestGroupForm.controls['id'].setValue(response["id"]);
                    _this.definedTestGroupForm.controls['definedTestId'].setValue(response["definedTestId"]);
                    _this.definedTestGroupForm.controls['isActive'].setValue(response["isActive"]);
                    _this.definedTestGroupForm.controls['machineGroupId'].setValue(response["machineGroupId"]);
                    _this.definedTestGroupForm.controls['sim'].setValue(response["sim"]);
                    _this.definedTestGroupForm.controls['beginDate'].setValue(response["bDate"]);
                    _this.definedTestGroupForm.controls['endDate'].setValue(response["eDate"]);
                    var bdate = new Date(response["bDate"]);
                    var btime = ('00' + bdate.getHours()).substr(-2) + ":" + ('00' + bdate.getMinutes()).substr(-2);
                    _this.definedTestGroupForm.controls['beginDateTime'].setValue(btime);
                    var edate = new Date(response["eDate"]);
                    var etime = ('00' + edate.getHours()).substr(-2) + ":" + ('00' + edate.getMinutes()).substr(-2);
                    _this.definedTestGroupForm.controls['endDateTime'].setValue(etime);
                    _this.showloader = false;
                }, function (error) { return console.error(error); });
            }
            else {
                //this.definedTestGroupForm.controls['beginDate'].setValue(this.defaultDate);
                //this.definedTestGroupForm.controls['endDate'].setValue(this.defaultDate);
                //this.definedTestGroupForm.controls['beginDateTime'].setValue(this.defaultTime);
                //this.definedTestGroupForm.controls['endDateTime'].setValue(this.defaultTime);
                var defaultDate = new Date();
                var defaultTime = ('00' + defaultDate.getHours()).substr(-2) + ":" + ('00' + defaultDate.getMinutes()).substr(-2);
                //this.definedTestGroupForm.controls['beginDate'].setValue(defaultDate);
                //this.exportForm.controls['endDate'].setValue(defaultDate);
                this.definedTestGroupForm.controls['beginDateTime'].setValue(defaultTime);
                this.definedTestGroupForm.controls['endDateTime'].setValue(defaultTime);
            }
        }
        this.myAppUrl = baseUrl;
    }
    DefinedTestGroupAssignmentEditComponent.prototype.ngOnInit = function () {
        if (this.id > 0) {
            //this.definedTestGroupForm.get('definedTestId').disable();
            //this.definedTestGroupForm.get('beginDate').disable();
            //this.definedTestGroupForm.get('endDate').disable();
            //this.definedTestGroupForm.get('sim').disable();
            //this.definedTestGroupForm.get('beginDateTime').disable();
            //this.definedTestGroupForm.get('endDateTime').disable();
        }
    };
    DefinedTestGroupAssignmentEditComponent.prototype.getDefinedTestGroupById = function (id) {
        return this._http.get(this.myAppUrl + 'api/DefinedTestMachineGroup/Details/' + id)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestGroupAssignmentEditComponent.prototype.cancel = function () {
        this._router.navigate(['/Test/Group/Assignment/', this.machineGroupId, this.GroupTitle]);
    };
    DefinedTestGroupAssignmentEditComponent.prototype.getDefinedTestList = function () {
        return this._http.get(this.myAppUrl + 'api/DefinedTest/index/')
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestGroupAssignmentEditComponent.prototype.getDefaultDateTime = function () {
        return this._http.get(this.myAppUrl + 'api/DefinedTestMachineGroup/DefaultDateTime/')
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestGroupAssignmentEditComponent.prototype.saveDefinedTestGroup = function (definedTestGroup) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/Create', definedTestGroup)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestGroupAssignmentEditComponent.prototype.updateDefinedTestGroup = function (definedTestGroup) {
        return this._http.put(this.myAppUrl + 'api/DefinedTestMachineGroup/Edit', definedTestGroup)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestGroupAssignmentEditComponent.prototype.IsDefinedTestForMachineGroupAndParent = function (definedTestGroup) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/IsDefinedTestForMachineGroupAndParent', definedTestGroup)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestGroupAssignmentEditComponent.prototype.IsDefinedTestForMachineAndParent = function (definedTestGroup) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/IsDefinedTestForMachineParent', definedTestGroup)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestGroupAssignmentEditComponent.prototype.DeactivateTestForMachineInGroupAndParent = function (definedTestGroup) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/DeactivateTestForMachineInGroupAndParent', definedTestGroup)
            .pipe(function (response) {
            return response;
        });
    };
    DefinedTestGroupAssignmentEditComponent.prototype.DeactivateTestForMachineAndDefinedTestMachineGroup = function (definedTestGroup) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/DeactivateTestForMachineAndDefinedTestMachineGroup', definedTestGroup)
            .pipe(map(function (response) {
            return response;
        }));
    };
    Object.defineProperty(DefinedTestGroupAssignmentEditComponent.prototype, "definedTestId", {
        get: function () { return this.definedTestGroupForm.get('definedTestId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestGroupAssignmentEditComponent.prototype, "isActive", {
        get: function () { return this.definedTestGroupForm.get('isActive'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestGroupAssignmentEditComponent.prototype, "sim", {
        get: function () { return this.definedTestGroupForm.get('sim'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestGroupAssignmentEditComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.definedTestGroupForm.controls; },
        enumerable: true,
        configurable: true
    });
    DefinedTestGroupAssignmentEditComponent.prototype.save_Old = function () {
        var _this = this;
        if (!this.definedTestGroupForm.valid) {
            return;
        }
        else {
            if (!this.definedTestGroupForm.controls['beginDate'].valid || this.definedTestGroupForm.controls['beginDate'].value == null) {
                this.toastrService.error(this.translate.instant('BeginDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            if (!this.definedTestGroupForm.controls['endDate'].valid || this.definedTestGroupForm.controls['endDate'].value == null) {
                this.toastrService.error(this.translate.instant('EndDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            var TDate = new Date();
            var BDate;
            var EDate;
            if (localStorage.getItem('Language') == 'ar') {
                BDate = this.definedTestGroupForm.controls['beginDate'].value._d;
                EDate = this.definedTestGroupForm.controls['endDate'].value._d;
            }
            else {
                BDate = this.definedTestGroupForm.controls['beginDate'].value;
                EDate = this.definedTestGroupForm.controls['endDate'].value;
            }
            if (BDate) {
                var BOTime = this.definedTestGroupForm.controls['beginDateTime'].value.split(':');
                BDate.setHours(BOTime[0], BOTime[1], 0, 0);
            }
            if (EDate) {
                var EOTime = this.definedTestGroupForm.controls['endDateTime'].value.split(':');
                EDate.setHours(EOTime[0], EOTime[1], 0, 0);
            }
            if (TDate >= BDate) {
                this.toastrService.error(this.translate.instant('BeginDateShouldBeGreaterThanCurrentDate'), this.translate.instant('Error'));
                return;
            }
            if (BDate >= EDate) {
                this.toastrService.error(this.translate.instant('EndDateShouldBeGreaterThanBeginDate'), this.translate.instant('Error'));
                return;
            }
        }
        if (this._avRoute.snapshot.params['id'].indexOf(',') == -1) { //create
            this.definedTestGroupForm.controls['machineGroupId'].setValue(this._avRoute.snapshot.params['id']);
        }
        else {
            this.definedTestGroupForm.controls['machineGroupId'].setValue(this._avRoute.snapshot.params['id'].split(",")[0]);
            this.definedTestGroupForm.controls['id'].setValue(this._avRoute.snapshot.params['id'].split(",")[1]);
            // this.definedTestGroupForm.controls['sim'].setValue(this.definedTestGroupForm.get('sim').value);
            // this.definedTestGroupForm.controls['definedTestId'].setValue(this.definedTestGroupForm.get('definedTestId').value);
        }
        this.showloader = true;
        if (localStorage.getItem('Language') == 'ar') {
            if (this.definedTestGroupForm.controls['beginDate'].value._d == undefined) {
                var temp = new Date(this.definedTestGroupForm.controls['beginDate'].value);
                this.definedTestGroupForm.controls['bDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestGroupForm.controls['bDate'].setValue(this.definedTestGroupForm.controls['beginDate'].value._d.toLocaleDateString());
            if (this.definedTestGroupForm.controls['endDate'].value._d == undefined) {
                var temp = new Date(this.definedTestGroupForm.controls['endDate'].value);
                this.definedTestGroupForm.controls['eDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestGroupForm.controls['eDate'].setValue(this.definedTestGroupForm.controls['endDate'].value._d.toLocaleDateString());
        }
        else {
            if (this.definedTestGroupForm.controls['beginDate'].value.toLocaleDateString == undefined) {
                var temp = new Date(this.definedTestGroupForm.controls['beginDate'].value);
                this.definedTestGroupForm.controls['bDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestGroupForm.controls['bDate'].setValue(this.definedTestGroupForm.controls['beginDate'].value.toLocaleDateString());
            if (this.definedTestGroupForm.controls['endDate'].value.toLocaleDateString == undefined) {
                var temp = new Date(this.definedTestGroupForm.controls['endDate'].value);
                this.definedTestGroupForm.controls['eDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestGroupForm.controls['eDate'].setValue(this.definedTestGroupForm.controls['endDate'].value.toLocaleDateString());
        }
        if (this.formTitle === 'Create') {
            //بررسی وجود تست برای حد اقل یکی از دستگاه های گروه و پدرهای گروه
            //اگر تست وجود داشت نمایش پیغام به کاربر و دریافت تایید برای ذخیره
            //اگر کاربر تایید کرد متد ذخیره را فراخوانی می کنیم
            this.IsDefinedTestForMachineGroupAndParent(this.definedTestGroupForm.value)
                .subscribe(function (result) {
                _this.showloader = false;
                if (result == 0) {
                    _this.showloader = true;
                    //بررسی وجود تست انفرادی برای همه دستگاه های گروه
                    _this.IsDefinedTestForMachineAndParent(_this.definedTestGroupForm.value)
                        .subscribe(function (mustBeDeactivateTestNumber) {
                        _this.showloader = true;
                        if (mustBeDeactivateTestNumber == 0) {
                            _this.saveDefinedTestGroup(_this.definedTestGroupForm.value)
                                .subscribe(function () {
                                _this.showloader = false;
                                _this._router.navigate(['/Test/Group/Assignment/' + _this.machineGroupId, _this.GroupTitle]);
                            }, function (error) { return console.error(error); });
                        }
                        else {
                            _this.showloader = false;
                            $('#modal-default').modal('show');
                            _this.ReplaceTestConfirmMessage = _this.translate.instant('InterferenceTestDateRangeConfirmMessage');
                        }
                    });
                }
                else {
                    _this.showloader = false;
                    $('#modal-default').modal('show');
                    _this.ReplaceTestConfirmMessage = _this.translate.instant('InterferenceGroupTestDateRangeConfirmMessage');
                }
            }, function (error) { return console.error(error); });
        }
        else if (this.formTitle === 'Edit') {
            this.updateDefinedTestGroup(this.definedTestGroupForm.value)
                .subscribe(function () {
                _this.showloader = false;
                _this._router.navigate(['/Test/Group/Assignment/' + _this.machineGroupId, _this.GroupTitle]);
            }, function (error) { return console.error(error); });
        }
    };
    DefinedTestGroupAssignmentEditComponent.prototype.AcceptConfirm_Old = function () {
        var _this = this;
        //فراخانی متد غیرفعال سازی تست های انفرادی و ذخیره تست گروهی
        this.DeactivateTestForMachineAndDefinedTestMachineGroup(this.definedTestGroupForm.value)
            .subscribe(function () {
            $('#modal-default').modal('hide');
            _this.showloader = true;
            _this._router.navigate(['/Test/Group/Assignment/' + _this.machineGroupId, _this.GroupTitle]);
        });
    };
    DefinedTestGroupAssignmentEditComponent.prototype.save = function (reblace) {
        // ToDo :: Mostafa :: edit data validation
        var _this = this;
        if (!this.definedTestGroupForm.valid) {
            return;
        }
        else {
            if (!this.definedTestGroupForm.controls['beginDate'].valid || this.definedTestGroupForm.controls['beginDate'].value == null) {
                this.toastrService.error(this.translate.instant('BeginDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            if (!this.definedTestGroupForm.controls['endDate'].valid || this.definedTestGroupForm.controls['endDate'].value == null) {
                this.toastrService.error(this.translate.instant('EndDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            var TDate = new Date();
            var BDate;
            var EDate;
            if (localStorage.getItem('Language') == 'ar') {
                BDate = this.definedTestGroupForm.controls['beginDate'].value._d;
                EDate = this.definedTestGroupForm.controls['endDate'].value._d;
            }
            else {
                BDate = this.definedTestGroupForm.controls['beginDate'].value;
                EDate = this.definedTestGroupForm.controls['endDate'].value;
            }
            if (BDate) {
                var BOTime = this.definedTestGroupForm.controls['beginDateTime'].value.split(':');
                BDate.setHours(BOTime[0], BOTime[1], 0, 0);
            }
            if (EDate) {
                var EOTime = this.definedTestGroupForm.controls['endDateTime'].value.split(':');
                EDate.setHours(EOTime[0], EOTime[1], 0, 0);
            }
            if (TDate >= BDate) {
                this.toastrService.error(this.translate.instant('BeginDateShouldBeGreaterThanCurrentDate'), this.translate.instant('Error'));
                return;
            }
            if (BDate >= EDate) {
                this.toastrService.error(this.translate.instant('EndDateShouldBeGreaterThanBeginDate'), this.translate.instant('Error'));
                return;
            }
        }
        if (this._avRoute.snapshot.params['id'].indexOf(',') == -1) { //create
            this.definedTestGroupForm.controls['machineGroupId'].setValue(this._avRoute.snapshot.params['id']);
        }
        else {
            this.definedTestGroupForm.controls['machineGroupId'].setValue(this._avRoute.snapshot.params['id'].split(",")[0]);
            this.definedTestGroupForm.controls['id'].setValue(this._avRoute.snapshot.params['id'].split(",")[1]);
            // this.definedTestGroupForm.controls['sim'].setValue(this.definedTestGroupForm.get('sim').value);
            // this.definedTestGroupForm.controls['definedTestId'].setValue(this.definedTestGroupForm.get('definedTestId').value);
        }
        //فراخوانی  متد ذخیره
        this.saveDefinedTestGroupNia(this.definedTestGroupForm.value, reblace)
            .subscribe(function (result) {
            _this.showloader = false;
            if (result["succeed"] == true)
                if (result["result"] == true) {
                    $('#modal-default').modal('hide');
                    _this._router.navigate(['/Test/Group/Assignment/' + _this.machineGroupId, _this.GroupTitle]);
                }
                else {
                    $('#modal-default').modal('show');
                    _this.ReplaceTestConfirmMessage = _this.translate.instant(result["message"]);
                }
            else
                _this.toastrService.error(_this.translate.instant('DatabaseActionError'), _this.translate.instant('Error'));
        });
    };
    DefinedTestGroupAssignmentEditComponent.prototype.AcceptConfirm = function () {
        this.save(true);
    };
    DefinedTestGroupAssignmentEditComponent.prototype.saveDefinedTestGroupNia = function (definedTestMachine, reblace) {
        if (!reblace)
            return this._http.post('api/DefinedTestMachineGroup/CreateNia', definedTestMachine);
        else
            return this._http.post('api/DefinedTestMachineGroup/CreateAndDeactiveNia', definedTestMachine);
    };
    DefinedTestGroupAssignmentEditComponent = __decorate([
        Component({
            selector: 'app-edit-defined-test-group-assignment',
            templateUrl: './definedTestGroupAssignmentEdit.component.html',
            styleUrls: ['./definedTestGroupAssignmentEdit.component.css'],
            providers: [
                { provide: NgbCalendar, useClass: NgbCalendarPersian },
                { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
            ]
        }),
        __param(4, Inject('BASE_URL')),
        __metadata("design:paramtypes", [HttpClient,
            FormBuilder,
            ActivatedRoute,
            Router, String, ToastrService,
            TranslateService])
    ], DefinedTestGroupAssignmentEditComponent);
    return DefinedTestGroupAssignmentEditComponent;
}());
export { DefinedTestGroupAssignmentEditComponent };
//# sourceMappingURL=definedTestGroupAssignmentEdit.component.js.map