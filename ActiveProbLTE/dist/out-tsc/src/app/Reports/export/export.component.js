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
import { saveAs } from 'file-saver';
import { ConfigService } from '../../Shared/services/config.service';
import { TranslateService } from '@ngx-translate/core';
var ExportComponent = /** @class */ (function () {
    function ExportComponent(_http, _fb, _avRoute, _router, baseUrl, calendar, toastrService, translate, _config) {
        var _this = this;
        this._http = _http;
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._router = _router;
        this.calendar = calendar;
        this.toastrService = toastrService;
        this.translate = translate;
        this._config = _config;
        this.showloader = false;
        this.formTitle = 'Create';
        this.myAppUrl = '';
        this.paramKMlExport = [
            { id: 0, title: 'Route plot' },
            { id: 1, title: 'RXLevel' },
            { id: 2, title: 'RSCP' },
            { id: 3, title: 'RSRP' },
            { id: 4, title: 'RXQual' },
            { id: 5, title: 'ECIO' },
            { id: 6, title: 'RSRQ' },
            { id: 7, title: 'MNC' }
        ];
        //defaultDate: Date;
        //defaultTime: Time;
        this.FileSaver = require('file-saver');
        this.getDefinedTestList().subscribe(function (data) {
            _this.definedTestList = data;
        });
        this.getMachineList().subscribe(function (data) {
            _this.machineList = data;
            _this.selectedFirstMachine = +_this.machineList[0].id;
            //console.log(this.machineList)
        });
        this.getZones().subscribe(function (data) {
            _this.zoneList = data;
            _this.selectedZone = +_this.zoneList[0].zoneId;
        });
        this.exportForm = this._fb.group({
            definedTestId: [0],
            zone: [0],
            isActive: [true, [Validators.required]],
            ParamKml: ['Route plot'],
            machineId: [0],
            beginDate: [, Validators.required],
            endDate: [, Validators.required],
            sim: [0, Validators.min(0)],
            beginDateTime: [/*this.defaultTime*/ , Validators.required],
            endDateTime: [/*this.defaultTime*/ , Validators.required]
        });
        //var defaultDate = new Date();
        //var defaultTime = defaultDate.getHours() + ":" + defaultDate.getMinutes();
        this.exportForm.controls['beginDateTime'].setValue("00:00");
        this.exportForm.controls['endDateTime'].setValue("00:00");
        //---------------------------------------------------------------------------------
        this._config.currentConfigurations.subscribe(function (t) {
            _this.config = t;
        });
    }
    ExportComponent.prototype.ngOnInit = function () {
        // this.exportForm.controls['machineId'].setValue(this.selectedFirstMachine,{onlySelf: true}); ////select first element default--omid added 981120
    };
    ExportComponent.prototype.genKml = function () {
        var _this = this;
        console.log(this.exportForm);
        if (this.exportForm.controls['machineId'].value === 0) { // Select machine Required
            this.toastrService.warning(this.translate.instant('SelectYourMachine'), this.translate.instant('Warning'));
            return;
        }
        if (!this.exportForm.valid) {
            if (!this.exportForm.controls['beginDate'].valid || this.exportForm.controls['beginDate'].value == null) {
                this.toastrService.warning(this.translate.instant('BeginDateIsRequired'), this.translate.instant('Warning'));
            }
            if (!this.exportForm.controls['endDate'].valid || this.exportForm.controls['endDate'].value == null) {
                this.toastrService.warning(this.translate.instant('EndDateIsRequired'), this.translate.instant('Warning'));
            }
            return;
        }
        var BDate = this.exportForm.controls['beginDate'].value._d;
        var EDate = this.exportForm.controls['endDate'].value._d;
        if (BDate) {
            var BOTime = this.exportForm.controls['beginDateTime'].value.split(':');
            BDate.setHours(BOTime[0], BOTime[1], 0, 0);
        }
        if (EDate) {
            var EOTime = this.exportForm.controls['endDateTime'].value.split(':');
            EDate.setHours(EOTime[0], EOTime[1], 0, 0);
        }
        this.showloader = true;
        this.GenKml(this.exportForm.value).subscribe(function (data) {
            saveAs(data, "/Map.Kml");
            _this.showloader = false;
        });
    };
    ExportComponent.prototype.save = function () {
        var _this = this;
        if (!this.exportForm.valid) {
            if (!this.exportForm.controls['beginDate'].valid || this.exportForm.controls['beginDate'].value == null) {
                this.toastrService.warning(this.translate.instant('BeginDateIsRequired'), this.translate.instant('Warning'));
            }
            if (!this.exportForm.controls['endDate'].valid || this.exportForm.controls['endDate'].value == null) {
                this.toastrService.warning(this.translate.instant('EndDateIsRequired'), this.translate.instant('Warning'));
            }
            return;
        }
        var BDate = this.exportForm.controls['beginDate'].value._d;
        var EDate = this.exportForm.controls['endDate'].value._d;
        if (BDate) {
            var BOTime = this.exportForm.controls['beginDateTime'].value.split(':');
            BDate.setHours(BOTime[0], BOTime[1], 0, 0);
        }
        if (EDate) {
            var EOTime = this.exportForm.controls['endDateTime'].value.split(':');
            EDate.setHours(EOTime[0], EOTime[1], 0, 0);
        }
        this.showloader = true;
        this.submit(this.exportForm.value)
            .subscribe(function (data) {
            saveAs(data, "/Report.xlsx");
            _this.showloader = false;
        });
        //.subscribe(() => {
        //    res => {
        //        const blob = new Blob([res.blob()], { type: 'application/vnd.ms.excel' });
        //        const file = new File([blob], 'UserList' + '.xlsx', { type: 'application/vnd.ms.excel' });
        //        saveAs(file);
        //    }
        //        //this._router.navigate(['/export/' + this.machineId]);
        //    }, error => console.error(error));
        //this.FileSaver.saveAs("https://httpbin.org/image", "image.jpg");
    };
    ExportComponent.prototype.getDefinedTestList = function () {
        return this._http.get(this.myAppUrl + 'api/DefinedTest/index/')
            .pipe(map(function (response) {
            return response;
        }));
    };
    ExportComponent.prototype.getMachineList = function () {
        return this._http.get(this.myAppUrl + 'api/Machine/index/')
            .pipe(map(function (response) {
            return response;
        }));
    };
    ExportComponent.prototype.getZones = function () {
        return this._http.get(this.myAppUrl + 'api/GeoLocation/GetZones/')
            .pipe(map(function (response) {
            return response;
        }));
    };
    ExportComponent.prototype.getDefaultDateTime = function () {
        return this._http.get(this.myAppUrl + 'api/export/DefaultDateTime/')
            .pipe(map(function (response) {
            return response;
        }));
    };
    ExportComponent.prototype.submit = function (expo) {
        return this._http.post(this.myAppUrl + 'api/export/submit', expo, {
            responseType: "blob"
        });
        //    .subscribe(ress => {
        //        res => {
        //            //const blob = new Blob([res.blob()]);
        //            //const file = new File([blob], 'UserList' + '.xlsx');
        //            //saveAs(file);
        //            const fileType = this.FileSaver.genType("UserList.xlsx");
        //            const txtBlob = new Blob([res.blob()], { type: fileType });
        //            this.FileSaver.save(txtBlob, "UserList.xlsx");
        //        }
        //    });
        //return;
    };
    ExportComponent.prototype.GenKml = function (expo) {
        return this._http.post(this.myAppUrl + 'api/export/GenKml', expo, {
            responseType: "blob"
        });
    };
    Object.defineProperty(ExportComponent.prototype, "definedTestId", {
        get: function () { return this.exportForm.get('definedTestId'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExportComponent.prototype, "sim", {
        get: function () { return this.exportForm.get('sim'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExportComponent.prototype, "machineId", {
        get: function () { return this.exportForm.get('machineId'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ExportComponent.prototype, "zone", {
        get: function () { return this.exportForm.get('zone'); },
        enumerable: false,
        configurable: true
    });
    ExportComponent = __decorate([
        Component({
            selector: 'app-export',
            templateUrl: './export.component.html',
            styleUrls: ['./export.component.css'],
            providers: [
                { provide: NgbCalendar, useClass: NgbCalendarPersian },
                { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
            ]
        }),
        __param(4, Inject('BASE_URL')),
        __metadata("design:paramtypes", [HttpClient,
            FormBuilder,
            ActivatedRoute,
            Router, String, NgbCalendar,
            ToastrService,
            TranslateService,
            ConfigService])
    ], ExportComponent);
    return ExportComponent;
}());
export { ExportComponent };
//# sourceMappingURL=export.component.js.map