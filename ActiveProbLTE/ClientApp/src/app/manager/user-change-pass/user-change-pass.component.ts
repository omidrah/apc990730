import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../Shared/services/manager.service';

@Component({
  selector: 'app-user-change-pass',
  templateUrl: './user-change-pass.component.html',
  styleUrls: ['./user-change-pass.component.css'],
  providers: [ManagerService]
})
export class UserChangePassComponent implements OnInit {
  formTitle = "Change Password";
  passChangeForm: FormGroup;
  id: number;
  constructor(private _fb: FormBuilder,private _router: Router,
    private _avRouted: ActivatedRoute, private _manager: ManagerService) {
    if (this._avRouted.snapshot.params['id']) {
      this.id = this._avRouted.snapshot.params['id'];
    }
    this.passChangeForm = this._fb.group({
      id:0,
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  Save() {
    if (!this.passChangeForm.valid) {
      return;
    }
    this.passChangeForm.get('id').setValue(this.id);
    this._manager.UpdatePassword(this.passChangeForm.value).subscribe(res => {
      alert(res["msg"]);
      this._router.navigate(['manager']);
      },
      err => { console.log(err) })
  }
  cancel() {
    this._router.navigate(['manager']);
  }
}
