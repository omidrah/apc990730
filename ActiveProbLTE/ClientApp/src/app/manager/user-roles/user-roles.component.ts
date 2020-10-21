import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../Shared/services/manager.service';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css'],
  providers: [ManagerService]
})
export class UserRolesComponent implements OnInit {
  id: number;
  checkedArray: FormArray;
  asignRoleForm: FormGroup;
  constructor(private _fb: FormBuilder, private _router: Router,
    private _avRouted: ActivatedRoute, private _manager: ManagerService) {
    if (this._avRouted.snapshot.params['id']) {
      this.id = this._avRouted.snapshot.params['id'];
    }
    this.asignRoleForm = this._fb.group({
      rls:new  FormArray([])
    });

    this._manager.GetRoleAsignToUser(this.id).subscribe(
      res => {        
        res["roles"].forEach((value, index) => {
          this.checkedArray = new FormArray([]);
          this.rlsFormArray.push(new
            FormControl({
              'id': value['id'],
              'title': value['name'],
              'selected': value['selected']
            }));
          if (value['selected'] == true) {
            this.checkedArray.push(new
              FormControl({
                'id': value['id'],
                'title': value['name'],
                'selected': value['selected']
              }));          }
        });
        return res;
      })  
  }
  ngOnInit() { }

  get rlsFormArray() {
    return this.asignRoleForm.controls.rls as FormArray;
  }
  onCheckboxChange(e) {
    if (e.target.checked) {
      this.checkedArray.push(new FormControl(e.target.value));
    }
    else {
      let i: number = 0;
      this.checkedArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.checkedArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  cancel() {
    this._router.navigate(['manager']);
  }
  submit() {
    var dd: number[] = [];
    this.checkedArray.controls.forEach((key, value) => {      
      dd.push(key.value);
    });
    this._manager.UpdateUserRole(+this.id, dd).subscribe(data => {
      alert(data["msg"]);
      this._router.navigate(['manager']);
    });;
  }
}
