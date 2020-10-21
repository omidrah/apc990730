import { NgbCalendarPersian, NgbCalendar, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
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
  selector: 'app-defined-test-machine-assignment',
  templateUrl: './definedTestMachineAssignment.component.html',
  styleUrls: ['./definedTestMachineAssignment.component.css'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian }]
})
export class DefinedTestMachineAssignmentComponent implements OnInit {

  displayedColumns: string[] = ['index', 'definedTestTitle', 'testTypeTitle', 'beginDate', 'endDate','status', 'actions'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  FormTitle = 'Edit';
  machinId: number;
  errorMessage: any;
  myAppUrl = '';
  definedTestMachineList: any;
  selectedRow: number;
  selectedId: number;
  MachineTitle: string;
  currentDate: number;
  currentTime: number;
  constructor(private _http: HttpClient,
    private _avRoute: ActivatedRoute,
    private langService: LanguageService,
    @Inject('BASE_URL') baseUrl: string
  ) {
    if (this._avRoute.snapshot.params['id']) {
      this.machinId = this._avRoute.snapshot.params['id'];
      this.MachineTitle = this._avRoute.snapshot.params['Title'];
    }
    this.myAppUrl = baseUrl;
    this.getDefinedTests(this.machinId);
    var currentDate = new Date();
    var ngbCurrentDate: NgbDateStruct = { day: currentDate.getUTCDate(), month: currentDate.getUTCMonth() + 1, year: currentDate.getUTCFullYear() };
    var ngbCurrenTime: NgbTimeStruct = { hour: currentDate.getUTCHours(), minute: currentDate.getUTCMinutes(), second: currentDate.getUTCSeconds() };

    // this.currentDate = this.calendar.getToday().year+this.calendar.getToday().month+this.calendar.getToday().day+
    //                    currenTime.getHours()+ currenTime.getMinutes() + currenTime.getSeconds(); 
    this.currentDate = ngbCurrentDate.day + ngbCurrentDate.month + ngbCurrentDate.year;
    this.currentTime = ngbCurrenTime.hour + ngbCurrenTime.minute + ngbCurrenTime.second;

  }
  getDefinedTests(id: number) {
    this._http.get(this.myAppUrl + 'api/Machine/IndexWithDefinedTest/' + id).pipe(map(
      (response: any[]) => {
        response.forEach((element) => {
          var bdDate = (+element['beginDate'].slice(0, 4)) + (+element['beginDate'].slice(5, 7)) + (+element['beginDate'].slice(8, 10));
          var bdTime = (+element['beginDate'].slice(11, 13)) + (+element['beginDate'].slice(14, 16)) + (+element['beginDate'].slice(17, 19));
          var edDate = (+element['endDate'].slice(0, 4)) + (+element['endDate'].slice(5, 7)) + (+element['endDate'].slice(8, 10));
          var edTime = (+element['endDate'].slice(11, 13)) + (+element['endDate'].slice(14, 16)) + (+element['endDate'].slice(17, 19));

          var NotReceivedByDevice = "NotReceivedByDevice";
          var Waiting = "Waiting";
          var Running = "Running";
          var Finished = "Finished";

          if (element["status"] == false) {
            element["status"] = NotReceivedByDevice;
          }

          if (element["status"] == true && bdDate > this.currentDate) {
            element["status"] = Waiting;
          }
          if (element["status"] == true && bdDate == this.currentDate) {
            if (bdTime > this.currentTime) {
              element["status"] = Waiting;
            }
          }

          if (element["status"] == true) {
            if (bdDate < this.currentDate) {
              if (this.currentDate < edDate) {
                element["status"] = Running;
              }
            }
            else if (bdDate == this.currentDate) {
              if (bdTime < this.currentTime) {
                if (this.currentDate < edDate) {
                  element["status"] = Running;
                }
                else if (this.currentDate == edDate) {
                  if (this.currentTime < edTime) {
                    element["status"] = Running;
                  }
                }
              }
            }
          }
          if (element["status"] == true && (this.currentDate > edDate)) {
            element["status"] = Finished;
          }
          if (element["status"] == true && (this.currentDate == edDate)) {
            if (this.currentTime > edTime) {
              element["status"] = Finished;
            }
          }

        });
        return response;
      }
    )).subscribe(
      (data) => {
        this.definedTestMachineList = data;

        this.dataSource = new MatTableDataSource(<any>data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }


  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit() { }
}
