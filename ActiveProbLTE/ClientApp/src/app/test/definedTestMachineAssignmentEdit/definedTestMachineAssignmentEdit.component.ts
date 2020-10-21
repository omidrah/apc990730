import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DefinedTestMachine } from '../../Shared/models/definedTestMachine';
import { NgbCalendar, NgbDatepickerI18n, NgbCalendarPersian, NgbDateStruct, NgbTimeStruct, NgbInputDatepicker, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18nPersian } from '../../Shared/services/NgbDatepickerI18nPersian';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

// only used for modal
declare var $: any;

@Component({
  selector: 'app-edit-defined-test-machine-assignment',
  templateUrl: './definedTestMachineAssignmentEdit.component.html',
  styleUrls: ['./definedTestMachineAssignmentEdit.component.css'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
  ]
})
export class DefinedTestMachineAssignmentEditComponent implements OnInit {

  public showloader: boolean = false;

  definedTestMachineForm: FormGroup;
  machineTitle: string;
  formTitle = 'Create';
  machineId: number;
  errorMessage: any;
  myAppUrl = '';
  definedTestList: any;
  definedTestMachineList: any;
  id = 0;
  endDate: NgbDateStruct;
  beginDate: NgbDateStruct;
  beginDateTime: NgbTimeStruct;
  endDateTime: NgbTimeStruct;
  defaultDate: Date;
  //defaultTime: NgbTimeStruct;

  breadcroumb = 'TestAssignment';

  ReplaceTestConfirmMessage = "";

