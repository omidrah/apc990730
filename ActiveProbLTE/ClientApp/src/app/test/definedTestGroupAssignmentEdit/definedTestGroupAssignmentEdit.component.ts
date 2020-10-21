import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DefinedTestGroup } from '../../Shared/models/definedTestGroup';
import { NgbCalendar, NgbDatepickerI18n, NgbCalendarPersian, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18nPersian } from '../../Shared/services/NgbDatepickerI18nPersian';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

// only used for modal
declare var $: any;

@Component({
  selector: 'app-edit-defined-test-group-assignment',
  templateUrl: './definedTestGroupAssignmentEdit.component.html',
  styleUrls: ['./definedTestGroupAssignmentEdit.component.css'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
  ]
})
export class DefinedTestGroupAssignmentEditComponent implements OnInit {

  public showloader: boolean = false;

  definedTestGroupForm: FormGroup;
  formTitle = 'Create';
  machineGroupId: number;
  GroupTitle: string;
  errorMessage: any;
  myAppUrl = '';
  definedTestList: any;
  id = 0;
  endDate: NgbDateStruct;
  beginDate: NgbDateStruct;
  beginDateTime: NgbTimeStruct;
  endDateTime: NgbTimeStruct;
  defaultDate: Date;
  //defaultDate: NgbDateStruct;

  breadcroumb = 'AssignTestToGroup';

  ReplaceTestConfirmMessage = "";

