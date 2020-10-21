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
var MyAwesomeRangeValidator = function (fg) {
    fg.get('usualCallDuration').setErrors(null);
    fg.get('usualCallWaitTime').setErrors(null);
    fg.get('usualCallNumber').setErrors(null);
    fg.get('testDataId').setErrors(null);
    fg.get('testDataTypeId').setErrors(null);
    fg.get('testDataServer').setErrors(null);
    fg.get('testDataUserName').setErrors(null);
    fg.get('testDataPassword').setErrors(null);
    fg.get('ottServiceId').setErrors(null);
    fg.get('ottServiceTestId').setErrors(null);
    fg.get('repeatTime').setErrors(null);
    fg.get('repeatCount').setErrors(null);
    fg.get('ttl').setErrors(null);
    fg.get('ipTypeId').setErrors(null);
    var testTypeId = fg.get('testTypeId').value;
    var repeatTypeId = fg.get('repeatTypeId').value;
    var saveLog = fg.get('saveLogFile').value;
    if (false) {
        return { range: false };
    }
    //addby omid -- check logfileSize and other parameter
    if (saveLog) { //true
        if (fg.get('logFilePartitionTypeId').value == null || fg.get('logFilePartitionTypeId').value == 0) { //نوع ذخیره سازی را مشخص نکرده و تیک ذخیره سازی خورده
            fg.get('logFilePartitionTypeId').setErrors({ 'incorrect': true });
        }
        if (fg.get('logFilePartitionTypeId').value == 1) { //time
            if (fg.get('logFilePartitionTime').value == null || fg.get('logFilePartitionTime').value < 1) {
                fg.get('logFilePartitionTime').setErrors({ 'incorrect': true });
                fg.get('logFilePartitionSize').setErrors(null);
            }
        }
        else if (fg.get('logFilePartitionTypeId').value == 2) { //size
            if (fg.get('logFilePartitionSize').value == null || fg.get('logFilePartitionSize').value < 1) {
                fg.get('logFilePartitionSize').setErrors({ 'incorrect': true });
                fg.get('logFilePartitionTime').setErrors(null);
            }
        }
        if (fg.get('logFileHoldTime').value == null || fg.get('logFileHoldTime').value < 1) {
            fg.get('logFileHoldTime').setErrors({ 'incorrect': true });
        }
    }
    else { //false , mean savelogfile donot tick
        fg.get('logFilePartitionTypeId').setErrors(null);
        fg.get('logFilePartitionTime').setErrors(null);
        fg.get('logFilePartitionSize').setErrors(null);
    }
    if (testTypeId == 1 || testTypeId == 2) {
        if (fg.get('usualCallDuration').value == null || fg.get('usualCallDuration').value < 1) {
            fg.get('usualCallDuration').setErrors({ 'incorrect': true });
        }
        if (fg.get('usualCallWaitTime').value == null || fg.get('usualCallWaitTime').value < 1) {
            fg.get('usualCallWaitTime').setErrors({ 'incorrect': true });
        }
        if (fg.get('usualCallNumber').value == null) {
            fg.get('usualCallNumber').setErrors({ 'incorrect': true });
        }
    }
    if (testTypeId == 2) { //MosCall
        //check upload /Download DropDown
        if (fg.get('testDataTypeId').value == null || fg.get('testDataTypeId').value == 0) {
            fg.get('testDataTypeId').setErrors({ 'incorrect': true });
        }
        //check DataServerUrl
        if (fg.get('testDataServer').value == null || fg.get('testDataServer').value == "") {
            fg.get('testDataServer').setErrors({ 'incorrect': true });
        }
    }
    if (testTypeId == 4) { //Data
        if (fg.get('testDataId').value == null || fg.get('testDataId').value <= 0) {
            fg.get('testDataId').setErrors({ 'incorrect': true });
        }
        if (fg.get('testDataServer').value == null || fg.get('testDataServer').value == "") {
            fg.get('testDataServer').setErrors({ 'incorrect': true });
        }
        if (fg.get('testDataId').value == 1) { //Ftp
            if (fg.get('testDataTypeId').value == null || fg.get('testDataTypeId').value == 0) {
                fg.get('testDataTypeId').setErrors({ 'incorrect': true });
            }
            if (fg.get('testDataUserName').value == null || fg.get('testDataUserName').value == "") {
                fg.get('testDataUserName').setErrors({ 'incorrect': true });
            }
            if (fg.get('testDataPassword').value == null || fg.get('testDataPassword').value == "") {
                fg.get('testDataPassword').setErrors({ 'incorrect': true });
            }
        }
        if (fg.get('testDataId').value == 2) { //Http
            if (fg.get('testDataTypeId').value == null || fg.get('testDataTypeId').value == 0) {
                fg.get('testDataTypeId').setErrors({ 'incorrect': true });
            }
            if (fg.get('testDataUploadFileSize').value == null || fg.get('testDataUploadFileSize').value == "") {
                fg.get('testDataUploadFileSize').setErrors({ 'incorrect': true });
            }
            // if (fg.get('testDataDownloadFileAddress').value == null || fg.get('testDataDownloadFileAddress').value == "") {
            //     fg.get('testDataDownloadFileAddress').setErrors({ 'incorrect': true });
            // }
            // if(fg.get('testDataTypeId').value == 2) { //Uploads
            //     //fileSize Check
            //     if( 100 > fg.get('testDataUploadFileSize').value  && fg.get('testDataUploadFileSize').value > 1000000){
            //         fg.get('ttl').setErrors({ 'fileSizeRang': true });
            //     }
            // }
        }
        if (fg.get('testDataId').value == 3) { //ping
            if (fg.get('numberOfPings').value == null || fg.get('numberOfPings').value < 1 || fg.get('numberOfPings').value > 100) {
                fg.get('numberOfPings').setErrors({ 'incorrect': true });
            }
            if (fg.get('packetSize').value == null || fg.get('packetSize').value < 4 || fg.get('packetSize').value > 188) {
                fg.get('packetSize').setErrors({ 'incorrect': true });
            }
            if (fg.get('internalTime').value == null || fg.get('internalTime').value < 1 || fg.get('internalTime').value > 20) {
                fg.get('internalTime').setErrors({ 'incorrect': true });
            }
            if (fg.get('responseWaitTime').value == null || fg.get('responseWaitTime').value < 10 || fg.get('responseWaitTime').value > 100) {
                fg.get('responseWaitTime').setErrors({ 'incorrect': true });
            }
            if (fg.get('ttl').value == null || fg.get('ttl').value < 16 || fg.get('ttl').value > 255) {
                fg.get('ttl').setErrors({ 'incorrect': true });
            }
            if (fg.get('ipTypeId').value == null || fg.get('ipTypeId').value < 1) {
                fg.get('ipTypeId').setErrors({ 'incorrect': true });
            }
        }
        if (fg.get('testDataId').value == 4) { //TraceRoute
            if (fg.get('traceRouteHubCount').value == null || fg.get('traceRouteHubCount').value < 1) {
                fg.get('traceRouteHubCount').setErrors({ 'incorrect': true });
            }
        }
    }
    //Check Upload FileSize only Upload Data Test
    if (testTypeId != 4) { //only Data Test
        //fg.get('testDataUploadFileSize').setErrors(null);
    }
    else if (testTypeId == 4) {
        if (fg.get('testDataId').value != 2) { //Only Http In Data Test
            //fg.get('testDataUploadFileSize').setErrors(null);
        }
        else {
            fg.get('testDataId').value == 2;
            if (fg.get('testDataTypeId').value != 2) { //Only Upload 
                //fg.get('testDataUploadFileSize').setErrors(null);
            }
        }
    }
    //End Check
    if (testTypeId == 5) {
        if (fg.get('ottServiceId').value == null || fg.get('ottServiceId').value < 1) {
            fg.get('ottServiceId').setErrors({ 'incorrect': true });
        }
        if (fg.get('ottServiceTestId').value == null || fg.get('ottServiceTestId').value < 1) {
            fg.get('ottServiceTestId').setErrors({ 'incorrect': true });
        }
    }
    if (repeatTypeId == 2) {
        if (fg.get('repeatTime').value == null) {
            fg.get('repeatTime').setErrors({ 'incorrect': true });
        }
    }
    if (repeatTypeId == 3) {
        if (fg.get('repeatCount').value == null) {
            fg.get('repeatCount').setErrors({ 'incorrect': true });
        }
    }
};
//این متد حداقل و حداکثر فایل آپلودی را چک میکد
//سایز فایل برحسب کیلو بایت می باشد
function fileSizeRangValidator(min, max) {
    return function (control) {
        if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
            return { 'fileSizeRang': true };
        }
        return null;
    };
}
var DefinedTestEditComponent = /** @class */ (function () {
    function DefinedTestEditComponent(_http, _fb, _avRoute, _router, baseUrl) {
        var _this = this;
        this._http = _http;
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._router = _router;
        this.showloader = false;
        this.formTitle = 'Create';
        this.myAppUrl = '';
        this.testDataDirectionIdOptionValue = 1;
        this.logFilePartitionTypeCheckValue = 1;
        this.breadcroumb = 'CreateTest';
        this.testTitle = '';
        var ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
        var reg = '((https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?)|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
        if (this._avRoute.snapshot.params['id']) {
            this.id = this._avRoute.snapshot.params['id'];
        }
        this.myAppUrl = baseUrl;
        this.getConfigList('repeatType')
            .subscribe(function (data) { _this.repeatTypeList = data; });
        this.getConfigList('testType')
            .subscribe(function (data) { _this.testTypeList = data; });
        this.getConfigList('testData')
            .subscribe(function (data) { _this.testDataList = data; });
        this.getConfigList('testDataType')
            .subscribe(function (data) { _this.testDataTypeList = data; });
        this.getConfigList('oTTService')
            .subscribe(function (data) { _this.oTTServiceList = data; });
        this.getConfigList('oTTServiceTest')
            .subscribe(function (data) { _this.oTTServiceTestList = data; });
        this.getConfigList('network')
            .subscribe(function (data) { _this.networkList = data; });
        this.getConfigList('band')
            .subscribe(function (data) { _this.bandList = data; });
        this.getConfigList('logFilePartitionType')
            .subscribe(function (data) { _this.logFilePartitionTypeList = data; });
        this.getConfigList('iPType')
            .subscribe(function (data) { _this.iPTypeList = data; });
        function validateIsSpouse(group) {
            var maritalStatus = group.get('maritalStatus').value;
            if (maritalStatus == "01") {
                return { isRequired: true };
            }
            return null;
        }
        this.definedTestForm = this._fb.group({
            id: 0,
            title: ['', Validators.required, this.validateUniqueTitle.bind(this)],
            isActive: true,
            layer3Messages: [false],
            repeatTypeId: [1, [Validators.required, Validators.min(1)]],
            repeatTime: [],
            repeatCount: [],
            measurementInterval: [5, [Validators.min(2), Validators.required]],
            testTypeId: [1, [Validators.min(1), Validators.required]],
            networkId: [2, [Validators.min(1), Validators.required]],
            bandId: [0, [Validators.min(0), Validators.required]],
            usualCallDuration: [],
            usualCallWaitTime: [],
            usualCallNumber: [''],
            testDataTypeId: [0],
            testDataId: [],
            testDataServer: ['', [Validators.pattern(reg)]],
            testDataUserName: [],
            testDataPassword: [],
            numberOfPings: [],
            packetSize: [],
            internalTime: [],
            responseWaitTime: [],
            ttl: [],
            ipTypeId: [1],
            testDataDownloadFileAddress: [],
            testDataUploadFileSize: [20, [fileSizeRangValidator(0.1, 1000)]],
            ottServiceId: [0],
            ottServiceTestId: [],
            saveLogFile: [false],
            logFilePartitionTypeId: [],
            logFilePartitionTime: [600],
            logFilePartitionSize: [20],
            logFileHoldTime: [240],
            traceRouteHubCount: [],
            repeatTypeTitle: [''],
            testTypeTitle: [''],
            testDataTypeTitle: [''],
            ottServiceTitle: [''],
            ottServiceTestTitle: [''],
            networkTitle: [''],
            bandTitle: [''],
            logFilePartitionTypeTitle: [''],
            ipTypeTitle: [''],
            editable: [true],
        }, { validators: MyAwesomeRangeValidator });
        this.saveLogFileCheckValue = this.definedTestForm.get('saveLogFile').value;
        if (this.id > 0) {
            this.formTitle = 'Edit';
            this.breadcroumb = 'EditTest';
            this.showloader = true;
            this.getDefinedTestById(this.id)
                .subscribe(function (response) {
                _this.testTitle = response['title'];
                _this.Editable = response['editable'];
                _this.testDataIdOptionValue = response['testDataId'];
                _this.testDataDirectionIdOptionValue = response['testDataTypeId'];
                _this.definedTestForm.setValue(response);
                _this.ottServiceTestIdOption = 1;
                _this.showloader = false;
            }, function (error) { return console.error(error); });
        }
        ;
    }
    DefinedTestEditComponent.prototype.ngOnInit = function () { };
    DefinedTestEditComponent.prototype.onOptionsSelected = function (value) {
        //console.log("the selected value is " + value['target']['selectedIndex']);
        var selectedtestDataId = this.testDataIdOptionValue = value['target']['selectedIndex'];
        this.definedTestForm.get('testDataServer').setValue(null);
        this.definedTestForm.get('numberOfPings').setValue(null);
        this.definedTestForm.get('packetSize').setValue(null);
        this.definedTestForm.get('internalTime').setValue(null);
        this.definedTestForm.get('responseWaitTime').setValue(null);
        this.definedTestForm.get('ttl').setValue(null);
        this.definedTestForm.get('traceRouteHubCount').setValue(null);
        if (selectedtestDataId == 3) {
            this.definedTestForm.get('testDataServer').setValue('www.google.com');
            this.definedTestForm.get('numberOfPings').setValue(4);
            this.definedTestForm.get('packetSize').setValue(64);
            this.definedTestForm.get('internalTime').setValue(20);
            this.definedTestForm.get('responseWaitTime').setValue(100);
            this.definedTestForm.get('ttl').setValue(255);
            this.definedTestForm.get('ipTypeId').setValue(1);
        }
        if (selectedtestDataId == 4) {
            this.definedTestForm.get('traceRouteHubCount').setValue(10);
            this.definedTestForm.get('testDataServer').setValue('www.google.com');
        }
    };
    DefinedTestEditComponent.prototype.onDirectionSelected = function (value) {
        this.testDataDirectionIdOptionValue = value['target']['selectedIndex'];
        if (this.testDataDirectionIdOptionValue == 2) { //Upload Selected
            this.definedTestForm.get('testDataServer').setValue('185.192.112.74');
        }
        else { //Download Selected
            this.definedTestForm.get('testDataServer').setValue(null);
        }
        //In MosCall Test
        if (this.testTypeId.value == 2) {
            if (value["target"]["selectedIndex"] == 1) { //downlink
                this.definedTestForm.get('usualCallNumber').setValue("02186121407");
            }
            if (value["target"]["selectedIndex"] == 2) { //uplink
                this.definedTestForm.get('usualCallNumber').setValue("02186121406");
            }
        }
    };
    DefinedTestEditComponent.prototype.onTestTypeOptionsSelected = function (value) {
        var selectedTestTypeId = value['target']['selectedIndex'];
        this.definedTestForm.get('usualCallDuration').setValue(null);
        this.definedTestForm.get('usualCallWaitTime').setValue(null);
        this.definedTestForm.get('usualCallNumber').setValue(null);
        this.definedTestForm.get('saveLogFile').setValue(false);
        this.definedTestForm.get('testDataServer').setValue(null);
        if (selectedTestTypeId == 1 /*call*/) {
            this.definedTestForm.get('usualCallDuration').setValue(45);
            this.definedTestForm.get('usualCallWaitTime').setValue(5);
            this.definedTestForm.get('usualCallNumber').setValue("982181713999");
            this.definedTestForm.get('saveLogFile').setValue(true);
        }
        if (selectedTestTypeId == 2 /*Moscall*/) {
            this.definedTestForm.get('testDataId').setValue(0); //TransferType
            this.definedTestForm.get('testDataTypeId').setValue(0); //TransferDirection
            this.definedTestForm.get('usualCallDuration').setValue(20);
            this.definedTestForm.get('usualCallWaitTime').setValue(10);
            this.definedTestForm.get('usualCallNumber').setValue("02186121407");
            this.definedTestForm.get('saveLogFile').setValue(false);
        }
        if (selectedTestTypeId == 3 /*Idle*/) {
            this.definedTestForm.get('saveLogFile').setValue(true);
            this.definedTestForm.get('usualCallDuration').setValue(45);
            this.definedTestForm.get('usualCallNumber').setValue("02181713999");
            this.definedTestForm.get('usualCallWaitTime').setValue(5);
        }
        if (selectedTestTypeId == 4 /*data*/) {
            this.definedTestForm.get('testDataId').setValue(0); //TransferType
            this.definedTestForm.get('testDataTypeId').setValue(0); //TransferDirection
        }
    };
    DefinedTestEditComponent.prototype.save = function () {
        var _this = this;
        if (!this.definedTestForm.valid) {
            return;
        }
        /** هر مسیری کاربر وارد کند در حالت آپلود توکن
         * Upload
         * به ابتدای
         * TestDataDownloadFileAddress
         * اضافه خواهد شد. چون اکشن آپلود فایل می باشد.
         */
        if (this.definedTestForm.value.usualCallNumber) {
            this.definedTestForm.get('usualCallNumber').setValue(this.definedTestForm.value.usualCallNumber.toString());
        }
        if (this.definedTestForm.get('testDataDownloadFileAddress').value != null &&
            ((this.definedTestForm.get('testTypeId').value == 4 && /*Data */
                this.definedTestForm.get('testDataId').value == 2 && /*Http */
                this.definedTestForm.get('testDataTypeId').value == 2) /*Upload*/)) {
            var curvar = this.definedTestForm.get('testDataDownloadFileAddress').value;
            if (curvar == "" || curvar == null) {
                this.definedTestForm.get('testDataDownloadFileAddress').setValue('Uploads/');
            }
            else {
                curvar = curvar.replace('/', '').replace('\\', ''); //اگر کاربر ، کاراکتر وارد کرده بود، حذف شود
                this.definedTestForm.get('testDataDownloadFileAddress').setValue('Uploads/' + curvar);
            }
        }
        if (this.definedTestForm.get('testTypeId').value == 2 /*moscall */) {
            //در تست موس کال در نهایت یک فایل بر روی سرور آپلود میشود
            // if(this.definedTestForm.get('testDataTypeId').value==2)/**Upload */ {
            var curvar = this.definedTestForm.get('testDataDownloadFileAddress').value;
            if (curvar == "" || curvar == null) {
                this.definedTestForm.get('testDataDownloadFileAddress').setValue('Uploads/');
            }
            else {
                curvar = curvar.replace('/', '').replace('\\', ''); //اگر کاربر ، کاراکتر وارد کرده بود، حذف شود
                this.definedTestForm.get('testDataDownloadFileAddress').setValue('Uploads/' + curvar);
            }
            //}
        }
        if (this.formTitle === 'Create') {
            this.saveMachine(this.definedTestForm.value)
                .subscribe(function () {
                _this._router.navigate(['/Test']);
            }, function (error) { return console.log(error); });
        }
        else if (this.formTitle === 'Edit') {
            this.updateMachine(this.definedTestForm.value)
                .subscribe(function () {
                _this._router.navigate(['/Test']);
            }, function (error) { return console.error(error); });
        }
    };
    DefinedTestEditComponent.prototype.cancel = function () {
        this._router.navigate(['/Test']);
    };
    DefinedTestEditComponent.prototype.getDefinedTestById = function (id) {
        return this._http.get(this.myAppUrl + 'api/DefinedTest/Details/' + id)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestEditComponent.prototype.saveMachine = function (definedTest) {
        return this._http.post(this.myAppUrl + 'api/DefinedTest/Create', definedTest)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestEditComponent.prototype.updateMachine = function (definedTest) {
        return this._http.put(this.myAppUrl + 'api/DefinedTest/Edit', definedTest)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestEditComponent.prototype.getConfigList = function (configName) {
        return this._http.get(this.myAppUrl + 'api/Config/GetConfigDatas/' + configName)
            .pipe(map(function (response) {
            return response;
        }));
    };
    DefinedTestEditComponent.prototype.validateUniqueTitle = function (control) {
        var _this = this;
        return this._http.get(this.myAppUrl + 'api/DefinedTest/CheckTitle?title=' + control.value)
            .pipe(map(function (response) {
            if (_this.formTitle != 'Edit') {
                if (response['id'] > 0) {
                    return { titleExist: true };
                }
                else {
                    return null;
                }
            }
            else { //this.formTitle=='Edit'
                if (response['id'] > 0) { // object from server Exist
                    if (response['id'] == _this.id) { //id from api equal by selectedRow Id
                        return null;
                    }
                    else {
                        return { titleExist: true };
                    }
                }
            }
        }));
    };
    Object.defineProperty(DefinedTestEditComponent.prototype, "title", {
        get: function () { return this.definedTestForm.get('title'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "isActive", {
        get: function () { return this.definedTestForm.get('isActive'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "layer3Messages", {
        get: function () { return this.definedTestForm.get('layer3Messages'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "repeatTypeId", {
        get: function () { return this.definedTestForm.get('repeatTypeId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "repeatTime", {
        get: function () { return this.definedTestForm.get('repeatTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "repeatCount", {
        get: function () { return this.definedTestForm.get('repeatCount'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "measurementInterval", {
        get: function () { return this.definedTestForm.get('measurementInterval'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "testTypeId", {
        get: function () { return this.definedTestForm.get('testTypeId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "usualCallDuration", {
        get: function () { return this.definedTestForm.get('usualCallDuration'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "usualCallWaitTime", {
        get: function () { return this.definedTestForm.get('usualCallWaitTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "usualCallNumber", {
        get: function () { return this.definedTestForm.get('usualCallNumber'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "testDataId", {
        get: function () { return this.definedTestForm.get('testDataId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "testDataTypeId", {
        get: function () { return this.definedTestForm.get('testDataTypeId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "testDataServer", {
        get: function () { return this.definedTestForm.get('testDataServer'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "testDataUserName", {
        get: function () { return this.definedTestForm.get('testDataUserName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "testDataPassword", {
        get: function () { return this.definedTestForm.get('testDataPassword'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "testDataDownloadFileAddress", {
        get: function () { return this.definedTestForm.get('testDataDownloadFileAddress'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "testDataUploadFileSize", {
        get: function () { return this.definedTestForm.get('testDataUploadFileSize'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "ipTypeId", {
        get: function () { return this.definedTestForm.get('ipTypeId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "ottServiceId", {
        get: function () { return this.definedTestForm.get('ottServiceId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "ottServiceTestId", {
        get: function () { return this.definedTestForm.get('oTTServiceTestId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "networkId", {
        get: function () { return this.definedTestForm.get('networkId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "bandId", {
        get: function () { return this.definedTestForm.get('bandId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "saveLogFile", {
        get: function () { return this.definedTestForm.get('saveLogFile'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "logFilePartitionTypeId", {
        get: function () { return this.definedTestForm.get('logFilePartitionTypeId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "logFilePartitionTime", {
        get: function () { return this.definedTestForm.get('logFilePartitionTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "logFilePartitionSize", {
        get: function () { return this.definedTestForm.get('logFilePartitionSize'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "logFileHoldTime", {
        get: function () { return this.definedTestForm.get('logFileHoldTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "numberOfPings", {
        get: function () { return this.definedTestForm.get('numberOfPings'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "packetSize", {
        get: function () { return this.definedTestForm.get('packetSize'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "internalTime", {
        get: function () { return this.definedTestForm.get('internalTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "responseWaitTime", {
        get: function () { return this.definedTestForm.get('responseWaitTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "ttl", {
        get: function () { return this.definedTestForm.get('ttl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefinedTestEditComponent.prototype, "TraceRouteHubCount", {
        get: function () { return this.definedTestForm.get('traceRouteHubCount'); },
        enumerable: true,
        configurable: true
    });
    DefinedTestEditComponent = __decorate([
        Component({
            selector: 'app-edit-defined-test',
            templateUrl: './definedTestEdit.component.html',
            styleUrls: ['./definedTestEdit.component.css']
        }),
        __param(4, Inject('BASE_URL')),
        __metadata("design:paramtypes", [HttpClient, FormBuilder, ActivatedRoute,
            Router, String])
    ], DefinedTestEditComponent);
    return DefinedTestEditComponent;
}());
export { DefinedTestEditComponent };
//# sourceMappingURL=definedTestEdit.component.js.map