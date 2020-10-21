import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../Shared/services/manager.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css'],
  providers: [ManagerService]
})
export class UsereditComponent implements OnInit {
  usrForm: FormGroup;
  formTitle = "Create";
  breadcroumb = "CreateRole";
  id: number;

  constructor(private _fb: FormBuilder,
    private _avRoute: ActivatedRoute, private _router: Router,
    private _manager: ManagerService) {
    if (this._avRoute.snapshot.params["id"]) {
      this.id = this._avRoute.snapshot.params["id"];
    }
    this.usrForm =  this._fb.group({
      id: 0,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['info@info.ir', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
 
  ngOnInit() {
    if (this.id > 0) {
      this.formTitle = 'Edit';
      this.breadcroumb = 'EditUser';
      this._manager.getUserById(this.id).subscribe(res => {
        this.usrForm.get('firstName').setValue(res['firstName']);
        this.usrForm.get('lastName').setValue(res['lastName']);
        this.usrForm.get('userName').setValue(res['userName']);
        this.usrForm.get('email').setValue(res['email']);
        //password donot show in Edit mode... 
        this.usrForm.get('password').setValue('noChange');
        this.usrForm.get('confirmPassword').setValue('noChange');
      },
        err => { console.log(err) });
    }
  }
  Save() {
    if (!this.usrForm.valid) {
      return;
    }
    if (this.formTitle === 'Create') {
     
      this._manager.AddUser(this.usrForm.value).subscribe(data => {        
        alert("کاربر جدید ایجاد گردید");
      });
    }
    else if (this.formTitle == 'Edit') {     
      this.usrForm.get('id').setValue(this.id); //set id 
      this._manager.UpdateUser(this.usrForm.value).subscribe(data => {
        alert("کاربر مورد نظر ویرایش گردید");
        this._router.navigate(['manager']);
      })
      
    }
  }
  cancel() {
    this._router.navigate(['manager']);
  }
}
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
