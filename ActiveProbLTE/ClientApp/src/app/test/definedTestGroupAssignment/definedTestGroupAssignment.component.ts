import { Sort, MatSort } from '@angular/material/sort';
import { PaginationInstance } from 'ngx-pagination';
import { Component, Inject, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LanguageService } from '../../Shared/services/Language.service';

export interface UserData {
  id: number;
  definedTestTitle: string;
  testTypeTitle: string;
  beginDate: string;
  endDate: string;
  status: boolean;
}


@Component({
    selector: 'app-defined-test-group-assignment',
    templateUrl: './definedTestGroupAssignment.component.html',
    styleUrls: ['./definedTestGroupAssignment.component.css']
})
export class DefinedTestGroupAssignmentComponent {

  displayedColumns: string[] = ['index', 'definedTestTitle', 'testTypeTitle', 'beginDate', 'endDate'/*, 'status'*/, 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

    FormTitle = 'Edit';
    filter:string='';
    groupId: number;
    groupTitle:string;
    errorMessage: any;
    myAppUrl = '';
    definedTestMachineGroupList: any;
    selectedRow: number;    
    selectedId: number;
    canEdit:boolean=true;
   
  constructor(
    private _http: HttpClient,
    private _avRoute: ActivatedRoute,
    private langService: LanguageService,
    @Inject('BASE_URL') baseUrl: string
  ) {
       
        if (this._avRoute.snapshot.params['id']) {
            this.groupId = this._avRoute.snapshot.params['id'];
            this.groupTitle = this._avRoute.snapshot.params['Title'];
        }
        this.myAppUrl = baseUrl;
        this.getDefinedTests(this.groupId);
    }
  
    getDefinedTests(id:number){
        this._http.get(this.myAppUrl + 'api/MachineGroup/IndexWithDefinedTest/'+id).pipe(map(
            response => {
                return response;
            }
        )).subscribe(
            (data) => {
            this.definedTestMachineGroupList = data;

            this.dataSource = new MatTableDataSource(<any>data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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

}
