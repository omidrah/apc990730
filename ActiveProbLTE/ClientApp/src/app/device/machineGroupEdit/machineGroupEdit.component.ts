import { Component, OnInit, Injectable, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MachineGroupAssignment } from '../../Shared/models/machineGroupAssignment';

export interface UserData {
  id: number;
  name: string;
  identifier: string;
  machineTypeTitle: string;
  machineGroupTitle: string;
  latitude: number;
  longitude: number;
  imeI1: string;
  imeI2: string;
  iccid: string;
  version: string;
}


@Component({
  selector: 'app-edit-machine-group',
  templateUrl: './machineGroupEdit.component.html',
  styleUrls: ['./machineGroupEdit.component.css']
})
export class MachineGroupEditComponent implements OnInit {

  displayedColumns: string[] = ['select', 'index', 'name', 'identifier', 'machineTypeTitle', 'machineGroupTitle', 'Location', 'imeI1', 'imeI2', 'version'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selection = new SelectionModel<UserData>(true, []);


  FormTitle = 'Edit';
  filter: string = '';
  id: number;
  groupTitle: string;
  errorMessage: any;
  myAppUrl = '';
  machineList: any;
  machineCheckList: any[] = [];
  constructor(private _http: HttpClient, private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _router: Router, @Inject('BASE_URL') baseUrl: string) {
    if (this._avRoute.snapshot.params['id']) {
      this.id = this._avRoute.snapshot.params['id'];
      this.groupTitle = this._avRoute.snapshot.params['Title'];
    }
    this.myAppUrl = baseUrl;
    this.getMachines(this.id);
  }
  getMachines(id: number) {
    //console.log("groupId ==> "+id);
    this._http.get(this.myAppUrl + 'api/Machine/IndexWithMachineGroup/' + id).pipe(map(
      response => {
        return response;
      }
    )).subscribe(
      (data) => {
        this.machineList = data;

        this.dataSource = new MatTableDataSource(<any>data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.machineList.forEach(item => {
          if (item['groupChecked']) {
            this.machineCheckList.push(item['id']);
          }
        });
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() { }
  save() {
    //this.updateMachineGroup(this.id, this.machineCheckList)
    this.updateMachineGroupNia(+this.id, this.machineCheckList)
      .subscribe(() => {
        this._router.navigate(['machine/Group']);
      }, error => console.error(error));
  }
  cancel() {
    this._router.navigate(['machine/Group']);
  }
  checkValue(id: number, isChecked: boolean) {
    if (isChecked) {
      this.machineCheckList.push(id)
    }
    else {
      console.log(this.machineCheckList);
      this.machineCheckList.splice(this.machineCheckList.indexOf(id),1);
      console.log(this.machineCheckList);
    }
  }
  getMachineGroupById(id: number) {
    return this._http.get(this.myAppUrl + 'api/MachineGroup/Details/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }
  updateMachineGroup(machingeGroupId: number, list: any[]) {
    list.push(machingeGroupId);
    return this._http.put(this.myAppUrl + 'api/Machine/GroupEdit', list)
      .pipe(map(
        response => {
          return response;
        }));
  }

 updateMachineGroupNia(machingeGroupId: number, list: any[]) {
    
   var mga = new MachineGroupAssignment();
   mga.MachineGroupId = machingeGroupId;
   mga.MachineIds = list;   
   return this._http.put(this.myAppUrl + 'api/Machine/GroupEditNia', mga)
      .pipe(map(
        response => {
          return response;
        }));
  }


  /** The label for the checkbox on the passed row */
  checkboxLabel(row: UserData) {
    
    //return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
