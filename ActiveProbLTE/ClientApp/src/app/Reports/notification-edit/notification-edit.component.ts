import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Message } from '../../Shared/models/message';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notification-edit',
  templateUrl: './notification-edit.component.html',
  styleUrls: ['./notification-edit.component.css']
})
export class NotificationEditComponent implements OnInit {

  selectedId: number;
  Machineid: number;
  MachineName: string;
  formTitle = 'Create';
  breadcroumb = 'CreateNotification';

  notificationForm: FormGroup;
  parameters: FormArray;
  filters: FormArray;

  zoneList: any;
  selectedZone: Number;

  showloader = false;

  constructor(
    private _http: HttpClient,
    private _avRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _router: Router,
    private toastrService: ToastrService,
    private translate: TranslateService
  ) {

    this.selectedId = +this._avRoute.snapshot.params['id'];

    this.notificationForm = this._fb.group({
      id: 0,
      name: ['', [Validators.required]],
      Activation: true,
      title: ['', [Validators.required]],
      messageContent: ['', [Validators.required]],
      notifOn: [-1, [Validators.required, Validators.min(0), Validators.max(2)]],
      sendStartTime: [, [Validators.required]],
      sendEndTime: [, [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]],

      maxSend: [, [Validators.required, Validators.min(0)]],
      timeIntervalToNextSend: [, [Validators.required, Validators.min(0)]],

      parameters: this._fb.array([this.createParameter()]),

      //operator: ['', [Validators.required]],
      //network: ['', [Validators.required]],
      //device: ['', [Validators.required]],
      //group: ['', [Validators.required]],
      //parameter: ['', [Validators.required]],
      //function: ['', [Validators.required]],
      //searchStartDate: [, [Validators.required]],
      //searchEndDate: [, [Validators.required]],

      //mathematicalSymbol: [, [Validators.required]],
      //conditionalValue: [, [Validators.required]],

    });

    //this.getMessage(this.machinId);

    if (this.selectedId > 0) {
      this.formTitle = 'Edit';
      this.breadcroumb = 'EditNotification';

      this.getMessageById(this.selectedId);
    }

    this.getZones().subscribe(
      (data) => {
        this.zoneList = data;
        this.selectedZone = +this.zoneList[0].zoneId;
      }
    );

  }

  ngOnInit() {
  }

  createParameter(): FormGroup {
    return this._fb.group({
      operator: ['', [Validators.required]],
      network: ['', [Validators.required]],
      device: ['', [Validators.required]],
      group: ['', [Validators.required]],
      zone: [0],
      parameter: ['', [Validators.required]],
      function: ['', [Validators.required]],
      searchStartDate: [, [Validators.required]],
      searchEndDate: [, [Validators.required]],

      parameterLogicalSymbol: [, [Validators.required]],

      filters: this._fb.array([this.createFilter()]),
    });
  }

  createFilter(): FormGroup {
    return this._fb.group({

      mathematicalSymbol: [, [Validators.required]],
      conditionalValue: [, [Validators.required]],
      filterlogicalSymbol: [, [Validators.required]],
    });
  }

  addParameter(): void {
    this.parameters = this.notificationForm.get('parameters') as FormArray;
    this.parameters.push(this.createParameter());
  }

  addFilter(parameters): void {
    this.filters = parameters.get('filters') as FormArray;
    this.filters.push(this.createFilter());
  }

  removeParameter(item): void {
    this.parameters.removeAt(item);
  }

  removeFilter(parameters, item): void {
    this.filters = parameters.get('filters') as FormArray;
    this.filters.removeAt(item);
  }

  save() {
    if (!this.notificationForm.valid) {
      return;
    }

    this.notificationForm.controls['Machineid'].setValue(this.Machineid);
    this.notificationForm.controls['Modem'].setValue(+this.notificationForm.controls['Modem'].value);
    this.notificationForm.controls['Sim'].setValue(+this.notificationForm.controls['Sim'].value);

    this.showloader = true;


    //var message = new Message()

    if (this.formTitle === 'Create')
      this.createMachineMessage(this.notificationForm.value);

    else if (this.formTitle === 'Edit')
      this.editMachineMessage(this.notificationForm.value);

  }
  cancel() {
    this._router.navigate(['/export/Notification']);
  }

  createMachineMessage(message: Message) {

    if (message.Modem == 0)
      message.Sim = 1;

    return this._http.post('api/Message/Create', message)
      .subscribe(response => {
        this.showloader = false;
        if (response > 0) {
          this._router.navigate(['/export/Notification', this.Machineid, this.MachineName]);
        }
        else
          this.toastrService.error(this.translate.instant('DatabaseActionError'), this.translate.instant('Error'));
      });
  }

  editMachineMessage(message: Message) {

    if (message.Modem == 0)
      message.Sim = 1;

    return this._http.put('api/Message/Edit', message)
      .subscribe(result => {
        this.showloader = false;

        if (result["succeed"] == true)
          if (result["result"] == true) {
            this._router.navigate(['/export/Notification', this.Machineid, this.MachineName]);
          }
          else
            this.toastrService.warning(this.translate.instant(result["message"]), this.translate.instant('Warning'));
        else
          this.toastrService.error(this.translate.instant('DatabaseActionError'), this.translate.instant('Error'));
      });
  }

  getMessageById(id: number) {

    this.showloader = true;
    this._http.get('api/Message/GetMessageById/' + id).subscribe((data) => {

      this.showloader = false;
      if (data != null) {
        this.notificationForm.get('id').setValue(data['id']);
        this.notificationForm.get('Machineid').setValue(data['machineid']);
        this.notificationForm.get('Modem').setValue(data['modem']);
        this.notificationForm.get('Sim').setValue(data['sim']);
        this.notificationForm.get('Body').setValue(data['body']);

        this.onSelectionChanged(data['modem'].toString());
      }
      else {
        // Todo :: Mostafa :: if id is incorrect or status is not equal to 0 Show correct message to user
        this.toastrService.error(this.translate.instant('DatabaseActionError'), this.translate.instant('Error'));
        this._router.navigate(['/export/Notification', this.Machineid, this.MachineName]);
      }
    });

  }
  // convenience getter for easy access to form fields
  get f() { return this.notificationForm.controls; }

  getZones() {
    return this._http.get('api/GeoLocation/GetZones/')
      .pipe(map(
        response => {
          return response;
        }));
  }

  onSelectionChanged(value) {
    if (value === '0') {
      this.notificationForm.get('Sim').setValue(1);
      this.notificationForm.get('Sim').disable();
    } else {
      this.notificationForm.get('Sim').enable();
      this.notificationForm.get('Sim').setValue(0);
    }
  }

}
