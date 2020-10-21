import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';

import { ToastrService } from 'ngx-toastr';

import { IRole } from './../../Shared/interfaces/IRole';
import { LanguageService } from './../../Shared/services/Language.service';
import { ManagerService } from './../../Shared/services/manager.service';

@Component({
  selector: 'app-rolemanager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.css'],
  providers: [ManagerService]
})

export class RoleManagerComponent implements OnInit {
    displayedColumns: string[] = ['index', 'name', 'description', 'UserCount',  'actions'];
    dataSource: MatTableDataSource<IRole>;
    public filter = '';
    public showloader = false;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sortAll: MatSort;
    @ViewChild('sort1', { static: true }) sort1: MatSort;
    @ViewChild('sort2', { static: true }) sort2: MatSort;

  constructor( private _manager: ManagerService,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private langService: LanguageService) {
      this.getRoles();

     }
  getRoles() {
    this.showloader = true;
      this._manager.getRole().subscribe(data => {
         this.dataSource = new MatTableDataSource(<any>data);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort1;
         this.showloader = false;
      });
  }

  ngOnInit() {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  doDelete(elem:IRole) {
    this.showloader = true;
    this._manager.DeleteRole(elem.id).subscribe(x => {
      alert(elem);
      this.showloader = false;
      this.getRoles();  
    }, err => { console.log(err)});
  }
}
