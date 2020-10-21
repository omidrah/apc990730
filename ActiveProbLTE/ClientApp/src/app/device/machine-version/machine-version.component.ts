import { HttpClient, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export interface UserData {
  id: number;
  versionNum: string;
  faCreateDate: string;
  fileDownloadAddress: string;
  faCompleteDate: string;
  isDone: boolean;
}

@Component({
  selector: 'machine-version',
  templateUrl: './machine-version.component.html',
  styleUrls: ['./machine-version.component.css']
})
export class MachineVersionComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['index', 'versionNum', 'faCreateDate', 'fileDownloadAddress', 'isDone'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  versions: any;
  filter: string = '';
  MachineId: number;
  MachineName: string;
  MachineIMEI1: string;
  selectedRow: number;
  hasUnCompleteUpdate: boolean = false;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  private allSubscribtion: Subscription = new Subscription();
  constructor(
    private _http: HttpClient,
    private _avRoute: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private translate: TranslateService
  ) {
    if (this._avRoute.snapshot.params['id']) {
      this.MachineId = +this._avRoute.snapshot.params['id'];
      this.selectedRow = +this._avRoute.snapshot.params['id'];
      this.MachineName = this._avRoute.snapshot.params['Name'];
      this.MachineIMEI1 = this._avRoute.snapshot.params['IMEI1'];
      this.getVersionList();
    }
    else { //queryString is null
      this.router.navigateByUrl('./machine');
    }
  }
  ngOnInit() { }
  ngOnDestroy() {
    this.allSubscribtion.unsubscribe();
  }
  getVersionList() {
    this.allSubscribtion.add(
      this._http.get('api/Version/Index/' + this.MachineId).subscribe((data) => {
        if (data != null) {
          this.versions = data;
          // In 990123 -- Dr.VahidPour say -- no need this check
          //check if has Update Donot Complete, Disable Upload button
          // for (let index = 0; index < this.versions.length; index++) {
          //     if(this.versions[index]["isDone"] == false) //mean has Update case that donot complete
          //     {
          //         this.hasUnCompleteUpdate=true;  
          //         break;                  
          //     }
          // }

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

  uploadFile(files) {
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
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('id', this.MachineId.toString());
    this.allSubscribtion.add(
      this._http.post('api/Version/Create/', formData, { reportProgress: true, observe: 'events' })
        .subscribe(
          (data) => {
            if (data.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * data.loaded / data.total);
            }
            else if (data.type === HttpEventType.Response) {
              switch (data.body["code"]) {
                case 1:
                  this.onUploadFinished.emit(data.body);
                  this.getVersionList();
                  this.toast.success(this.translate.instant(data.body["msg"]), this.translate.instant('Successful'));
                  break;
                case 2: case 3: case 4: case 5: case 6:
                  this.toast.error(this.translate.instant(data.body["msg"]), this.translate.instant('Error'));
                  break;
                //case 3:
                //  this.toast.error(data.body["msg"]);
                //  break;
                //case 4:
                //  this.toast.error(data.body["msg"]);
                //  break;
                //case 5:
                //  this.toast.error(data.body["msg"]);
                //  break;
                //case 6:
                //  this.toast.error(data.body["msg"]);
                //  break;
              }
              this.message = "";
              this.progress = null;
            }
          },
          (err) => {  //fille size.. managment
            this.toast.error(this.translate.instant('Updatefailed'), this.translate.instant('Error'));
          })
    );
  }
}