  //defaultTime: NgbTimeStruct;
  constructor(
    private _http: HttpClient,
    private _fb: FormBuilder,
    private _avRoute: ActivatedRoute,
    private _router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private toastrService: ToastrService,
    private translate: TranslateService
  ) {
    this.getDefinedTestList().subscribe(
      (data) => {
        this.definedTestList = data
      }
    );
    this.definedTestGroupForm = this._fb.group({
      id: 0,
      definedTestId: [0, [Validators.required, Validators.min(1)]],
      isActive: [true, [Validators.required]],
      machineGroupId: [0],
      beginDate: [, Validators.required],
      endDate: [, Validators.required],
      sim: [0, [Validators.required, Validators.min(1)]],
      beginDateTime: [/*this.defaultTime*/, Validators.required],
      endDateTime: [/*this.defaultTime*/, Validators.required],
      bDate: [],
      eDate: []
    })
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
          .subscribe((response: DefinedTestGroup) => {

            //this.definedTestGroupForm.setValue(response[0]);

            this.definedTestGroupForm.controls['id'].setValue(response["id"]);
            this.definedTestGroupForm.controls['definedTestId'].setValue(response["definedTestId"]);
            this.definedTestGroupForm.controls['isActive'].setValue(response["isActive"]);
            this.definedTestGroupForm.controls['machineGroupId'].setValue(response["machineGroupId"]);
            this.definedTestGroupForm.controls['sim'].setValue(response["sim"]);


            this.definedTestGroupForm.controls['beginDate'].setValue(response["bDate"]);
            this.definedTestGroupForm.controls['endDate'].setValue(response["eDate"]);

            var bdate = new Date(response["bDate"]);
            var btime = ('00' + bdate.getHours()).substr(-2) + ":" + ('00' + bdate.getMinutes()).substr(-2)
            this.definedTestGroupForm.controls['beginDateTime'].setValue(btime);


            var edate = new Date(response["eDate"]);
            var etime = ('00' + edate.getHours()).substr(-2) + ":" + ('00' + edate.getMinutes()).substr(-2);
            this.definedTestGroupForm.controls['endDateTime'].setValue(etime);

            this.showloader = false;

          }, error => console.error(error))
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
  ngOnInit() {
    if (this.id > 0) {
      //this.definedTestGroupForm.get('definedTestId').disable();
      //this.definedTestGroupForm.get('beginDate').disable();
      //this.definedTestGroupForm.get('endDate').disable();
      //this.definedTestGroupForm.get('sim').disable();
      //this.definedTestGroupForm.get('beginDateTime').disable();
      //this.definedTestGroupForm.get('endDateTime').disable();
    }
  }
  getDefinedTestGroupById(id: number) {
    return this._http.get(this.myAppUrl + 'api/DefinedTestMachineGroup/Details/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }
  cancel() {
    this._router.navigate(['/Test/Group/Assignment/', this.machineGroupId, this.GroupTitle]);
  }
  getDefinedTestList() {
    return this._http.get(this.myAppUrl + 'api/DefinedTest/index/')
      .pipe(map(
        response => {
          return response;
        }));
  }
  getDefaultDateTime() {
    return this._http.get(this.myAppUrl + 'api/DefinedTestMachineGroup/DefaultDateTime/')
      .pipe(map(
        response => {
          return response;
        }));
  }
  saveDefinedTestGroup(definedTestGroup: DefinedTestGroup) {
    return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/Create', definedTestGroup)
      .pipe(map(
        response => {
          return response;
        }));
  }
  updateDefinedTestGroup(definedTestGroup: DefinedTestGroup) {
    return this._http.put(this.myAppUrl + 'api/DefinedTestMachineGroup/Edit', definedTestGroup)
      .pipe(map(
        response => {
          return response;
        }));
  }



  IsDefinedTestForMachineGroupAndParent(definedTestGroup: DefinedTestGroup) {
    return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/IsDefinedTestForMachineGroupAndParent', definedTestGroup)
      .pipe(map(
        response => {
          return response;
        }));
  }

  IsDefinedTestForMachineAndParent(definedTestGroup: DefinedTestGroup) {
    return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/IsDefinedTestForMachineParent', definedTestGroup)
      .pipe(map(
        response => {
          return response;
        }));
  }

  DeactivateTestForMachineInGroupAndParent(definedTestGroup: DefinedTestGroup) {
    return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/DeactivateTestForMachineInGroupAndParent', definedTestGroup)
      .pipe(
        response => {
          return response;
        });
  }

  DeactivateTestForMachineAndDefinedTestMachineGroup(definedTestGroup: DefinedTestGroup) {
    return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/DeactivateTestForMachineAndDefinedTestMachineGroup', definedTestGroup)
      .pipe(map(
        response => {
          return response;
        }));
  }

  get definedTestId() { return this.definedTestGroupForm.get('definedTestId'); }
  get isActive() { return this.definedTestGroupForm.get('isActive'); }
  get sim() { return this.definedTestGroupForm.get('sim'); }

  // convenience getter for easy access to form fields
  get f() { return this.definedTestGroupForm.controls; }

  save_Old() {
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
        .subscribe((result) => {

          this.showloader = false;

          if (result == 0) {

            this.showloader = true;

            //بررسی وجود تست انفرادی برای همه دستگاه های گروه
            this.IsDefinedTestForMachineAndParent(this.definedTestGroupForm.value)
              .subscribe((mustBeDeactivateTestNumber) => {

                this.showloader = true;

                if (mustBeDeactivateTestNumber == 0) {
                  this.saveDefinedTestGroup(this.definedTestGroupForm.value)
                    .subscribe(() => {

                      this.showloader = false;
                      this._router.navigate(['/Test/Group/Assignment/' + this.machineGroupId, this.GroupTitle]);
                    }, error => console.error(error));
                }
                else {

                  this.showloader = false;
                  $('#modal-default').modal('show');
                  this.ReplaceTestConfirmMessage = this.translate.instant('InterferenceTestDateRangeConfirmMessage');
                }
              });
          }
          else {

            this.showloader = false;
            $('#modal-default').modal('show');
            this.ReplaceTestConfirmMessage = this.translate.instant('InterferenceGroupTestDateRangeConfirmMessage');
          }
        }, error => console.error(error));
    }
    else if (this.formTitle === 'Edit') {

      this.updateDefinedTestGroup(this.definedTestGroupForm.value)
        .subscribe(() => {

          this.showloader = false;
          this._router.navigate(['/Test/Group/Assignment/' + this.machineGroupId, this.GroupTitle]);
        }, error => console.error(error));
    }
  }
  AcceptConfirm_Old() {

    //فراخانی متد غیرفعال سازی تست های انفرادی و ذخیره تست گروهی
    this.DeactivateTestForMachineAndDefinedTestMachineGroup(this.definedTestGroupForm.value)
      .subscribe(() => {

        $('#modal-default').modal('hide');
        this.showloader = true;
        this._router.navigate(['/Test/Group/Assignment/' + this.machineGroupId, this.GroupTitle]);
      });

  }


  save(reblace: boolean) {

    // ToDo :: Mostafa :: edit data validation

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
      .subscribe((result) => {

        this.showloader = false;

        if (result["succeed"] == true)
          if (result["result"] == true) {
            $('#modal-default').modal('hide');
            this._router.navigate(['/Test/Group/Assignment/' + this.machineGroupId, this.GroupTitle]);
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
  saveDefinedTestGroupNia(definedTestMachine: DefinedTestGroup, reblace: boolean) {
    if (!reblace)
      return this._http.post('api/DefinedTestMachineGroup/CreateNia', definedTestMachine);
    else
      return this._http.post('api/DefinedTestMachineGroup/CreateAndDeactiveNia', definedTestMachine);
  }
}
