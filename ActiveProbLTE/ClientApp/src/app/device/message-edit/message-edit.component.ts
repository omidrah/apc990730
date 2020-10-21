import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from '../../Shared/models/message';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  selectedId: number;
  Machineid: number;
  MachineName: string;
  formTitle = 'Create';
  breadcroumb = 'CreateMessage';

  machineMessageForm: FormGroup;
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
    this.Machineid = +this._avRoute.snapshot.params['machinId'];
    this.MachineName = this._avRoute.snapshot.params['machineName'];

    this.machineMessageForm = this._fb.group({
      id: 0,
      Machineid: 0,
      Modem: [1, [Validators.required, Validators.min(0), Validators.max(1)]],
      Sim: [0, [Validators.required, Validators.min(1)]],
      Body: ['', [Validators.required]]
    });

    //this.getMessage(this.machinId);

    if (this.selectedId > 0) {
      this.formTitle = 'Edit';
      this.breadcroumb = 'EditMessage';

      this.getMessageById(this.selectedId);
    }



  }

  ngOnInit() {
  }

  save() {
    if (!this.machineMessageForm.valid) {
      return;
    }

    this.machineMessageForm.controls['Machineid'].setValue(this.Machineid);
    this.machineMessageForm.controls['Modem'].setValue(+this.machineMessageForm.controls['Modem'].value);
    this.machineMessageForm.controls['Sim'].setValue(+this.machineMessageForm.controls['Sim'].value);

    this.showloader = true;


    //var message = new Message()

    if (this.formTitle === 'Create')
      this.createMachineMessage(this.machineMessageForm.value);

    else if (this.formTitle === 'Edit')
      this.editMachineMessage(this.machineMessageForm.value);

  }
  cancel() {
    this._router.navigate(['/machine/Message/', this.Machineid, this.MachineName]);
  }

  createMachineMessage(message: Message) {

    if (message.Modem == 0)
      message.Sim = 1;

    return this._http.post('api/Message/Create', message)
      .subscribe(response => {
        this.showloader = false;
        if (response > 0) {
          this._router.navigate(['/machine/Message/', this.Machineid, this.MachineName]);
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
            this._router.navigate(['/machine/Message/', this.Machineid, this.MachineName]);
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
        this.machineMessageForm.get('id').setValue(data['id']);
        this.machineMessageForm.get('Machineid').setValue(data['machineid']);
        this.machineMessageForm.get('Modem').setValue(data['modem']);
        this.machineMessageForm.get('Sim').setValue(data['sim']);
        this.machineMessageForm.get('Body').setValue(data['body']);

        this.onSelectionChanged(data['modem'].toString());
      }
      else {
        // Todo :: Mostafa :: if id is incorrect or status is not equal to 0 Show correct message to user
        this.toastrService.error(this.translate.instant('DatabaseActionError'), this.translate.instant('Error'));
        this._router.navigate(['/machine/Message/', this.Machineid, this.MachineName]);
      }
    });

  }
  // convenience getter for easy access to form fields
  get f() { return this.machineMessageForm.controls; }



  onSelectionChanged(value) {
    if (value === '0') {
      this.machineMessageForm.get('Sim').setValue(1);
      this.machineMessageForm.get('Sim').disable();
    } else {
      this.machineMessageForm.get('Sim').enable();
      this.machineMessageForm.get('Sim').setValue(0);
    }
  }
}
