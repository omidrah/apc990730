import { DefinedTest } from '../../Shared/models/definedTest';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const MyAwesomeRangeValidator: ValidatorFn = (fg: FormGroup) => {
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

  const testTypeId = fg.get('testTypeId').value;
  const repeatTypeId = fg.get('repeatTypeId').value;
  const saveLog = fg.get('saveLogFile').value;

  if (false) {
    return { range: false }
  }
  //addby omid -- check logfileSize and other parameter
  if (saveLog) { //true
    if (fg.get('logFilePartitionTypeId').value == null || fg.get('logFilePartitionTypeId').value == 0) { //نوع ذخیره سازی را مشخص نکرده و تیک ذخیره سازی خورده
      fg.get('logFilePartitionTypeId').setErrors({ 'incorrect': true });
    }
    if (fg.get('logFilePartitionTypeId').value == 1) {//time
      if (fg.get('logFilePartitionTime').value == null || fg.get('logFilePartitionTime').value < 1) {
        fg.get('logFilePartitionTime').setErrors({ 'incorrect': true });
        fg.get('logFilePartitionSize').setErrors(null);
      }
    }
    else if (fg.get('logFilePartitionTypeId').value == 2) {//size
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
  if (testTypeId == 2) {//MosCall
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
    if (fg.get('testDataId').value == 3) {//ping

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
    if (fg.get('testDataId').value == 4) {//TraceRoute
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
    if (fg.get('testDataId').value != 2) {//Only Http In Data Test
      //fg.get('testDataUploadFileSize').setErrors(null);
    }
    else {
      fg.get('testDataId').value == 2
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
function fileSizeRangValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
      return { 'fileSizeRang': true }
    }
    return null;
  }
}
@Component({
  selector: 'app-edit-defined-test',
  templateUrl: './definedTestEdit.component.html',
  styleUrls: ['./definedTestEdit.component.css']
})
export class DefinedTestEditComponent implements OnInit {

  public showloader: boolean = false;

  definedTestForm: FormGroup;
  formTitle = 'Create';
  id: number;
  errorMessage: any;
  myAppUrl = '';
  repeatTypeList: any[];//None, Time, Count
  testTypeList: any[];//UsualCall, MosCall, Idle, Data, OTTServices
  testDataList: any[];//FTP, HTTP, Ping, TraceRoute,...
  testDataTypeList: any[];//Download, Upload    
  oTTServiceList: any[];//Skype, WhatsApp, Instagram
  oTTServiceTestList: any[];//VoiceCall, SendText, Pic
  networkList: any[];//GSM Only, WCDMA Only, LTE Only, GSM + WCDMA, ...
  bandList: any[];//7600, ...
  logFilePartitionTypeList: any[];//Time/Size
  iPTypeList: any[];//IPV4 or IPV6
  testDataIdOptionValue: number;
  testDataDirectionIdOptionValue: number = 1;
  ottServiceTestIdOption: 1;
  saveLogFileCheckValue: boolean;
  logFilePartitionTypeCheckValue: number = 1;
  testTypeIdOptionValue: number;
  repeatTypeOptionValue: number;
  iPTypeIdOptionValue: number;
  traceRouteHubCount: number;

  Editable: true;

  breadcroumb = 'CreateTest';
  testTitle = '';


  constructor(private _http: HttpClient, private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _router: Router, @Inject('BASE_URL') baseUrl: string) {
    const ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    const reg = '((https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?)|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
    if (this._avRoute.snapshot.params['id']) {
      this.id = this._avRoute.snapshot.params['id'];
    }
    this.myAppUrl = baseUrl;
    this.getConfigList('repeatType')
      .subscribe((data: any) => { this.repeatTypeList = data });
    this.getConfigList('testType')
      .subscribe((data: any) => { this.testTypeList = data });
    this.getConfigList('testData')
      .subscribe((data: any) => { this.testDataList = data });
    this.getConfigList('testDataType')
      .subscribe((data: any) => { this.testDataTypeList = data });
    this.getConfigList('oTTService')
      .subscribe((data: any) => { this.oTTServiceList = data });
    this.getConfigList('oTTServiceTest')
      .subscribe((data: any) => { this.oTTServiceTestList = data });
    this.getConfigList('network')
      .subscribe((data: any) => { this.networkList = data });
    this.getConfigList('band')
      .subscribe((data: any) => { this.bandList = data });
    this.getConfigList('logFilePartitionType')
      .subscribe((data: any) => { this.logFilePartitionTypeList = data });
    this.getConfigList('iPType')
      .subscribe((data: any) => { this.iPTypeList = data });

    function validateIsSpouse(group: FormGroup) {
      let maritalStatus = group.get('maritalStatus').value;
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
        .subscribe((response: DefinedTest) => {

          this.testTitle = response['title'];
          this.Editable = response['editable'];

          this.testDataIdOptionValue = response['testDataId'];
          this.testDataDirectionIdOptionValue = response['testDataTypeId'];
          this.definedTestForm.setValue(response);
          this.ottServiceTestIdOption = 1;

          this.showloader = false;

        }, error => console.error(error))
    };
  }
  ngOnInit() { }
  onOptionsSelected(value: object) {
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
  }
  onDirectionSelected(value: object) {
    this.testDataDirectionIdOptionValue = value['target']['selectedIndex'];

    if (this.testDataDirectionIdOptionValue == 2) {//Upload Selected
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
      if (value["target"]["selectedIndex"] == 2) {//uplink
        this.definedTestForm.get('usualCallNumber').setValue("02186121406");
      }
    }
  }
  onTestTypeOptionsSelected(value: object) {
    var selectedTestTypeId = value['target']['selectedIndex'];
    this.definedTestForm.get('usualCallDuration').setValue(null);
    this.definedTestForm.get('usualCallWaitTime').setValue(null);
    this.definedTestForm.get('usualCallNumber').setValue(null);
    this.definedTestForm.get('saveLogFile').setValue(false);
    this.definedTestForm.get('testDataServer').setValue(null);
    if (selectedTestTypeId == 1/*call*/) {
      this.definedTestForm.get('usualCallDuration').setValue(45);
      this.definedTestForm.get('usualCallWaitTime').setValue(5);
      this.definedTestForm.get('usualCallNumber').setValue("982181713999");
      this.definedTestForm.get('saveLogFile').setValue(true);
    }
    if (selectedTestTypeId == 2/*Moscall*/) {
      this.definedTestForm.get('testDataId').setValue(0);//TransferType
      this.definedTestForm.get('testDataTypeId').setValue(0); //TransferDirection
      this.definedTestForm.get('usualCallDuration').setValue(20);
      this.definedTestForm.get('usualCallWaitTime').setValue(10);
      this.definedTestForm.get('usualCallNumber').setValue("02186121407");
      this.definedTestForm.get('saveLogFile').setValue(false);
    }
    if (selectedTestTypeId == 3/*Idle*/) {
      this.definedTestForm.get('saveLogFile').setValue(true);
      this.definedTestForm.get('usualCallDuration').setValue(45);
      this.definedTestForm.get('usualCallNumber').setValue("02181713999");
      this.definedTestForm.get('usualCallWaitTime').setValue(5);
    }
    if (selectedTestTypeId == 4/*data*/) {
      this.definedTestForm.get('testDataId').setValue(0);//TransferType
      this.definedTestForm.get('testDataTypeId').setValue(0); //TransferDirection
    }
  }
  save() {
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

    if (
      this.definedTestForm.get('testDataDownloadFileAddress').value != null &&
      (
        (this.definedTestForm.get('testTypeId').value == 4 && /*Data */
          this.definedTestForm.get('testDataId').value == 2 &&   /*Http */
          this.definedTestForm.get('testDataTypeId').value == 2) /*Upload*/
      )
    ) {
      var curvar = this.definedTestForm.get('testDataDownloadFileAddress').value;
      if (curvar == "" || curvar == null) {
        this.definedTestForm.get('testDataDownloadFileAddress').setValue('Uploads/');
      }
      else {
        curvar = curvar.replace('/', '').replace('\\', ''); //اگر کاربر ، کاراکتر وارد کرده بود، حذف شود
        this.definedTestForm.get('testDataDownloadFileAddress').setValue('Uploads/' + curvar);
      }
    }
    if (this.definedTestForm.get('testTypeId').value == 2/*moscall */) {
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
        .subscribe(() => {
          this._router.navigate(['/Test']);
        },
          error => console.log(error));
    } else if (this.formTitle === 'Edit') {
      this.updateMachine(this.definedTestForm.value)
        .subscribe(() => {
          this._router.navigate(['/Test']);
        }, error => console.error(error));
    }
  }
  cancel() {
    this._router.navigate(['/Test']);
  }
  getDefinedTestById(id: number) {
    return this._http.get(this.myAppUrl + 'api/DefinedTest/Details/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }
  saveMachine(definedTest: DefinedTest) {
    return this._http.post(this.myAppUrl + 'api/DefinedTest/Create', definedTest)
      .pipe(map(
        response => {
          return response;
        }));
  }
  updateMachine(definedTest: DefinedTest) {
    return this._http.put(this.myAppUrl + 'api/DefinedTest/Edit', definedTest)
      .pipe(map(
        response => {
          return response;
        }));
  }
  getConfigList(configName: string) {
    return this._http.get(this.myAppUrl + 'api/Config/GetConfigDatas/' + configName)
      .pipe(map(
        response => {
          return response;
        }));
  }
  validateUniqueTitle(control: AbstractControl) {
    return this._http.get(this.myAppUrl + 'api/DefinedTest/CheckTitle?title=' + control.value)
      .pipe(map(
        response => {
          if (this.formTitle != 'Edit') {
            if (response['id'] > 0) {
              return { titleExist: true };
            }
            else { return null }
          }
          else {  //this.formTitle=='Edit'
            if (response['id'] > 0) { // object from server Exist
              if (response['id'] == this.id) { //id from api equal by selectedRow Id
                return null;
              }
              else {
                return { titleExist: true };
              }
            }
          }
        }));
  }

  get title() { return this.definedTestForm.get('title'); }
  get isActive() { return this.definedTestForm.get('isActive'); }
  get layer3Messages() { return this.definedTestForm.get('layer3Messages'); }
  get repeatTypeId() { return this.definedTestForm.get('repeatTypeId'); }
  get repeatTime() { return this.definedTestForm.get('repeatTime'); }
  get repeatCount() { return this.definedTestForm.get('repeatCount'); }
  get measurementInterval() { return this.definedTestForm.get('measurementInterval'); }
  get testTypeId() { return this.definedTestForm.get('testTypeId'); }
  get usualCallDuration() { return this.definedTestForm.get('usualCallDuration'); }
  get usualCallWaitTime() { return this.definedTestForm.get('usualCallWaitTime'); }
  get usualCallNumber() { return this.definedTestForm.get('usualCallNumber'); }
  get testDataId() { return this.definedTestForm.get('testDataId'); }
  get testDataTypeId() { return this.definedTestForm.get('testDataTypeId'); }
  get testDataServer() { return this.definedTestForm.get('testDataServer'); }
  get testDataUserName() { return this.definedTestForm.get('testDataUserName'); }
  get testDataPassword() { return this.definedTestForm.get('testDataPassword'); }
  get testDataDownloadFileAddress() { return this.definedTestForm.get('testDataDownloadFileAddress'); }
  get testDataUploadFileSize() { return this.definedTestForm.get('testDataUploadFileSize'); }
  get ipTypeId() { return this.definedTestForm.get('ipTypeId'); }
  get ottServiceId() { return this.definedTestForm.get('ottServiceId'); }
  get ottServiceTestId() { return this.definedTestForm.get('oTTServiceTestId'); }
  get networkId() { return this.definedTestForm.get('networkId'); }
  get bandId() { return this.definedTestForm.get('bandId'); }
  get saveLogFile() { return this.definedTestForm.get('saveLogFile'); }
  get logFilePartitionTypeId() { return this.definedTestForm.get('logFilePartitionTypeId'); }
  get logFilePartitionTime() { return this.definedTestForm.get('logFilePartitionTime'); }
  get logFilePartitionSize() { return this.definedTestForm.get('logFilePartitionSize'); }
  get logFileHoldTime() { return this.definedTestForm.get('logFileHoldTime'); }
  get numberOfPings() { return this.definedTestForm.get('numberOfPings'); }
  get packetSize() { return this.definedTestForm.get('packetSize'); }
  get internalTime() { return this.definedTestForm.get('internalTime'); }
  get responseWaitTime() { return this.definedTestForm.get('responseWaitTime'); }
  get ttl() { return this.definedTestForm.get('ttl'); }
  get TraceRouteHubCount() { return this.definedTestForm.get('traceRouteHubCount'); }
}

