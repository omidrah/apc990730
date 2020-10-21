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
var DefinedTestMachineAssignmentEditComponent = /** @class */ (function () {
    function DefinedTestMachineAssignmentEditComponent(_http, _fb, _avRoute, _router, baseUrl, toastrService, translate) {
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
        //defaultTime: NgbTimeStruct;
        this.breadcroumb = 'TestAssignment';
        this.ReplaceTestConfirmMessage = "";
        if (this._avRoute.snapshot.params['Title']) {
            this.machineTitle = this._avRoute.snapshot.params['Title'];
        }
        this.getDefinedTestList().subscribe(function (data) {
            _this.definedTestList = data;
        });
        this.definedTestMachineForm = this._fb.group({
            id: 0,
            definedTestId: [0, [Validators.required, Validators.min(1)]],
            isActive: [true, [Validators.required]],
            machineId: [0],
            beginDate: [, Validators.required],
            endDate: [, Validators.required],
            sim: [0, [Validators.required, Validators.min(1)]],
            beginDateTime: [/*this.defaultTime*/ , Validators.required],
            endDateTime: [/*this.defaultTime*/ , Validators.required],
            bDate: [],
            eDate: [],
        });
        if (this._avRoute.snapshot.params['id']) {
            if (this._avRoute.snapshot.params['id'].indexOf(',') == -1) {
                this.machineId = this._avRoute.snapshot.params['id'];
            }
            else {
                this.machineId = this._avRoute.snapshot.params['id'].split(",")[0];
                this.id = this._avRoute.snapshot.params['id'].split(",")[1]; //Id of groupTest
            }
            //this.defaultDate = data['defaultDate'];
            //this.defaultTime = data['defaultTime'];
            if (this.id > 0) {
                this.formTitle = 'Edit';
                this.breadcroumb = 'EditTest';
                this.showloader = true;
                this.getDefinedTestMachineById(this.id)
                    .subscribe(function (response) {
                    //this.definedTestMachineForm.setValue(response);
                    _this.definedTestMachineForm.controls['id'].setValue(response["id"]);
                    _this.definedTestMachineForm.controls['definedTestId'].setValue(response["definedTestId"]);
                    _this.definedTestMachineForm.controls['isActive'].setValue(response["isActive"]);
                    _this.definedTestMachineForm.controls['machineId'].setValue(response["machineId"]);
                    _this.definedTestMachineForm.controls['sim'].setValue(response["sim"]);
                    _this.definedTestMachineForm.controls['beginDate'].setValue(response["bDate"]);
                    _this.definedTestMachineForm.controls['endDate'].setValue(response["eDate"]);
                    var bdate = new Date(response["bDate"]);
                    var btime = ('00' + bdate.getHours()).substr(-2) + ":" + ('00' + bdate.getMinutes()).substr(-2);
                    _this.definedTestMachineForm.controls['beginDateTime'].setValue(btime);
                    var edate = new Date(response["eDate"]);
                    var etime = ('00' + edate.getHours()).substr(-2) + ":" + ('00' + edate.getMinutes()).substr(-2);
                    _this.definedTestMachineForm.controls['endDateTime'].setValue(etime);
                    _this.definedTestMachineForm.controls['bDate'].setValue(bdate);
                    _this.definedTestMachineForm.controls['eDate'].setValue(edate);
                    _this.showloader = false;
                }, function (error) { return console.error(error); });
            }
            else {
                this.defaultDate = new Date();
                var defaultTime = ('00' + this.defaultDate.getHours()).substr(-2) + ":" + ('00' + this.defaultDate.getMinutes()).substr(-2);
                this.definedTestMachineForm.controls['beginDateTime'].setValue(defaultTime);
                this.definedTestMachineForm.controls['endDateTime'].setValue(defaultTime);
            }
        }
        this.myAppUrl = baseUrl;
    }
    DefinedTestMachineAssignmentEditComponent.prototype.ngOnInit = function () {
    };
    DefinedTestMachineAssignmentEditComponent.prototype.getDefinedTestMachineById = function (id) {
        return this._http.get(this.myAppUrl + 'api/DefinedTestMachine/Details/' + id)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestMachineAssignmentEditComponent.prototype.cancel = function () {
        this._router.navigate(['/Test/Assignment/Machine/' + this.machineId + "/" + this.machineTitle]);
    };
    DefinedTestMachineAssignmentEditComponent.prototype.getDefinedTests = function (id) {
        var _this = this;
        this._http.get(this.myAppUrl + 'api/Machine/IndexWithDefinedTest/' + id).pipe(map(function (response) {
            return response;
        })).subscribe(function (data) {
            _this.definedTestMachineList = data;
        });
    };
    DefinedTestMachineAssignmentEditComponent.prototype.getDefinedTestList = function () {
        return this._http.get(this.myAppUrl + 'api/DefinedTest/index/')
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestMachineAssignmentEditComponent.prototype.getDefaultDateTime = function () {
        return this._http.get(this.myAppUrl + 'api/DefinedTestMachine/DefaultDateTime/')
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestMachineAssignmentEditComponent.prototype.saveDefinedTestMachine = function (definedTestMachine) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachine/Create', definedTestMachine)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestMachineAssignmentEditComponent.prototype.updateDefinedTestMachine = function (definedTestMachine) {
        return this._http.put(this.myAppUrl + 'api/DefinedTestMachine/Edit', definedTestMachine)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestMachineAssignmentEditComponent.prototype.IsDefinedTestForMachineByMachineID = function (definedTestMachine) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachine/IsDefinedTestForMachineByMachineID', definedTestMachine)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestMachineAssignmentEditComponent.prototype.IsDefinedTestForMachineGroupAndParentByMachineID = function (definedTestMachine) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachine/IsDefinedTestForMachineGroupAndParentByMachineID', definedTestMachine)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestMachineAssignmentEditComponent.prototype.DeactivateTestForMachineGroupAndDefinedTestMachine = function (definedTestMachine) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachine/DeactivateTestForMachineGroupAndDefinedTestMachine', definedTestMachine)
            .pipe(map(function (response) {
            return response;
        }));
    };
    Object.defineProperty(DefinedTestMachineAssignmentEditComponent.prototype, "definedTestId", {
        get: function () { return this.definedTestMachineForm.get('definedTestId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestMachineAssignmentEditComponent.prototype, "isActive", {
        get: function () { return this.definedTestMachineForm.get('isActive'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestMachineAssignmentEditComponent.prototype, "sim", {
        get: function () { return this.definedTestMachineForm.get('sim'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestMachineAssignmentEditComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.definedTestMachineForm.controls; },
        enumerable: true,
        configurable: true
    });
    DefinedTestMachineAssignmentEditComponent.prototype.save_Old = function () {
        var _this = this;
        if (!this.definedTestMachineForm.valid) {
            return;
        }
        else if (this.definedTestMachineForm.valid) { //addby omid for ignore check DateTime validation
            if (!this.definedTestMachineForm.controls['beginDate'].valid ||
                this.definedTestMachineForm.controls['beginDate'].value == null) {
                this.toastrService.error(this.translate.instant('BeginDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            if (!this.definedTestMachineForm.controls['endDate'].valid || this.definedTestMachineForm.controls['endDate'].value == null) {
                this.toastrService.error(this.translate.instant('EndDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            var TDate = new Date();
            var BDate;
            var EDate;
            if (localStorage.getItem('Language') == 'ar') {
                BDate = this.definedTestMachineForm.controls['beginDate'].value._d;
                EDate = this.definedTestMachineForm.controls['endDate'].value._d;
            }
            else {
                BDate = this.definedTestMachineForm.controls['beginDate'].value;
                EDate = this.definedTestMachineForm.controls['endDate'].value;
            }
            if (BDate) {
                var BOTime = this.definedTestMachineForm.controls['beginDateTime'].value.split(':');
                BDate.setHours(BOTime[0], BOTime[1], 0, 0);
            }
            if (EDate) {
                var EOTime = this.definedTestMachineForm.controls['endDateTime'].value.split(':');
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
        if (this._avRoute.snapshot.params['id'].indexOf(',') == -1) {
            this.definedTestMachineForm.controls['machineId'].setValue(this._avRoute.snapshot.params['id']);
        }
        else {
            this.definedTestMachineForm.controls['machineId'].setValue(this._avRoute.snapshot.params['id'].split(",")[0]);
            this.definedTestMachineForm.controls['id'].setValue(this._avRoute.snapshot.params['id'].split(",")[1]);
        }
        this.showloader = true;
        if (localStorage.getItem('Language') == 'ar') {
            if (this.definedTestMachineForm.controls['beginDate'].value._d == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['beginDate'].value);
                this.definedTestMachineForm.controls['bDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['bDate'].setValue(this.definedTestMachineForm.controls['beginDate'].value._d.toLocaleDateString());
            if (this.definedTestMachineForm.controls['endDate'].value._d == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['endDate'].value);
                this.definedTestMachineForm.controls['eDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['eDate'].setValue(this.definedTestMachineForm.controls['endDate'].value._d.toLocaleDateString());
        }
        else {
            if (this.definedTestMachineForm.controls['beginDate'].value.toLocaleDateString == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['beginDate'].value);
                this.definedTestMachineForm.controls['bDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['bDate'].setValue(this.definedTestMachineForm.controls['beginDate'].value.toLocaleDateString());
            if (this.definedTestMachineForm.controls['endDate'].value.toLocaleDateString == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['endDate'].value);
                this.definedTestMachineForm.controls['eDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['eDate'].setValue(this.definedTestMachineForm.controls['endDate'].value.toLocaleDateString());
        }
        if (this.formTitle === 'Create') {
            //بررسی وجود تست گروهی برای گروه و پدرهای گروه دستگاه
            //اگر تست گروهی وجود داشت با نمایش پیغام به کاربر و دریافت تایید جایگزینی تست جدید
            //متد ذخیره را فراخوانی می کنیم
            this.IsDefinedTestForMachineGroupAndParentByMachineID(this.definedTestMachineForm.value)
                .subscribe(function (result) {
                _this.showloader = false;
                if (result == 0) {
                    _this.showloader = true;
                    _this.IsDefinedTestForMachineByMachineID(_this.definedTestMachineForm.value)
                        .subscribe(function (res) {
                        _this.showloader = true;
                        if (res == 0) {
                            _this.saveDefinedTestMachine(_this.definedTestMachineForm.value)
                                .subscribe(function () {
                                _this.showloader = false;
                                _this._router.navigate(['/Test/Assignment/Machine/' + _this.machineId + "/" + _this.machineTitle]);
                            }, function (error) { return console.error(error); });
                        }
                        else {
                            _this.showloader = false;
                            $('#modal-default').modal('show');
                            _this.ReplaceTestConfirmMessage = _this.translate.instant('InterferenceTestDateRangeConfirmMessage');
                        }
                    }, function (error) { return console.error(error); });
                }
                else {
                    _this.showloader = false;
                    $('#modal-default').modal('show');
                    _this.ReplaceTestConfirmMessage = _this.translate.instant('InterferenceTestDateRangeConfirmMessage');
                }
            }, function (error) { return console.error(error); });
        }
        else if (this.formTitle === 'Edit') {
            this.updateDefinedTestMachine(this.definedTestMachineForm.value)
                .subscribe(function () {
                _this.showloader = false;
                _this._router.navigate(['/Test/Assignment/Machine/' + _this.machineId + "/" + _this.machineTitle]);
            }, function (error) { return console.error(error); });
        }
    };
    DefinedTestMachineAssignmentEditComponent.prototype.AcceptConfirm_Old = function () {
        var _this = this;
        //فراخانی متد غیرفعال سازی تست های گروهی و ذخیره تست انفرادی
        this.DeactivateTestForMachineGroupAndDefinedTestMachine(this.definedTestMachineForm.value)
            .subscribe(function () {
            $('#modal-default').modal('hide');
            _this.showloader = true;
            _this._router.navigate(['/Test/Assignment/Machine/' + _this.machineId + "/" + _this.machineTitle]);
        });
    };
    DefinedTestMachineAssignmentEditComponent.prototype.save = function (reblace) {
        var _this = this;
        // ToDo :: Mostafa :: edit data validation
        if (!this.definedTestMachineForm.valid) {
            return;
        }
        else if (this.definedTestMachineForm.valid) { //addby omid for ignore check DateTime validation
            if (!this.definedTestMachineForm.controls['beginDate'].valid ||
                this.definedTestMachineForm.controls['beginDate'].value == null) {
                this.toastrService.error(this.translate.instant('BeginDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            if (!this.definedTestMachineForm.controls['endDate'].valid || this.definedTestMachineForm.controls['endDate'].value == null) {
                this.toastrService.error(this.translate.instant('EndDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            var TDate = new Date();
            var BDate;
            var EDate;
            if (localStorage.getItem('Language') == 'ar') {
                BDate = this.definedTestMachineForm.controls['beginDate'].value._d;
                EDate = this.definedTestMachineForm.controls['endDate'].value._d;
            }
            else {
                BDate = this.definedTestMachineForm.controls['beginDate'].value;
                EDate = this.definedTestMachineForm.controls['endDate'].value;
            }
            if (BDate) {
                var BOTime = this.definedTestMachineForm.controls['beginDateTime'].value.split(':');
                BDate.setHours(BOTime[0], BOTime[1], 0, 0);
            }
            if (EDate) {
                var EOTime = this.definedTestMachineForm.controls['endDateTime'].value.split(':');
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
        if (this._avRoute.snapshot.params['id'].indexOf(',') == -1) {
            this.definedTestMachineForm.controls['machineId'].setValue(this._avRoute.snapshot.params['id']);
        }
        else {
            this.definedTestMachineForm.controls['machineId'].setValue(this._avRoute.snapshot.params['id'].split(",")[0]);
            this.definedTestMachineForm.controls['id'].setValue(this._avRoute.snapshot.params['id'].split(",")[1]);
        }
        this.showloader = true;
        if (localStorage.getItem('Language') == 'ar') {
            if (this.definedTestMachineForm.controls['beginDate'].value._d == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['beginDate'].value);
                this.definedTestMachineForm.controls['bDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['bDate'].setValue(this.definedTestMachineForm.controls['beginDate'].value._d.toLocaleDateString());
            if (this.definedTestMachineForm.controls['endDate'].value._d == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['endDate'].value);
                this.definedTestMachineForm.controls['eDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['eDate'].setValue(this.definedTestMachineForm.controls['endDate'].value._d.toLocaleDateString());
        }
        else {
            if (this.definedTestMachineForm.controls['beginDate'].value.toLocaleDateString == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['beginDate'].value);
                this.definedTestMachineForm.controls['bDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['bDate'].setValue(this.definedTestMachineForm.controls['beginDate'].value.toLocaleDateString());
            if (this.definedTestMachineForm.controls['endDate'].value.toLocaleDateString == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['endDate'].value);
                this.definedTestMachineForm.controls['eDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['eDate'].setValue(this.definedTestMachineForm.controls['endDate'].value.toLocaleDateString());
        }
        //فراخوانی  متد ذخیره
        this.saveDefinedTestMachineNia(this.definedTestMachineForm.value, reblace)
            .subscribe(function (result) {
            _this.showloader = false;
            if (result["succeed"] == true)
                if (result["result"] == true) {
                    $('#modal-default').modal('hide');
                    _this._router.navigate(['/Test/Assignment/Machine/' + _this.machineId + "/" + _this.machineTitle]);
                }
                else {
                    $('#modal-default').modal('show');
                    _this.ReplaceTestConfirmMessage = _this.translate.instant(result["message"]);
                }
            else
                _this.toastrService.error(_this.translate.instant('DatabaseActionError'), _this.translate.instant('Error'));
        });
    };
    DefinedTestMachineAssignmentEditComponent.prototype.AcceptConfirm = function () {
        this.save(true);
    };
    DefinedTestMachineAssignmentEditComponent.prototype.saveDefinedTestMachineNia = function (definedTestMachine, reblace) {
        if (!reblace)
            return this._http.post('api/DefinedTestMachine/CreateNia', definedTestMachine);
        else
            return this._http.post('api/DefinedTestMachine/CreateAndDeactiveNia', definedTestMachine);
    };
    DefinedTestMachineAssignmentEditComponent = __decorate([
        Component({
            selector: 'app-edit-defined-test-machine-assignment',
            templateUrl: './definedTestMachineAssignmentEdit.component.html',
            styleUrls: ['./definedTestMachineAssignmentEdit.component.css'],
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
    ], DefinedTestMachineAssignmentEditComponent);
    return DefinedTestMachineAssignmentEditComponent;
}());
export { DefinedTestMachineAssignmentEditComponent };
//# sourceMappingURL=definedTestMachineAssignmentEdit.component.js.map