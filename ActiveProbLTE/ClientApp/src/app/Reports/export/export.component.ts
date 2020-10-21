import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Export } from '../../Shared/models/export';
import { NgbCalendar, NgbDatepickerI18n, NgbCalendarPersian, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18nPersian } from '../../Shared/services/NgbDatepickerI18nPersian';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';
import { Configurations } from '../../Shared/models/Configurations';
import { ConfigService } from '../../Shared/services/config.service';
import { TranslateService } from '@ngx-translate/core';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian }
  ]
})
export class ExportComponent implements OnInit {

  public showloader: boolean = false;

  exportForm: FormGroup;
  formTitle = 'Create';
  errorMessage: any;
  myAppUrl = '';
  definedTestList: any;
  zoneList: any;
  selectedZone: Number;
  machineList: any;
  selectedFirstMachine: Number;
  paramKMlExport: { id: number, title: string }[] =
    [
      { id: 0, title: 'Route plot' },
      { id: 1, title: 'RXLevel' },
      { id: 2, title: 'RSCP' },
      { id: 3, title: 'RSRP' },
      { id: 4, title: 'RXQual' },
      { id: 5, title: 'ECIO' },
      { id: 6, title: 'RSRQ' },
      { id: 7, title: 'MNC' }
    ];
  endDate: Date;
  beginDate: Date;
  beginDateTime: Time;
  endDateTime: Time;
  //defaultDate: Date;
  //defaultTime: Time;
  FileSaver = require('file-saver');

  config: Configurations;

  constructor(private _http: HttpClient,
    private _fb: FormBuilder,
    private _avRoute: ActivatedRoute,
    private _router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private calendar: NgbCalendar,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private _config: ConfigService) {

    this.getDefinedTestList().subscribe(
      (data) => {
        this.definedTestList = data
      }
    );
    this.getMachineList().subscribe(
      (data) => {
        this.machineList = data
        this.selectedFirstMachine = +this.machineList[0].id;
        //console.log(this.machineList)
      }
    );
    this.getZones().subscribe(
      (data) => {
        this.zoneList = data;
        this.selectedZone = +this.zoneList[0].zoneId;
      }
    );
    this.exportForm = this._fb.group({
      definedTestId: [0],
      zone: [0], //select first element default--omid added 981120
      isActive: [true, [Validators.required]],
      ParamKml: ['Route plot'],
      machineId: [0], //select first element default--omid added 981120
      beginDate: [, Validators.required],
      endDate: [, Validators.required],
      sim: [0, Validators.min(0)],
      beginDateTime: [/*this.defaultTime*/, Validators.required],
      endDateTime: [/*this.defaultTime*/, Validators.required]
    })

    //var defaultDate = new Date();
    //var defaultTime = defaultDate.getHours() + ":" + defaultDate.getMinutes();
    this.exportForm.controls['beginDateTime'].setValue("00:00");
    this.exportForm.controls['endDateTime'].setValue("00:00");
    //---------------------------------------------------------------------------------

    this._config.currentConfigurations.subscribe(t => {
      this.config = t;
    });
  }

  ngOnInit() {
    // this.exportForm.controls['machineId'].setValue(this.selectedFirstMachine,{onlySelf: true}); ////select first element default--omid added 981120
  }
  genKml() {
    
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
    this.GenKml(this.exportForm.value).subscribe(data => {

      saveAs(data, "/Map.Kml");
      this.showloader = false;
    });
  }
  save() {

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
      .subscribe(data => {

        saveAs(data, "/Report.xlsx");
        this.showloader = false;
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

  }

  getDefinedTestList() {
    return this._http.get(this.myAppUrl + 'api/DefinedTest/index/')
      .pipe(map(
        response => {
          return response;
        }));
  }
  getMachineList() {
    return this._http.get(this.myAppUrl + 'api/Machine/index/')
      .pipe(map(
        response => {
          return response;
        }));
  }
  getZones() {
    return this._http.get(this.myAppUrl + 'api/GeoLocation/GetZones/')
      .pipe(map(
        response => {
          return response;
        }));
  }
  getDefaultDateTime() {
    return this._http.get(this.myAppUrl + 'api/export/DefaultDateTime/')
      .pipe(map(
        response => {
          return response;
        }));
  }
  submit(expo: Export): Observable<any> {
    return this._http.post(this.myAppUrl + 'api/export/submit', expo, {
      responseType: "blob"
    })
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
  }
  GenKml(expo: Export): Observable<any> {

    return this._http.post(this.myAppUrl + 'api/export/GenKml', expo, {
      responseType: "blob"
    })
  }
  get definedTestId() { return this.exportForm.get('definedTestId'); }
  get sim() { return this.exportForm.get('sim'); }
  get machineId() { return this.exportForm.get('machineId'); }
  get zone() { return this.exportForm.get('zone'); }
}
