import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRole } from '../../Shared/interfaces/IRole';
import { ManagerService } from '../../Shared/services/manager.service';
@Component({
  selector: 'app-roleedit',
  templateUrl: './roleedit.component.html',
  styleUrls: ['./roleedit.component.css'],
  providers: [ManagerService]
})
export class RoleeditComponent implements OnInit {
  roleForm: FormGroup;
  formTitle = "Create";
  breadcroumb = "CreateRole"
  id: number;
  constructor(private _fb: FormBuilder,
    private _avRoute: ActivatedRoute,
    private _router: Router,
    private _manager: ManagerService) {
    if (this._avRoute.snapshot.params['id']) {
      this.id = this._avRoute.snapshot.params['id'];
    }
    this.roleForm = this._fb.group({
      id: 0,
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  ngOnInit() {
    if (this.id > 0) {
      this.formTitle = 'Edit';
      this.breadcroumb = 'EditRole';
      this._manager.getRoleById(this.id).subscribe(res => {
        this.roleForm.get('name').setValue(res['name']);
        this.roleForm.get('description').setValue(res['description']);
      },
        err => { console.log(err) });
    }
  }
  Save() {
    if (!this.roleForm.valid) {
      return;
    }
    if (this.formTitle === 'Create') {
      this._manager.AddRole(this.roleForm.value).subscribe(data => { alert("نقش مورد نظر ایجاد گردید"); });      
    }
    else if (this.formTitle == 'Edit') {
      this.roleForm.get('id').setValue(this.id); //set id 
      this._manager.UpdateRole(this.roleForm.value).subscribe(data => { alert("نقش مورد نظر ویرایش گردید");})
    }
  }
  
  cancel() {
    this._router.navigate(['manager', 'Roles']);
  }
}
