import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from 'src/app/Shared/services/manager.service';
import { map } from 'rxjs/internal/operators/map';
import { element } from 'protractor';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-role-access',
  templateUrl: './role-access.component.html',
  styleUrls: ['./role-access.component.css'],
  providers: [ManagerService]
})
export class RoleAccessComponent implements OnInit {

  AccessForm: FormGroup;
  checkedArray: FormArray = new FormArray([]);
  access;
  controllers = [];
  selectedRoleId: number;
  selectedRoleName: '';
  constructor(
    private _avRoute: ActivatedRoute,
    private _manager: ManagerService,
    private _router: Router,
    private _fb: FormBuilder) {
    if (this._avRoute.snapshot.params['id']) {
      this.selectedRoleId = this._avRoute.snapshot.params['id'];
    }
    this.AccessForm = this._fb.group({
      acts: new FormArray([])
    });
    this.DynamicCtrl();

  }
  ngOnInit() {
  }
  private DynamicCtrl() {
    this._manager.getAccess(this.selectedRoleId).pipe(
      map(data => {
        for (let k in data["securedControllerActions"]) {
          let curActions = data["securedControllerActions"][k]["mvcActions"];
          let act = [];
          for (let j in curActions) {
            if (curActions[j]["actionDisplayName"] != null && curActions[j]["actionDisplayName"] != "") {
              var claims = data["roleIncludeRoleClaims"].claims;
              let iSselected = false;
              claims.forEach((tmp, key) => {
                if (tmp["claimType"] == "dynKkomAuthorizationClaimType" &&
                  tmp["claimValue"] == curActions[j]["actionId"])
                  iSselected = true;
              })             
              act.push({ actionName: curActions[j]["actionDisplayName"], actionId: curActions[j]["actionId"], selected: iSselected ? "Checked" : "" });
            }
          }
          var ctr = {
            disp: data["securedControllerActions"][k]["controllerDisplayName"],
            controllerId: data["securedControllerActions"][k]["controllerName"],
            actions: act
          };
          this.controllers.push(ctr);
        }
        return data;
      }))
      .subscribe(poco => {
        this.access = poco;
        //console.log(this.access);
        this.selectedRoleName = this.access.roleIncludeRoleClaims.name;
        this.addCheckboxes();
      });
  }

  submit() {
    var dd: string[] = [];
    this.checkedArray.controls.forEach((key, value) => {
      //alert(key.value);
      dd.push(key.value);
    });
    this._manager.updateRoleAccess(+this.selectedRoleId, dd).subscribe(data => {
      alert ("بروزرسانی گردید");
    });;
  }
  addCheckboxes() {
    this.controllers.forEach((item, ind) => {
      this.actsFormArray.push(new FormControl({ 'disp': item["disp"], 'controllerId': item["controllerId"], 'actions': item["actions"] }));
    })
  }

  get actsFormArray() {
    return this.AccessForm.controls.acts as FormArray;
  }
  onCheckboxChange(e) {
    if (e.target.checked) {
      this.checkedArray.push(new FormControl(e.target.value));
    } else {
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
    this._router.navigate(['manager','Roles']);
  }
}