  constructor(private _http: HttpClient,
    private _fb: FormBuilder,
    private _avRoute: ActivatedRoute,
    private _router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private toastrService: ToastrService,
    private translate: TranslateService
  ) {
    if (this._avRoute.snapshot.params['Title']) {
      this.machineTitle = this._avRoute.snapshot.params['Title'];
    }
    this.getDefinedTestList().subscribe(
      (data) => {
        this.definedTestList = data;
      });
    this.definedTestMachineForm = this._fb.group({
      id: 0,
      definedTestId: [0, [Validators.required, Validators.min(1)]],
      isActive: [true, [Validators.required]],
      machineId: [0],
      beginDate: [, Validators.required],
      endDate: [, Validators.required],
      sim: [0, [Validators.required, Validators.min(1)]],
      beginDateTime: [/*this.defaultTime*/, Validators.required],
      endDateTime: [/*this.defaultTime*/, Validators.required],
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
          .subscribe((response) => {

            //this.definedTestMachineForm.setValue(response);
            this.definedTestMachineForm.controls['id'].setValue(response["id"]);
            this.definedTestMachineForm.controls['definedTestId'].setValue(response["definedTestId"]);
            this.definedTestMachineForm.controls['isActive'].setValue(response["isActive"]);
            this.definedTestMachineForm.controls['machineId'].setValue(response["machineId"]);
            this.definedTestMachineForm.controls['sim'].setValue(response["sim"]);

            this.definedTestMachineForm.controls['beginDate'].setValue(response["bDate"]);
            this.definedTestMachineForm.controls['endDate'].setValue(response["eDate"]);

            var bdate = new Date(response["bDate"]);
            var btime = ('00' + bdate.getHours()).substr(-2) + ":" + ('00' + bdate.getMinutes()).substr(-2)
            this.definedTestMachineForm.controls['beginDateTime'].setValue(btime);


            var edate = new Date(response["eDate"]);
            var etime = ('00' + edate.getHours()).substr(-2) + ":" + ('00' + edate.getMinutes()).substr(-2);
            this.definedTestMachineForm.controls['endDateTime'].setValue(etime);

            this.definedTestMachineForm.controls['bDate'].setValue(bdate);
            this.definedTestMachineForm.controls['eDate'].setValue(edate);


            this.showloader = false;

          }, error => console.error(error))
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
  ngOnInit() {
  }
  getDefinedTestMachineById(id: number) {
    return this._http.get(this.myAppUrl + 'api/DefinedTestMachine/Details/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }
  cancel() {
    this._router.navigate(['/Test/Assignment/Machine/' + this.machineId + "/" + this.machineTitle]);
  }
  getDefinedTests(id: number) {
    this._http.get(this.myAppUrl + 'api/Machine/IndexWithDefinedTest/' + id).pipe(map(
      response => {
        return response;
      }
    )).subscribe(
      (data) => {
        this.definedTestMachineList = data;
      }
    );
  }
  getDefinedTestList() {
    return this._http.get(this.myAppUrl + 'api/DefinedTest/index/')
      .pipe(map(
        response => {
          return response;
        }));
  }
  getDefaultDateTime() {
    return this._http.get(this.myAppUrl + 'api/DefinedTestMachine/DefaultDateTime/')
      .pipe(map(
        response => {
          return response;
        }));
  }
  saveDefinedTestMachine(definedTestMachine: DefinedTestMachine) {
    return this._http.post(this.myAppUrl + 'api/DefinedTestMachine/Create', definedTestMachine)
      .pipe(map(
        response => {
          return response;
        }));
  }
  updateDefinedTestMachine(definedTestMachine: DefinedTestMachine) {
    return this._http.put(this.myAppUrl + 'api/DefinedTestMachine/Edit', definedTestMachine)
      .pipe(map(
        response => {
          return response;
        }));
  }
  IsDefinedTestForMachineByMachineID(definedTestMachine: DefinedTestMachine) {
    return this._http.post(this.myAppUrl + 'api/DefinedTestMachine/IsDefinedTestForMachineByMachineID', definedTestMachine)
      .pipe(map(
        response => {
          return response;
        }));
  }
  IsDefinedTestForMachineGroupAndParentByMachineID(definedTestMachine: DefinedTestMachine) {
    return this._http.post(this.myAppUrl + 'api/DefinedTestMachine/IsDefinedTestForMachineGroupAndParentByMachineID', definedTestMachine)
      .pipe(map(
        response => {
          return response;
        }));
  }
  DeactivateTestForMachineGroupAndDefinedTestMachine(definedTestMachine: DefinedTestMachine) {
    return this._http.post(this.myAppUrl + 'api/DefinedTestMachine/DeactivateTestForMachineGroupAndDefinedTestMachine', definedTestMachine)
      .pipe(map(
        response => {
          return response;
        }));
  }

  get definedTestId() { return this.definedTestMachineForm.get('definedTestId'); }
  get isActive() { return this.definedTestMachineForm.get('isActive'); }
  get sim() { return this.definedTestMachineForm.get('sim'); }
  // convenience getter for easy access to form fields
  get f() { return this.definedTestMachineForm.controls; }


  save_Old() {
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
        .subscribe((result) => {

          this.showloader = false;

          if (result == 0) {

            this.showloader = true;

            this.IsDefinedTestForMachineByMachineID(this.definedTestMachineForm.value)
              .subscribe((res) => {

                this.showloader = true;

                if (res == 0) {
                  this.saveDefinedTestMachine(this.definedTestMachineForm.value)
                    .subscribe(() => {

                      this.showloader = false;

                      this._router.navigate(['/Test/Assignment/Machine/' + this.machineId + "/" + this.machineTitle]);
                    }, error => console.error(error));
                }
                else {

                  this.showloader = false;
                  $('#modal-default').modal('show');
                  this.ReplaceTestConfirmMessage = this.translate.instant('InterferenceTestDateRangeConfirmMessage');
                }
              }, error => console.error(error));
          }
          else {

            this.showloader = false;
            $('#modal-default').modal('show');
            this.ReplaceTestConfirmMessage = this.translate.instant('InterferenceTestDateRangeConfirmMessage');
          }

        }, error => console.error(error));

    } else if (this.formTitle === 'Edit') {

      this.updateDefinedTestMachine(this.definedTestMachineForm.value)
        .subscribe(() => {
          this.showloader = false;
          this._router.navigate(['/Test/Assignment/Machine/' + this.machineId + "/" + this.machineTitle]);
        }, error => console.error(error));
    }
  }
  AcceptConfirm_Old() {

    //فراخانی متد غیرفعال سازی تست های گروهی و ذخیره تست انفرادی
    this.DeactivateTestForMachineGroupAndDefinedTestMachine(this.definedTestMachineForm.value)
      .subscribe(() => {

        $('#modal-default').modal('hide');
        this.showloader = true;
        this._router.navigate(['/Test/Assignment/Machine/' + this.machineId + "/" + this.machineTitle]);
      });
  }

  save(reblace: boolean) {

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
      .subscribe((result) => {

        this.showloader = false;

        if (result["succeed"] == true)
          if (result["result"] == true) {
            $('#modal-default').modal('hide');
            this._router.navigate(['/Test/Assignment/Machine/' + this.machineId + "/" + this.machineTitle]);
          }
          else {
            $('#modal-default').modal('show');
            this.ReplaceTestConfirmMessage = this.translate.instant(result["message"]);
          }
        else
          this.toastrService.error(this.translate.instant('DatabaseActionError'), this.translate.instant('Error'));
      });
  }
  AcceptConfirm() {
    this.save(true);
  }
  saveDefinedTestMachineNia(definedTestMachine: DefinedTestMachine, reblace: boolean) {
    if (!reblace)
      return this._http.post('api/DefinedTestMachine/CreateNia', definedTestMachine);
    else
      return this._http.post('api/DefinedTestMachine/CreateAndDeactiveNia', definedTestMachine);
  }
}
