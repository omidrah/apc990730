import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaginationInstance } from 'ngx-pagination/dist/pagination-instance';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

// only used for modal
declare var $: any;

export interface UserData {
  id: number;
  title: string;
  layer3Messages: boolean;
  repeatTime: string;
  repeatCount: number;
  measurementInterval: number;
  testTypeTitle: number;
  networkTitle: string;
  bandTitle: string;
  saveLogFile: boolean;
  editable: boolean;
}


@Component({
  selector: 'app-definedTest',
  templateUrl: './definedTest.component.html',
  styleUrls: ['./definedTest.component.css']
})
export class DefinedTestComponent {

  public showloader: boolean = false;

  displayedColumns: string[] = ['index', 'title', 'layer3Messages', 'repeatTime', 'repeatCount', 'measurementInterval', 'testTypeTitle', 'networkTitle', 'bandTitle', 'saveLogFile', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selectedRow: number;
  public filter: string = '';


  selectedId: number;
  selectedIdCanEdit: any;
  title: string;
  constructor(
    private _http: HttpClient,
    private toastrService: ToastrService,
    private translate: TranslateService
  ) {
    this.getDefinedTests();

  }
  getDefinedTests() {
    this.showloader = true;
    this._http.get('api/DefinedTest/Index').pipe(map(
      response => {
        return response;
      }
    )).subscribe(
      data => {

        this.dataSource = new MatTableDataSource(<any>data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showloader = false;
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

  deleteTest(id, title) {

    this.selectedId = id;
    this.title = title;
  }

  doDelete() {
    this.showloader = true;
    this._http.delete('api/DefinedTest/Delete/' + this.selectedId).pipe(map(response => {
      this.showloader = false;
      if (response == 2) {
        this.toastrService.error(this.translate.instant('CannotDeleteAssignedTest'), this.translate.instant('Error'));
      } return response;
    })).subscribe(() => {

      this.getDefinedTests();
      $('#modal-default').modal('hide');
    }, error => console.error(error));
  }
}
