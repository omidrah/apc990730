import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../Shared/services/Language.service';
import { TranslateService } from '@ngx-translate/core';
import { PduDecoderService } from '../../Shared/services/pdu-decoder.service';

// only used for modal
declare var $: any;

export interface UserData {
  id: number;
  Name: string;
  Email: string;
  Mobile: string;
  Title: string;
  MessageContent: string;
}

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.css']
})
export class NotificationManagerComponent implements OnInit {

  public showloader: boolean = false;

  displayedColumns: string[] = ['index', 'Name', 'Email', 'Mobile', 'Title', 'MessageContent', 'actions'];

  selectedId: number;
  machinId: number;
  MachineName: string;

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortAll: MatSort;


  @ViewChild('input', { static: true }) searchInput: ElementRef;


  constructor(
    private _http: HttpClient,
    private _avRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private langService: LanguageService,
    private translate: TranslateService,
    private _decoder: PduDecoderService) {

    if (this._avRoute.snapshot.params['id']) {
      this.machinId = this._avRoute.snapshot.params['id'];
      this.MachineName = this._avRoute.snapshot.params['Name'];

      this.getMessage();
      this.getMachineStatusDetail(this.machinId);
    }
  }

  ngOnInit() {
  }

  getMessage() {
    //this.showloader = true;
    //this._http.get('api/Message/IndexWithMachineId/' + this.machinId).subscribe((data) => {

    //  this.dataSource = new MatTableDataSource(<any>data);
    //  this.dataSource.paginator = this.paginator;
    //  this.dataSource.sort = this.sortAll;

    //  this.showloader = false;

    //  this.dataSource.filter = this.searchInput.nativeElement.value.trim().toLowerCase();
    //}
    //);
  }

  getMachineStatusDetail(id) {
    this._http.get('api/DefinedTestMachine/MachineStatusDetail/' + id).subscribe((data) => {

    });
  }

  deleteConfirm(id) {
    this.selectedId = id;
  }
  doDelete() {

    this.showloader = true;
    this._http.delete('api/Message/Delete/' + this.selectedId).subscribe((result) => {

      this.showloader = false;

      if (result["succeed"] == true)
        if (result["result"] == true)
          this.toastrService.success(this.translate.instant("MessageDeleteCompletedSuccessfully"), this.translate.instant('Noticeable'));
        else
          this.toastrService.warning(this.translate.instant(result["message"]), this.translate.instant('Warning'));
      else
        this.toastrService.error(this.translate.instant('DatabaseActionError'), this.translate.instant('Error'));

      this.getMessage();
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
  }

  messageDecoding(message, ussd) {
    if (message != null) {

      message = message.trim();

      if (ussd === "SMS") {

        var messageList = message.split("+CMGL: ")
        var decodedMessages = [];
        messageList.forEach(i => {
          if (i.length > 0) {
            var upd = i.trim().split('\n');
            if (upd.length > 1 && upd[1].length > 0) {
              var msg = JSON.parse(this._decoder.decode(upd[1], false));
              if (msg.Success)
                decodedMessages.push(msg);
            }
          }
        });

        var result: string;
        var SortedMessages = decodedMessages.sort((a, b) => (a.PartNumber > b.PartNumber) ? 1 : -1);
        SortedMessages.forEach(i => {
          result += i.Message;
        });
        return result;
      }
      else {
        var msg = JSON.parse(this._decoder.decode(message, true));
        //if (msg.Success)
        return msg.Message;
      }
    }
  }
}
