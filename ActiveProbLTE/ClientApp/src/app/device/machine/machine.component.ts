import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { TranslateService } from '@ngx-translate/core';

import { map } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs/internal/Observable';

import { Configurations } from '../../Shared/models/Configurations';
import { LanguageService } from '../../Shared/services/Language.service';
import { ConfigService } from '../../Shared/services/config.service';

// only used for modal
declare var $: any;

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
  status: boolean;
  testStatus: boolean;
  deletable: boolean;
}

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  public showloader: boolean = false;

  displayedColumns: string[] = ['index', 'name', 'identifier', 'machineTypeTitle', 'machineGroupTitle', 'Location', 'imeI1', 'imeI2', 'version', 'status', 'testStatus', 'actions'];

  displayedModemColumns: string[] = ['index', 'name', 'identifier', 'machineTypeTitle', 'machineGroupTitle', 'Location', 'imeI1', 'iccid', 'version', 'status', 'lastConnectionTime', 'actions'];



  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortAll: MatSort;

  @ViewChild('sort1', { static: true }) sort1: MatSort;

  @ViewChild('sort2', { static: true }) sort2: MatSort;

  modemDataSource: MatTableDataSource<UserData>;

  selectedIMEI1: string;
  public filter: string = '';
  selectedmachineName: string;
  selectedId: number;
  selectedName: string;
  selectedRow: number;
  public machineList: any;
  observable: Observable<number>;
  latestValue: number;

  config: Configurations;

  constructor(
    private _http: HttpClient,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private langService: LanguageService,
    private _config: ConfigService) {

    this._config.currentConfigurations.subscribe(t => {
      this.config = t;
    });
    this.getMachines();

  }
  ngOnInit() {
  }

  getMachines() {
    this.showloader = true;
    this._http.get('api/Machine/Index').subscribe((data) => {

      this.dataSource = new MatTableDataSource(<any>data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort1;

      this.modemDataSource = new MatTableDataSource(<any>data);
      this.modemDataSource.paginator = this.paginator;
      this.modemDataSource.sort = this.sort2;

      this.showloader = false;
    }
    );
  }

  deleteConfirm(id) {
    this.selectedId = id;
  }
  doDelete() {

    this.showloader = true;
    this._http.delete('api/machine/Delete/' + this.selectedId).pipe(map(response => {
      this.showloader = false;
      if (response == 2) {
        this.toastrService.error(this.translate.instant('DatabaseActionError'), this.translate.instant('Error'));
      } return response;
    })).subscribe(() => {
      this.getMachines();
      $('#modal-default').modal('hide');
    },
      error => console.log(error));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }


    this.modemDataSource.filter = filterValue.trim().toLowerCase();

    if (this.modemDataSource.paginator) {
      this.modemDataSource.paginator.firstPage();
    }
  }
}


