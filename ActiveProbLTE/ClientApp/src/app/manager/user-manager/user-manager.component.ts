import { Component, OnInit, ViewChild } from '@angular/core';

import { ManagerService } from './../../Shared/services/manager.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IUser } from '../../Shared/interfaces/IUser';

@Component({
  selector: 'app-usermanager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css'],
  providers: [ManagerService]
})
export class UserManagerComponent implements OnInit {
  displayedColumns: string[] = ['index', 'FirstName', 'LastName',  'IsActive','actions'];
  public filter = '';
  users: any[];
  showloader: boolean = false;
  dataSource: MatTableDataSource<IUser>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort1', { static: true }) sort1: MatSort;

  constructor(private _manager: ManagerService) {
    this.getUsers();
  }
  getUsers() {
    this.showloader = true;
    this._manager.getUsers().subscribe(data => {
      //this.users = <any>data;
      this.dataSource = new MatTableDataSource(<any>data["users"]);
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

}
