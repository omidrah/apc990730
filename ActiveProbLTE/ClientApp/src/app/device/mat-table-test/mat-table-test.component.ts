import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs/internal/Observable';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


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
  version: string;
  status: boolean;
  testStatus: boolean;
  deletable: boolean;
}

@Component({
  selector: 'app-mat-table-test',
  templateUrl: './mat-table-test.component.html',
  styleUrls: ['./mat-table-test.component.css']
})
export class MatTableTestComponent implements OnInit {

 
  displayedColumns: string[] = ['index', 'name', 'identifier', 'machineTypeTitle', 'machineGroupTitle', 'Location', 'imeI1', 'imeI2', 'version', 'status', 'testStatus','actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selectedIMEI1: string;
  public filter: string = '';
  selectedmachineName: string;
  selectedId: number;
  selectedName: string;
  selectedRow: number;
  public machineList: any;
  observable: Observable<number>;
  latestValue: number;

  constructor(
    private _http: HttpClient,
    private router: Router,
    private toastrService: ToastrService) { }
  ngOnInit() {
    this.getMachines();

  }

  getMachines() {
    this._http.get('api/Machine/Index').subscribe((data) => {
     
      this.dataSource = new MatTableDataSource(<any>data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    );
  }
  delete(id) {
    const ans = confirm('آیا حذف این دستگاه مطمئن هستید؟');
    if (ans) {
      this._http.delete('api/machine/Delete/' + id).pipe(map(response => {
        if (response == 2) {
          this.toastrService.error('برای این دستگاه تست اختصاص داده است! امکان حذف وجود ندارد', 'خطا');
        } return response;
      })).subscribe(() => {
        this.getMachines();
      },
        error => console.log(error));
    }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
}


