import { PaginationInstance } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output, OnDestroy, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sort, MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

// only used for modal
declare var $: any;

export interface UserData {
  id: number;
  versionNum: string;
  faCreateDate: string;
  fileDownloadAddress: string;
  faCompleteDate: string;
  isDone: boolean;
}


@Component({
  selector: 'group-version',
  templateUrl: './group-version.component.html',
  styleUrls: ['./group-version.component.css']
})
export class GroupVersionComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['index', 'faCreateDate', 'fileDownloadAddress', 'isDone'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public showloader: boolean = false;
  selectFileToUpload: File;

  filter: string = '';
  selectedGroupid: number;
  sGroupTitle: string;
  versions: any;
  canUpdate: boolean;
  public progress: number;
  public message: string;
  public config: PaginationInstance = {
    id: 'grpVersionPng',
    currentPage: 1,
    itemsPerPage: 10
  }
  private vlSubscription: Subscription = new Subscription();
  @Output() public onUploadFinished = new EventEmitter();
  constructor(
    private _avRoute: ActivatedRoute,
    private router: Router,
    private _http: HttpClient,
    private toast: ToastrService,
    private translate: TranslateService
  ) {
    if (this._avRoute.snapshot.params['id']) {
      this.selectedGroupid = +this._avRoute.snapshot.params['id'];
      this.sGroupTitle = this._avRoute.snapshot.params['GroupTitle'];
      this.getVersionList();
    }
    else { //queryString is null
      this.router.navigateByUrl('./Group');
    }
  }

  ngOnInit() {
    this.checkCanUpdate();
  }
  ngOnDestroy() {
    this.vlSubscription.unsubscribe();
  }
  getVersionList() {
    this.showloader = true;
    this.vlSubscription.add(
      this._http.get('api/Version/Group/' + this.selectedGroupid).subscribe((data) => {

        this.showloader = false;
        if (data != null) {
          this.versions = data;

          this.dataSource = new MatTableDataSource(<any>data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        }
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //check has previous update
  checkCanUpdate() {
    this.vlSubscription.add(
      this._http.post('api/Version/canUpdate/', this.selectedGroupid).subscribe(
        (data) => {
          if (data["code"] = 5) {
            this.canUpdate = false;
          }
          else {
            this.canUpdate = true;
          }
        }
      )
    );
  }
  onPageChange(number: number) {
    console.log(`pageChange(${number})`);
    this.config.currentPage = number;
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      this.toast.error(this.translate.instant('SelectAFilePlease'), this.translate.instant('Error'));
      return;
    }
    let fileToUpload = <File>files[0];
    if (fileToUpload.size > 2000000) {
      this.toast.error(this.translate.instant('FileSizeMoreThan2MB'), this.translate.instant('Error'));
      return;
    }
    var splName = fileToUpload.name.split('.');
    if (splName[splName.length - 1] != "zip") {
      this.toast.error(this.translate.instant('FileTypeIsInvalid'), this.translate.instant('Error'));
      return;
    }

    var typeValid = ["application/x-zip-compressed", "application/zip", "application/zip-compressed", "multipart/x-zip"];
    if (typeValid.indexOf(fileToUpload.type) < 0) {
      this.toast.error(this.translate.instant('FileTypeIsIncorrect'), this.translate.instant('Error'));
      return;
    }

    if (!this.canUpdate) {

      this.selectFileToUpload = fileToUpload;
      $('#modal-default').modal('show');

    }
  }
  doUpdate() {
    this.UpdateConfig(this.selectFileToUpload);
    $('#modal-default').modal('hide');
  }

  private UpdateConfig(fileToUpload: File) {
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('id', this.selectedGroupid.toString());

    this.showloader = true;

    this.vlSubscription.add(
      this._http.post('api/Version/CreateGroup/', formData, { reportProgress: true, observe: 'events' })
        .subscribe((data) => {

          this.showloader = false;

          if (data.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * data.loaded / data.total);
          }
          else if (data.type === HttpEventType.Response) {
            switch (data.body["code"]) {
              case 1:
                this.onUploadFinished.emit(data.body);
                this.getVersionList();
                this.checkCanUpdate();
                this.toast.success(this.translate.instant(data.body["msg"]), this.translate.instant('Successful'));
                break;
              case 2:
              case 3:
              case 4:
              case 6:                
                this.toast.error(this.translate.instant(data.body["msg"]), this.translate.instant('Error'));
                break;
              //case 3:
              //  this.toast.error(data.body["msg"]);
              //  break;
              //case 4:
              //  this.toast.error(data.body["msg"]);
              //  break;
              case 5:
                //show list of machine has Update now
                var mach = data.body["mach"];
                mach.forEach(function (key, value) {
                  console.log(value);
                  //this.toast.error(value[key]["name"] + "\n  " + data.body["msg"]);
                  this.toast.error(value[key]["name"] + "\n  " + this.translate.instant(data.body["msg"]), this.translate.instant('Error'));

                });
                //this.toast.error(data.body["msg"]);
                break;
              //case 6:
              //  this.toast.error(data.body["msg"]);
              //  break;
            }
            this.message = "";
            this.progress = null;
          }
        }, (err) => {
            this.toast.error(this.translate.instant('Updatefailed'), this.translate.instant('Error'));
        })
    );

  }

  sortData(sort: Sort) {
    const data = this.versions.slice();
    if (!sort.active || sort.direction === '') {
      this.versions = data;
      return;
    }
    this.versions = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'faCreateDate': return compare(a.faCreateDate, b.faCreateDate, isAsc);
        case 'faCompleteDate': return compare(a.faCompleteDate, b.faCompleteDate, isAsc);
        case 'isDone': return compare(a.isDone, b.isDone, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
