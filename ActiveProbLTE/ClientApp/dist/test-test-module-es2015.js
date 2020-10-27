(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["test-test-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/test/definedTest/definedTest.component.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/test/definedTest/definedTest.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\r\n<div class=\"content-wrapper\">\r\n  <!-- Content Header (Page header) -->\r\n\r\n  <section class=\"content-header\">\r\n    <h1>\r\n      <span translate>TestList</span>\r\n    </h1>\r\n    <ol class=\"breadcrumb\">\r\n      <li><a [routerLink]=\"['']\" translate><i class=\"fa fa-dashboard\"></i>Home</a></li>\r\n      <li class=\"active\"><span translate>TestList</span></li>\r\n    </ol>\r\n  </section>\r\n\r\n  <!--<app-breadcrumb></app-breadcrumb>-->\r\n  <!-- Main content -->\r\n  <section class=\"content\">\r\n\r\n    <!--------------------------\r\n    | Your Page Content Here |\r\n    -------------------------->\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12\">\r\n        <div class=\"box box-primary\">\r\n          <div class=\"box-body\">\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <mat-form-field>\r\n                  <mat-label translate>Search</mat-label>\r\n                  <input matInput (keyup)=\"applyFilter($event)\" #input>\r\n                </mat-form-field>\r\n                <a class=\"btn btn-success btn-lg rowEndAligne\" [routerLink]=\"['/Test/Create']\"><span translate>CreateTest</span><i class=\"fa fa-plus\"></i></a>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"mat-table-container mat-elevation-z8\">\r\n              <table mat-table [dataSource]=\"dataSource\" matSort class=\"table table-hover table-striped text-nowrap\">\r\n\r\n                <!--- Note that these columns can be defined in any order.\r\n                The actual rendered columns are set as a property on the row definition\" -->\r\n\r\n                <ng-container matColumnDef=\"index\">\r\n                  <th mat-header-cell *matHeaderCellDef><span translate>Row</span></th>\r\n                  <td mat-cell *matCellDef=\"let element;let i = index;\">\r\n                    {{this.paginator.pageIndex == 0 ? i + 1 : 1 + i + this.paginator.pageIndex * this.paginator.pageSize}}\r\n                  </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"title\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>Title</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\"> {{element.title}} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"layer3Messages\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>Layer3Messages</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\">\r\n                    <i title=\"{{ (element.layer3Messages==true ? 'Yse' : 'No' ) | translate }}\" class=\"fa fa-2x\" [ngClass]=\" { 'fa-minus-circle text-red': !element.layer3Messages , 'fa-check-circle text-green': element.layer3Messages==true} \"></i>\r\n                  </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"repeatTime\">\r\n                  <th mat-header-cell *matHeaderCellDef><span translate>RepeatTime</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\"> {{element.repeatTime}} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"repeatCount\">\r\n                  <th mat-header-cell *matHeaderCellDef><span translate>RepeatCount</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\"> {{element.repeatCount}} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"measurementInterval\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>MeasurementInterval</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\"> {{element.measurementInterval}} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"testTypeTitle\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>TestTypeTitle</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\"> {{element.testTypeTitle}} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"networkTitle\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>NetworkTitle</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\"> {{element.networkTitle}}</td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"bandTitle\">\r\n                  <th mat-header-cell *matHeaderCellDef><span translate>BandTitle</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\"> {{element.bandTitle}} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"saveLogFile\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>SaveLogFile</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\">\r\n                    <i title=\"{{ (element.saveLogFile==true ? 'Yse' : 'No' ) | translate }}\" class=\"fa fa-2x\"\r\n                       [ngClass]=\"{'fa-minus-circle text-red': element.saveLogFile==false , 'fa-check-circle text-green': element.saveLogFile==true} \"></i>\r\n                  </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"actions\" sticky [stickyEnd]=\"true\">\r\n                  <th mat-header-cell *matHeaderCellDef></th>\r\n                  <td mat-cell *matCellDef=\"let element\">\r\n\r\n                    <a class=\"btn btn-default gridbutton\" *ngIf=\"!element.editable\" [routerLink]=\"['/Test/edit/' , element.id]\" title=\"{{ 'Edit' | translate }}\"><i class=\"fa fa-edit\"></i></a>\r\n\r\n                    <a class=\"btn btn-default gridbutton\" *ngIf=\"element.editable\" [routerLink]=\"['/Test/edit/' , element.id]\" title=\"{{ 'Visit' | translate }}\"><i class=\"fa fa-calendar-plus-o\"></i></a>\r\n\r\n                    <a class=\"btn btn-default gridbutton\" [class.disabled]=\"element.editable\" (click)=\"deleteTest(element.id,element.title)\" title=\"{{ 'Delete' | translate }}\" data-toggle=\"modal\" data-target=\"#modal-default\"><i class=\"fa fa-trash\"></i></a>\r\n                  </td>\r\n                </ng-container>\r\n\r\n                <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n                <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n              </table>\r\n              <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[10 , 25 , 50 , 100]\" [showFirstLastButtons]=\"true\"></mat-paginator>\r\n\r\n            </div>\r\n\r\n          </div><!-- /.box-body -->\r\n          <div class=\"overlay\" *ngIf=\"showloader\">\r\n            <i class=\"fa fa-refresh fa-spin\"></i>\r\n          </div>\r\n        </div><!-- /.box -->\r\n      </div><!-- /.col -->\r\n    </div><!-- /.row -->\r\n\r\n    <div class=\"modal fade\" id=\"modal-default\" data-backdrop=\"static\" style=\"display: none;\">\r\n      <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">×</span>\r\n            </button>\r\n            <h4 class=\"modal-title\" translate>Noticeable</h4>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <p translate>DeleteTestConfirmMessage</p>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-default pull-left\" data-dismiss=\"modal\" translate>No</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"doDelete()\" translate>Yse</button>\r\n          </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n      </div>\r\n      <!-- /.modal-dialog -->\r\n    </div>\r\n\r\n  </section>\r\n  <!-- /.content -->\r\n</div>\r\n<!-- /.content-wrapper -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/test/definedTestEdit/definedTestEdit.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/test/definedTestEdit/definedTestEdit.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\r\n<div class=\"content-wrapper\">\r\n  <!-- Content Header (Page header) -->\r\n\r\n  <section class=\"content-header\">\r\n    <h1>\r\n      {{breadcroumb | translate}}\r\n      <small>{{testTitle }}</small>\r\n    </h1>\r\n\r\n    <ol class=\"breadcrumb\">\r\n      <li><a [routerLink]=\"['']\" translate><i class=\"fa fa-dashboard\"></i>Home</a></li>\r\n      <li><a [routerLink]=\"['/Test']\"><span translate>TestList</span></a></li>\r\n      <li class=\"active\">{{breadcroumb | translate}} {{ testTitle }}</li>\r\n    </ol>\r\n  </section>\r\n\r\n  <!--<app-breadcrumb></app-breadcrumb>-->\r\n  <!-- Main content -->\r\n  <section class=\"content\">\r\n\r\n    <div class=\"row\">\r\n\r\n      <div class=\"col-md-12\">\r\n        <!-- Horizontal Form -->\r\n        <div class=\"box box-primary\">\r\n\r\n\r\n          <form class=\"form-horizontal\" [formGroup]=\"definedTestForm\" (ngSubmit)=\"save()\" #formDir=\"ngForm\" novalidate>\r\n            <div class=\"box-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>Title</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" placeholder=\"Title\" type=\"text\" formControlName=\"title\" required>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"title?.invalid &&  title.errors.required  && ( title.touched || formDir.submitted)\" translate>TitleIsRequired</span>\r\n                      <span *ngIf=\"title?.invalid && title.errors.titleExist   && ( title.touched || formDir.submitted)\" class=\"text-danger col-md-12\" translate>TitleIsDuplicate</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\"><span translate>Layer3Messages</span>:</label>\r\n                    <div class=\"col-sm-9\">\r\n                      <div class=\"checkbox\">\r\n                        <label>\r\n                          <input type=\"checkbox\" formControlName=\"layer3Messages\">\r\n                        </label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>RepeatType</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"repeatTypeId\" [(ngModel)]=\"repeatTypeOptionValue\">\r\n                        <option value=-1 translate>SelectRepeatTypePlease</option>\r\n                        <option *ngFor=\"let type of repeatTypeList\" [ngValue]=type.id>\r\n                          {{type.title}}\r\n                        </option>\r\n                      </select>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"repeatTypeId?.invalid   && ( repeatTypeId.touched || formDir.submitted)\" translate>RepeatTypeIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"repeatTypeOptionValue==2\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>RepeatTime</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"repeatTime\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"repeatTime?.invalid   && ( repeatTime.touched || formDir.submitted)\" translate>RepeatTimeIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\" *ngIf=\"repeatTypeOptionValue==3\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\"><span translate>RepeatCount</span>:</label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"repeatCount\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"repeatCount?.invalid   && ( repeatCount.touched || formDir.submitted)\" translate>RepeatCountIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>TestTypeTitle</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"testTypeId\"\r\n                              [(ngModel)]=\"testTypeIdOptionValue\" (change)='onTestTypeOptionsSelected($event)'>\r\n                        <option value=\"0\" translate>SelectTestPlease</option>\r\n                        <option *ngFor=\"let type of testTypeList\" [ngValue]=type.id>\r\n                          {{type.title}}\r\n                        </option>\r\n                      </select>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"testTypeId?.invalid   && ( testTypeId.touched || formDir.submitted)\" translate>TestTypeIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>MeasurementIntervalLable</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"measurementInterval\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"measurementInterval?.invalid   && ( measurementInterval.touched || measurementInterval.dirty || formDir.submitted)\" translate>MeasurementIntervalIsInvalid</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==1 || testTypeIdOptionValue==2 \">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>UsualCallDuration</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"usualCallDuration\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"usualCallDuration.invalid   && ( usualCallDuration.touched || usualCallDuration.dirty  || formDir.submitted)\" translate>UsualCallDurationIsInvalid</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==1 || testTypeIdOptionValue==2\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>UsualCallWaitTime</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"usualCallWaitTime\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"usualCallWaitTime.invalid   && ( usualCallWaitTime.touched || usualCallWaitTime.dirty  || formDir.submitted)\" translate>UsualCallWaitTimeIsInvalid</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==4\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>TestDataProtocol</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" type=\"text\" data-val=\"true\" formControlName=\"testDataId\"\r\n                              (change)='onOptionsSelected($event)'>\r\n                        <option value=-1 translate>SelectTestDataProtocolPlease</option>\r\n                        <option *ngFor=\"let type of testDataList\" [(ngValue)]=\"type.id\">\r\n                          {{type.title}}\r\n                        </option>\r\n                      </select>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"testDataId?.invalid   && ( testDataId.touched || formDir.submitted)\" translate>TestDataProtocolIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\" *ngIf=\"(testTypeIdOptionValue==2) || (testTypeIdOptionValue==4 && (testDataIdOptionValue == 1 || testDataIdOptionValue == 2) )\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>TestDataType</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"testDataTypeId\" (change)='onDirectionSelected($event)'>\r\n                        <option value=0 translate>SelectTestDataTypePlease</option>\r\n                        <option *ngFor=\"let type of testDataTypeList\" [ngValue]=type.id>\r\n                          {{type.title}}\r\n                        </option>\r\n                      </select>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"testDataTypeId?.invalid   && ( testDataTypeId.touched || formDir.submitted)\" translate>TestDataTypeIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==4 || testTypeIdOptionValue==2\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>TestDataServer</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"url\" formControlName=\"testDataServer\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\" testDataServer?.invalid   && ( testDataServer.touched  || testDataServer.dirty || formDir.submitted) \" translate>TestDataServerIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==4 && testDataIdOptionValue == 1\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>TestDataUserName</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"text\" formControlName=\"testDataUserName\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"testDataUserName?.invalid   && ( testDataUserName.touched  || testDataUserName.dirty || formDir.submitted)\" translate>TestDataUserNameIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==4 && testDataIdOptionValue == 4\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>TraceRouteHubCount</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"traceRouteHubCount\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"TraceRouteHubCount?.invalid   && ( TraceRouteHubCount.touched  || TraceRouteHubCount.dirty || formDir.submitted)\" translate>TraceRouteHubIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==4 && testDataIdOptionValue == 3\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>PingCount</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"numberOfPings\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"numberOfPings?.invalid   && ( numberOfPings.touched  || numberOfPings.dirty || formDir.submitted)\" translate>NumberOfPingsIsInvalid</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==4 && testDataIdOptionValue == 3\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>PacketSize</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"packetSize\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"packetSize?.invalid   && ( packetSize.touched  || packetSize.dirty || formDir.submitted)\" translate>PacketSizeIsInvalid</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==4 && testDataIdOptionValue == 3\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>IntervalTime</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"internalTime\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"internalTime?.invalid   && ( internalTime.touched  || internalTime.dirty || formDir.submitted)\" translate>InternalTimeIsInvalid</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==4 && testDataIdOptionValue == 3\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>ResponseWaitTime</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"responseWaitTime\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"responseWaitTime?.invalid   && ( responseWaitTime.touched  || responseWaitTime.dirty || formDir.submitted)\" translate>ResponseWaitTimeIsInvalid</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==4 && testDataIdOptionValue == 3\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>TTL</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"ttl\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"ttl?.invalid   && ( ttl.touched || ttl.dirty|| formDir.submitted)\" translate>TTLIsInvalid</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==4 && testDataIdOptionValue == 3\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>IpType</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"ipTypeId\" [(ngModel)]=\"iPTypeIdOptionValue\">\r\n                        <option value=-1 translate>SelectIpTypePlease</option>\r\n                        <option *ngFor=\"let type of iPTypeList\" [ngValue]=type.id>\r\n                          {{type.title}}\r\n                        </option>\r\n                      </select>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"ipTypeId?.invalid   && ( ipTypeId.touched || formDir.submitted)\" translate>IpTypeIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==4 && testDataIdOptionValue == 1\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>TestDataPassword</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"text\" formControlName=\"testDataPassword\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"testDataPassword?.invalid   && ( testDataPassword.touched  || testDataPassword.dirty || formDir.submitted)\" translate>TestDataPasswordIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==2 || (testTypeIdOptionValue==4 && (testDataIdOptionValue == 1 || testDataIdOptionValue == 2 ))\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span translate>FileAddress</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"text\" formControlName=\"testDataDownloadFileAddress\">\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==4 && (testDataIdOptionValue == 1 || testDataIdOptionValue == 2) && testDataDirectionIdOptionValue == 2\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>TestDataUploadFileSize</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"testDataUploadFileSize\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"testDataUploadFileSize?.invalid   && ( testDataUploadFileSize.touched || testDataUploadFileSize.dirty|| formDir.submitted)\" translate>TestDataUploadFileSizeIsInvalid</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==5\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>OTTService</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"ottServiceId\">\r\n                        <option value=0 translate>SelectOTTServicePlease</option>\r\n                        <option *ngFor=\"let type of oTTServiceList\" [ngValue]=type.id>\r\n                          {{type.title}}\r\n                        </option>\r\n                      </select>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"ottServiceId?.invalid   && ( ottServiceId.touched || formDir.submitted)\" translate>OTTServiceIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>NetworkTitle</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"networkId\">\r\n                        <option value=0 translate>SelectNetworkPlease</option>\r\n                        <option *ngFor=\"let type of networkList\" [ngValue]=type.id>\r\n                          {{type.title}}\r\n                        </option>\r\n                      </select>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"networkId?.invalid   && ( networkId.touched || formDir.submitted)\" translate>NetworkIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==1  || testTypeIdOptionValue==2\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>UsualCallNumber</span>:                      \r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"usualCallNumber\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"usualCallNumber?.invalid   && ( usualCallNumber.touched || formDir.submitted)\" translate>UsualCallNumberIsInvalid</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"testTypeIdOptionValue==5\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>OTTServiceType</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"ottServiceTestId\">\r\n                        <option value=0  translate>SelectOTTServiceTestPlease</option>\r\n                        <option *ngFor=\"let type of oTTServiceTestList\" [ngValue]=type.id>\r\n                          {{type.title}}\r\n                        </option>\r\n                      </select>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"ottServiceTestId?.invalid   && ( ottServiceTestId.touched || formDir.submitted)\" translate>OTTServiceIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span translate>BandTitle</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"bandId\">\r\n                        <option *ngFor=\"let type of bandList\" [ngValue]=type.id>\r\n                          {{type.title}}\r\n                        </option>\r\n                      </select>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span translate>SaveLogFile</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <div class=\"checkbox\">\r\n                        <label>\r\n                          <input type=\"checkbox\" formControlName=\"saveLogFile\" [(ngModel)]=\"saveLogFileCheckValue\">\r\n                        </label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"saveLogFileCheckValue\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>LogFilePartitionType</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"logFilePartitionTypeId\" [(ngModel)]=\"logFilePartitionTypeCheckValue\">\r\n                        <option value=0 translate>SelectLogFilePartitionTypePlease</option>\r\n                        <option *ngFor=\"let type of logFilePartitionTypeList\" [ngValue]=type.id>\r\n                          {{type.title}}\r\n                        </option>\r\n                      </select>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"logFilePartitionTypeId?.invalid   && ( logFilePartitionTypeId.touched || formDir.submitted)\" translate>LogFilePartitionTypeIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"logFilePartitionTypeCheckValue==1 && saveLogFileCheckValue\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>LogFilePartitionTime</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"logFilePartitionTime\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"logFilePartitionTime?.invalid   && ( logFilePartitionTime.touched  || logFilePartitionTime.dirty || formDir.submitted)\" translate>LogFilePartitionTimeIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\" *ngIf=\"logFilePartitionTypeCheckValue==2 && saveLogFileCheckValue\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>TestDataUploadFileSize</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"logFilePartitionSize\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"logFilePartitionSize?.invalid   && ( logFilePartitionSize.touched || logFilePartitionSize.dirty || formDir.submitted)\" translate>TestDataUploadFileSizeIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\" *ngIf=\"saveLogFileCheckValue\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>LogFileHoldTime</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <input class=\"form-control\" type=\"number\" formControlName=\"logFileHoldTime\">\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"logFileHoldTime?.invalid   && ( logFileHoldTime.touched || logFileHoldTime.dirty || formDir.submitted)\" translate>LogFileHoldTimeIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div><!-- /.box-body -->\r\n            <div class=\"box-footer\">\r\n              <button class=\"btn btn-danger rowEndAligne\" (click)=\"cancel()\" translate>Cancel</button>\r\n              <button type=\"submit\" class=\"btn btn-primary rowEndAligne\" [attr.disabled]=\"Editable == true? true :null\" translate>Save</button>\r\n            </div><!-- /.box-footer -->\r\n          </form>\r\n          <div class=\"overlay\" *ngIf=\"showloader\">\r\n            <i class=\"fa fa-refresh fa-spin\"></i>\r\n          </div>\r\n        </div><!-- /.box -->\r\n\r\n      </div>\r\n    </div>\r\n\r\n  </section><!-- /.content -->\r\n</div><!-- /.content-wrapper -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/test/definedTestGroupAssignment/definedTestGroupAssignment.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/test/definedTestGroupAssignment/definedTestGroupAssignment.component.html ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\r\n<div class=\"content-wrapper\">\r\n  <!-- Content Header (Page header) -->\r\n\r\n  <section class=\"content-header\">\r\n    <h1>\r\n      <span translate>GroupTestList</span>\r\n      <small>{{groupTitle}}</small>\r\n    </h1>\r\n    <ol class=\"breadcrumb\">\r\n\r\n      <li><a [routerLink]=\"['']\" translate><i class=\"fa fa-dashboard\"></i>Home</a></li>\r\n      <li><a [routerLink]=\"['/machine/Group']\"><span translate>DeviceGroup</span></a></li>\r\n      <li class=\"active\"><span translate>GroupTestList</span> {{groupTitle}}</li>\r\n\r\n    </ol>\r\n  </section>\r\n\r\n  <!--<app-breadcrumb></app-breadcrumb>-->\r\n  <!-- Main content -->\r\n  <section class=\"content\">\r\n\r\n    <!--------------------------\r\n    | Your Page Content Here |\r\n    -------------------------->\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12\">\r\n        <div class=\"box box-primary\">\r\n          <div class=\"box-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                  <mat-form-field>\r\n                    <mat-label translate>Search</mat-label>\r\n                    <input matInput (keyup)=\"applyFilter($event)\" #input>\r\n                  </mat-form-field>\r\n                \r\n                  <a class=\"btn btn-success btn-lg rowEndAligne\" [routerLink]=\"['/Test/Group/Assignment/Create/', this.groupId,this.groupTitle]\" [class.disabled]=\"!definedTestMachineGroupList\" ><span translate>AssignTest</span> <i class=\"fa fa-plus\"></i></a>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"mat-table-container mat-elevation-z8\">\r\n                <table mat-table [dataSource]=\"dataSource\" matSort class=\"table table-hover table-striped text-nowrap\">\r\n\r\n                  <!--- Note that these columns can be defined in any order.\r\n                  The actual rendered columns are set as a property on the row definition\" -->\r\n\r\n                  <ng-container matColumnDef=\"index\">\r\n                    <th mat-header-cell *matHeaderCellDef><span translate>Row</span></th>\r\n                    <td mat-cell *matCellDef=\"let element;let i = index;\">\r\n                      {{this.paginator.pageIndex == 0 ? i + 1 : 1 + i + this.paginator.pageIndex * this.paginator.pageSize}}\r\n                    </td>\r\n                  </ng-container>\r\n\r\n                  <ng-container matColumnDef=\"definedTestTitle\">\r\n                    <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>Title</span></th>\r\n                    <td mat-cell *matCellDef=\"let element\"> {{element.definedTestTitle}} </td>\r\n                  </ng-container>\r\n\r\n                  <ng-container matColumnDef=\"testTypeTitle\">\r\n                    <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>TestTypeTitle</span></th>\r\n                    <td mat-cell *matCellDef=\"let element\"> {{element.testTypeTitle}} </td>\r\n                  </ng-container>\r\n\r\n                  <ng-container matColumnDef=\"beginDate\">\r\n                    <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>StartDate</span></th>\r\n                    <td mat-cell *matCellDef=\"let element\"> {{langService.convertDate(element.beginDate)}} </td>\r\n                  </ng-container>\r\n\r\n                  <ng-container matColumnDef=\"endDate\">\r\n                    <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>EndDate</span></th>\r\n                    <td mat-cell *matCellDef=\"let element\"> {{langService.convertDate(element.endDate)}} </td>\r\n                  </ng-container>\r\n\r\n                  <ng-container matColumnDef=\"actions\" sticky [stickyEnd]=\"true\">\r\n                    <th mat-header-cell *matHeaderCellDef></th>\r\n                    <td mat-cell *matCellDef=\"let element\">\r\n\r\n                      <a class=\"btn btn-default gridbutton\"  [class.disabled]=\"!element.editable\" [routerLink]=\"['/Test/Group/Assignment/Edit/' , element.machineGroupId + ',' + element.id , groupTitle ]\" title=\"{{ 'Edit' | translate }}\"><i class=\"fa fa-edit\"></i></a>\r\n\r\n                    </td>\r\n                  </ng-container>\r\n\r\n\r\n\r\n\r\n                  <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n                  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n                </table>\r\n                <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[10 , 25 , 50 , 100]\" [showFirstLastButtons]=\"true\"></mat-paginator>\r\n\r\n              </div>\r\n          </div><!-- /.box-body -->\r\n          <div class=\"overlay\" *ngIf=\"!dataSource\">\r\n            <i class=\"fa fa-refresh fa-spin\"></i>\r\n          </div>\r\n        </div><!-- /.box -->\r\n      </div><!-- /.col -->\r\n    </div><!-- /.row -->\r\n  </section><!-- /.content -->\r\n</div><!-- /.content-wrapper -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/test/definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component.html":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/test/definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component.html ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\r\n<div class=\"content-wrapper\">\r\n  <!-- Content Header (Page header) -->\r\n  <section class=\"content-header\">\r\n    <h1>\r\n      {{breadcroumb | translate}}\r\n      <small>{{GroupTitle}}</small>\r\n    </h1>\r\n    <ol class=\"breadcrumb\">\r\n      <li><a [routerLink]=\"['']\" translate><i class=\"fa fa-dashboard\"></i>Home</a></li>\r\n      <li><a [routerLink]=\"['/machine/Group']\"><span translate>DeviceGroup</span></a></li>\r\n      <li><a [routerLink]=\"['/Test/Group/Assignment/',machineGroupId , GroupTitle]\"><span translate>GroupTestList</span>  {{GroupTitle}} </a></li>\r\n      <li class=\"active\">{{breadcroumb | translate }} {{GroupTitle}}</li>\r\n    </ol>\r\n  </section>\r\n  <!--<app-breadcrumb></app-breadcrumb>-->\r\n  <!-- Main content -->\r\n  <section class=\"content\">\r\n\r\n    <!--------------------------\r\n  | Your Page Content Here |\r\n  -------------------------->\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12\">\r\n        <div class=\"box box-primary\">\r\n          <!--<div class=\"box-header\">\r\n          <i class=\"fa fa-simplybuilt\" style=\"margin-left:10px;\"></i>\r\n          <h3 class=\"box-title \">فهرست دستگاه ها</h3>\r\n        </div>-->\r\n          <!-- /.box-header -->\r\n          <form class=\"form-horizontal\" [formGroup]=\"definedTestGroupForm\" (ngSubmit)=\"save(false)\" #formDir=\"ngForm\" novalidate>\r\n            <div class=\"box-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>Test</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"definedTestId\" required>\r\n                        <option value=0 translate>SelectTestPlease</option>\r\n                        <option *ngFor=\"let test of definedTestList\" [ngValue]=test.id>\r\n                          {{test.title}}\r\n                        </option>\r\n                      </select>\r\n                      <span class=\"text-red col-md-12\" *ngIf=\"(definedTestId.invalid) && (definedTestId.touched || formDir.submitted)\" translate>TestIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span translate>Activation</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <div class=\"checkbox\">\r\n                        <label>\r\n                          <input type=\"checkbox\" formControlName=\"isActive\">\r\n                        </label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>StartDate</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <div class=\"row flex-container\">\r\n                        <div class=\"col-sm-5\">\r\n                          <input type=\"time\" class=\"form-control\" formControlName=\"beginDateTime\" required>\r\n                          <span class=\"text-red col-md-12\" *ngIf=\"f.beginDateTime.invalid && (f.beginDateTime.touched || formDir.submitted)\" translate>BeginTimeIsRequired</span>\r\n                        </div>\r\n                        <div class=\"col-sm-7\">\r\n                          <input [matDatepicker]=\"beginDate\" type=\"text\" class=\"form-control\" name=\"beginDate\" formControlName=\"beginDate\" (click)=\"beginDate.open()\" required>\r\n                          <mat-datepicker #beginDate></mat-datepicker>\r\n                          <span class=\"text-red col-md-12\" *ngIf=\"f.beginDate.invalid && (f.beginDate.touched || formDir.submitted)\" translate>BeginDateIsRequired</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>EndDate</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <div class=\"row flex-container\">\r\n                        <div class=\"col-sm-5\">\r\n                          <input type=\"time\" class=\"form-control\" formControlName=\"endDateTime\" required>\r\n                          <span class=\"text-red col-md-12\" *ngIf=\"f.endDateTime.invalid && (f.endDateTime.touched || formDir.submitted)\" translate>EndTimeIsRequired</span>\r\n                        </div>\r\n                        <div class=\"col-sm-7\">\r\n                          <input [matDatepicker]=\"endDate\" type=\"text\" class=\"form-control\" formControlName=\"endDate\" (click)=\"endDate.open()\" required>\r\n                          <mat-datepicker #endDate></mat-datepicker>\r\n                          <span class=\"text-red col-md-12\" *ngIf=\"f.endDate.invalid && (f.endDate.touched || formDir.submitted)\" translate>EndDateIsRequired</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>SimcardNo</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"sim\" required>\r\n                        <option value=0 translate>SelectSimcardNoPlease</option>\r\n                        <option value=1> 1 </option>\r\n                        <option value=2> 2 </option>\r\n                        <option value=3> 3 </option>\r\n                        <option value=4> 4 </option>\r\n                      </select>\r\n                      <span class=\"text-red col-md-12\" *ngIf=\"sim?.invalid && (sim.dirty || sim.touched || formDir.submitted)\" translate>SimcardNoIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div><!-- /.box-body -->\r\n            <div class=\"box-footer\">\r\n\r\n              <button class=\"btn btn-danger rowEndAligne\" (click)=\"cancel()\" translate>Cancel</button>\r\n              <button type=\"submit\" class=\"btn btn-primary rowEndAligne\" translate>Save</button>\r\n            </div><!-- /.box-footer -->\r\n          </form>\r\n          <div class=\"overlay\" *ngIf=\"showloader\">\r\n            <i class=\"fa fa-refresh fa-spin\"></i>\r\n          </div>\r\n        </div><!-- /.box -->\r\n      </div><!-- /.col -->\r\n    </div><!-- /.row -->\r\n\r\n    <div class=\"modal fade\" id=\"modal-default\" data-backdrop=\"static\" style=\"display: none;\">\r\n      <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">×</span>\r\n            </button>\r\n            <h4 class=\"modal-title\" translate>Noticeable</h4>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <p>{{ReplaceTestConfirmMessage}}</p>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-default pull-left\" data-dismiss=\"modal\" translate>Cancel</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"AcceptConfirm()\" translate>Ok</button>\r\n          </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n      </div>\r\n      <!-- /.modal-dialog -->\r\n    </div>\r\n  </section>\r\n  <!-- /.content -->\r\n</div>\r\n<!-- /.content-wrapper -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/test/definedTestMachineAssignment/definedTestMachineAssignment.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/test/definedTestMachineAssignment/definedTestMachineAssignment.component.html ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\r\n<div class=\"content-wrapper\">\r\n  <!-- Content Header (Page header) -->\r\n  <section class=\"content-header\">\r\n    <h1>\r\n      <span translate>DeviceTestList</span>\r\n      <small>{{MachineTitle}}</small>\r\n    </h1>\r\n    <ol class=\"breadcrumb\">\r\n      <li><a [routerLink]=\"['']\" translate><i class=\"fa fa-dashboard\"></i>Home</a></li>\r\n      <li><a [routerLink]=\"['/machine']\" translate>DeviceList</a></li>\r\n      <li class=\"active\"><span translate>DeviceTestList</span>  {{MachineTitle}}</li>\r\n    </ol>\r\n  </section>\r\n  <!--<app-breadcrumb></app-breadcrumb>-->\r\n  <!-- Main content -->\r\n  <section class=\"content\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12\">\r\n        <div class=\"box box-primary\">\r\n          <div class=\"box-body\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <mat-form-field>\r\n                  <mat-label translate>Search</mat-label>\r\n                  <input matInput (keyup)=\"applyFilter($event)\" #input>\r\n                </mat-form-field>\r\n\r\n                <a class=\"btn btn-success btn-lg rowEndAligne\" [routerLink]=\"['/Test/Assignment/create/', this.machinId , this.MachineTitle]\"><span translate>AssignTest</span> <i class=\"fa fa-plus\"></i></a>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"mat-table-container mat-elevation-z8\">\r\n              <table mat-table [dataSource]=\"dataSource\" matSort class=\"table table-hover table-striped text-nowrap\">\r\n\r\n                <!--- Note that these columns can be defined in any order.\r\n                The actual rendered columns are set as a property on the row definition\" -->\r\n\r\n                <ng-container matColumnDef=\"index\">\r\n                  <th mat-header-cell *matHeaderCellDef><span translate>Row</span></th>\r\n                  <td mat-cell *matCellDef=\"let element;let i = index;\">\r\n                    {{this.paginator.pageIndex == 0 ? i + 1 : 1 + i + this.paginator.pageIndex * this.paginator.pageSize}}\r\n                  </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"definedTestTitle\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>Title</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\"> {{element.definedTestTitle}} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"testTypeTitle\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>TestTypeTitle</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\"> {{element.testTypeTitle}} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"beginDate\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>StartDate</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\"> {{langService.convertDate(element.beginDate)}} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"endDate\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>EndDate</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\"> {{langService.convertDate(element.endDate)}} </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"status\">\r\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header><span translate>TestStatus</span></th>\r\n                  <td mat-cell *matCellDef=\"let element\">\r\n                    <i class=\"fa fa-2x\" title=\"{{ element.status | translate }}\"\r\n                       [ngClass]=\"element.status == 'Waiting' ? 'fa-pause-circle text-yellow' :\r\n                       element.status == 'Running' ? 'fa-play-circle text-blue' :\r\n                       element.status == 'Overwritten' ? 'fa-refresh text-red' :\r\n                       element.status == 'Finished' ? 'fa-check-circle text-green' :\r\n                       element.status == 'NotReceivedByDevice' ? 'fa-minus-circle text-red' : 'fa-frown-o text-light-blue'\">\r\n                    </i>\r\n                  </td>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"actions\" sticky [stickyEnd]=\"true\">\r\n                  <th mat-header-cell *matHeaderCellDef></th>\r\n                  <td mat-cell *matCellDef=\"let element\">\r\n\r\n                    <a class=\"btn btn-default gridbutton\"\r\n                       [routerLink]=\"['/Test/Assignment/edit/' , this.machinId + ',' + element.id , this.MachineTitle ]\"\r\n                       title=\"{{ 'Edit' | translate }}\"\r\n                       [class.disabled]=\"(element.status != 'Waiting' && element.status != 'NotReceivedByDevice') \"><i class=\"fa fa-edit\"></i></a>\r\n\r\n                  </td>\r\n                </ng-container>\r\n\r\n\r\n\r\n\r\n                <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n                <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n              </table>\r\n              <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[10 , 25 , 50 , 100]\" [showFirstLastButtons]=\"true\"></mat-paginator>\r\n\r\n            </div>\r\n          </div><!-- /.box-body -->\r\n          <div class=\"overlay\" *ngIf=\"!dataSource\">\r\n            <i class=\"fa fa-refresh fa-spin\"></i>\r\n          </div>\r\n        </div><!-- /.box -->\r\n      </div><!-- /.col -->\r\n    </div><!-- /.row -->\r\n\r\n  </section><!-- /.content -->\r\n</div><!-- /.content-wrapper -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/test/definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component.html":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/test/definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component.html ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Content Wrapper. Contains page content -->\r\n<div class=\"content-wrapper\">\r\n  <!-- Content Header (Page header) -->\r\n  <section class=\"content-header\">\r\n    <h1>\r\n      {{breadcroumb | translate}}\r\n      <small>{{machineTitle}}</small>\r\n    </h1>\r\n    <ol class=\"breadcrumb\">\r\n      <li><a [routerLink]=\"['']\" translate><i class=\"fa fa-dashboard\"></i>Home</a></li>\r\n      <li><a [routerLink]=\"['/machine']\" translate>DeviceList</a></li>\r\n      <li><a [routerLink]=\"['/Test/Assignment/Machine/' , machineId , machineTitle]\"><span translate>DeviceTestList</span> {{machineTitle}}</a></li>\r\n      <li class=\"active\">{{breadcroumb | translate}} {{machineTitle}}</li>\r\n    </ol>\r\n  </section>\r\n  <!--<app-breadcrumb></app-breadcrumb>-->\r\n  <!-- Main content -->\r\n  <section class=\"content\">\r\n\r\n    <!--------------------------\r\n  | Your Page Content Here |\r\n  -------------------------->\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12\">\r\n        <div class=\"box box-primary\">\r\n          <!--<div class=\"box-header\">\r\n          <i class=\"fa fa-simplybuilt\" style=\"margin-left:10px;\"></i>\r\n          <h3 class=\"box-title \">فهرست دستگاه ها</h3>\r\n        </div>-->\r\n          <!-- /.box-header -->\r\n          <form class=\"form-horizontal\" [formGroup]=\"definedTestMachineForm\" (ngSubmit)=\"save(false)\" #formDir=\"ngForm\" novalidate>\r\n            <div class=\"box-body\">\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>Test</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"definedTestId\">\r\n                        <option value=0 translate>SelectTestPlease</option>\r\n                        <option *ngFor=\"let test of definedTestList\" [ngValue]=test.id>\r\n                          {{test.title}}\r\n                        </option>\r\n                      </select>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"(definedTestId?.invalid) && (definedTestId.touched || formDir.submitted)\" translate>TestIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>Activation</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <div class=\"checkbox\">\r\n                        <label>\r\n                          <input type=\"checkbox\" formControlName=\"isActive\">\r\n                        </label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>StartDate</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <div class=\"row flex-container\">\r\n                        <div class=\"col-sm-5\">\r\n                          <input type=\"time\" class=\"form-control\" formControlName=\"beginDateTime\">\r\n                          <span class=\"text-danger col-md-12\" *ngIf=\"f.beginDateTime?.invalid && (f.beginDateTime.touched || formDir.submitted)\" translate>BeginTimeIsRequired</span>\r\n                        </div>\r\n                        <div class=\"col-sm-7\">\r\n                          <input [matDatepicker]=\"beginDate\" type=\"text\" class=\"form-control\" formControlName=\"beginDate\" (click)=\"beginDate.open()\">\r\n                          <mat-datepicker #beginDate></mat-datepicker>\r\n                          <span class=\"text-danger col-md-12\" *ngIf=\"f.beginDate?.invalid && (f.beginDate.touched || formDir.submitted)\" translate>BeginDateIsRequired</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputSerialNo\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>EndDate</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <div class=\"row flex-container\">\r\n                        <div class=\"col-sm-5\">\r\n                          <input type=\"time\" class=\"form-control\" formControlName=\"endDateTime\">\r\n                          <span class=\"text-danger col-md-12\" *ngIf=\"f.endDateTime?.invalid && (f.endDateTime.touched || formDir.submitted)\" translate>EndTimeIsRequired</span>\r\n                        </div>\r\n                        <div class=\"col-sm-7\">\r\n                          <input [matDatepicker]=\"endDate\" type=\"text\" class=\"form-control\" formControlName=\"endDate\" (click)=\"endDate.open()\">\r\n                          <mat-datepicker #endDate></mat-datepicker>\r\n                          <span class=\"text-danger col-md-12\" *ngIf=\"f.endDate?.invalid && (f.endDate.touched || formDir.submitted)\" translate>EndDateIsRequired</span>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"inputName\" class=\"col-sm-3 control-label\">\r\n                      <span class=\"text-red\">* </span>\r\n                      <span translate>SimcardNo</span>:\r\n                    </label>\r\n                    <div class=\"col-sm-9\">\r\n                      <select class=\"form-control\" data-val=\"true\" formControlName=\"sim\">\r\n                        <option value=0 translate>SelectSimcardNoPlease</option>\r\n                        <option value=1> 1 </option>\r\n                        <option value=2> 2 </option>\r\n                        <option value=3> 3 </option>\r\n                        <option value=4> 4 </option>\r\n                      </select>\r\n                      <span class=\"text-danger col-md-12\" *ngIf=\"sim?.invalid && (sim.touched || formDir.submitted)\" translate>SimcardNoIsRequired</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div><!-- /.box-body -->\r\n            <div class=\"box-footer\">\r\n\r\n              <button class=\"btn btn-danger rowEndAligne\" (click)=\"cancel()\" translate>Cancel</button>\r\n              <button type=\"submit\" class=\"btn btn-primary rowEndAligne\" translate>Save</button>\r\n            </div><!-- /.box-footer -->\r\n          </form>\r\n          <div class=\"overlay\" *ngIf=\"showloader\">\r\n            <i class=\"fa fa-refresh fa-spin\"></i>\r\n          </div>\r\n        </div><!-- /.box -->\r\n      </div><!-- /.col -->\r\n    </div><!-- /.row -->\r\n\r\n    <div class=\"modal fade\" id=\"modal-default\" data-backdrop=\"static\" style=\"display: none;\">\r\n      <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">×</span>\r\n            </button>\r\n            <h4 class=\"modal-title\" translate>Noticeable</h4>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <p>{{ReplaceTestConfirmMessage}}</p>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-default pull-left\" data-dismiss=\"modal\" translate>Cancel</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" (click)=\"AcceptConfirm()\" translate>Ok</button>\r\n          </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n      </div>\r\n      <!-- /.modal-dialog -->\r\n    </div>\r\n\r\n  </section><!-- /.content -->\r\n</div><!-- /.content-wrapper -->\r\n"

/***/ }),

/***/ "./src/app/test/definedTest/definedTest.component.css":
/*!************************************************************!*\
  !*** ./src/app/test/definedTest/definedTest.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".leftAlign {\r\n  text-align: left;\r\n}\r\n\r\n.gridbutton {\r\n  margin: 1px 2px;\r\n}\r\n\r\n.gridIcon {\r\n  font-size: 20px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVzdC9kZWZpbmVkVGVzdC9kZWZpbmVkVGVzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakIiLCJmaWxlIjoic3JjL2FwcC90ZXN0L2RlZmluZWRUZXN0L2RlZmluZWRUZXN0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGVmdEFsaWduIHtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcblxyXG4uZ3JpZGJ1dHRvbiB7XHJcbiAgbWFyZ2luOiAxcHggMnB4O1xyXG59XHJcblxyXG4uZ3JpZEljb24ge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/test/definedTest/definedTest.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/test/definedTest/definedTest.component.ts ***!
  \***********************************************************/
/*! exports provided: DefinedTestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefinedTestComponent", function() { return DefinedTestComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm2015/sort.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm2015/table.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm2015/paginator.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








let DefinedTestComponent = class DefinedTestComponent {
    constructor(_http, toastrService, translate) {
        this._http = _http;
        this.toastrService = toastrService;
        this.translate = translate;
        this.showloader = false;
        this.displayedColumns = ['index', 'title', 'layer3Messages', 'repeatTime', 'repeatCount', 'measurementInterval', 'testTypeTitle', 'networkTitle', 'bandTitle', 'saveLogFile', 'actions'];
        this.filter = '';
        this.getDefinedTests();
    }
    getDefinedTests() {
        this.showloader = true;
        this._http.get('api/DefinedTest/Index').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(response => {
            return response;
        })).subscribe(data => {
            this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_5__["MatTableDataSource"](data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.showloader = false;
        });
    }
    applyFilter(event) {
        const filterValue = event.target.value;
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
        this._http.delete('api/DefinedTest/Delete/' + this.selectedId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(response => {
            this.showloader = false;
            if (response == 2) {
                this.toastrService.error(this.translate.instant('CannotDeleteAssignedTest'), this.translate.instant('Error'));
            }
            return response;
        })).subscribe(() => {
            this.getDefinedTests();
            $('#modal-default').modal('hide');
        }, error => console.error(error));
    }
};
DefinedTestComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"], { static: true }),
    __metadata("design:type", _angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"])
], DefinedTestComponent.prototype, "paginator", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material_sort__WEBPACK_IMPORTED_MODULE_4__["MatSort"], { static: true }),
    __metadata("design:type", _angular_material_sort__WEBPACK_IMPORTED_MODULE_4__["MatSort"])
], DefinedTestComponent.prototype, "sort", void 0);
DefinedTestComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-definedTest',
        template: __webpack_require__(/*! raw-loader!./definedTest.component.html */ "./node_modules/raw-loader/index.js!./src/app/test/definedTest/definedTest.component.html"),
        styles: [__webpack_require__(/*! ./definedTest.component.css */ "./src/app/test/definedTest/definedTest.component.css")]
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
], DefinedTestComponent);



/***/ }),

/***/ "./src/app/test/definedTestEdit/definedTestEdit.component.css":
/*!********************************************************************!*\
  !*** ./src/app/test/definedTestEdit/definedTestEdit.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-control {\r\n  display: block;\r\n  width: 100%;\r\n  height: calc(1.5em + .75rem + 15px)\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVzdC9kZWZpbmVkVGVzdEVkaXQvZGVmaW5lZFRlc3RFZGl0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0VBQ2QsV0FBVztFQUNYO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC90ZXN0L2RlZmluZWRUZXN0RWRpdC9kZWZpbmVkVGVzdEVkaXQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mb3JtLWNvbnRyb2wge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogY2FsYygxLjVlbSArIC43NXJlbSArIDE1cHgpXHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/test/definedTestEdit/definedTestEdit.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/test/definedTestEdit/definedTestEdit.component.ts ***!
  \*******************************************************************/
/*! exports provided: DefinedTestEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefinedTestEditComponent", function() { return DefinedTestEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





const MyAwesomeRangeValidator = (fg) => {
    fg.get('usualCallDuration').setErrors(null);
    fg.get('usualCallWaitTime').setErrors(null);
    fg.get('usualCallNumber').setErrors(null);
    fg.get('testDataId').setErrors(null);
    fg.get('testDataTypeId').setErrors(null);
    fg.get('testDataServer').setErrors(null);
    fg.get('testDataUserName').setErrors(null);
    fg.get('testDataPassword').setErrors(null);
    fg.get('ottServiceId').setErrors(null);
    fg.get('ottServiceTestId').setErrors(null);
    fg.get('repeatTime').setErrors(null);
    fg.get('repeatCount').setErrors(null);
    fg.get('ttl').setErrors(null);
    fg.get('ipTypeId').setErrors(null);
    const testTypeId = fg.get('testTypeId').value;
    const repeatTypeId = fg.get('repeatTypeId').value;
    const saveLog = fg.get('saveLogFile').value;
    if (false) {}
    //addby omid -- check logfileSize and other parameter
    if (saveLog) { //true
        if (fg.get('logFilePartitionTypeId').value == null || fg.get('logFilePartitionTypeId').value == 0) { //نوع ذخیره سازی را مشخص نکرده و تیک ذخیره سازی خورده
            fg.get('logFilePartitionTypeId').setErrors({ 'incorrect': true });
        }
        if (fg.get('logFilePartitionTypeId').value == 1) { //time
            if (fg.get('logFilePartitionTime').value == null || fg.get('logFilePartitionTime').value < 1) {
                fg.get('logFilePartitionTime').setErrors({ 'incorrect': true });
                fg.get('logFilePartitionSize').setErrors(null);
            }
        }
        else if (fg.get('logFilePartitionTypeId').value == 2) { //size
            if (fg.get('logFilePartitionSize').value == null || fg.get('logFilePartitionSize').value < 1) {
                fg.get('logFilePartitionSize').setErrors({ 'incorrect': true });
                fg.get('logFilePartitionTime').setErrors(null);
            }
        }
        if (fg.get('logFileHoldTime').value == null || fg.get('logFileHoldTime').value < 1) {
            fg.get('logFileHoldTime').setErrors({ 'incorrect': true });
        }
    }
    else { //false , mean savelogfile donot tick
        fg.get('logFilePartitionTypeId').setErrors(null);
        fg.get('logFilePartitionTime').setErrors(null);
        fg.get('logFilePartitionSize').setErrors(null);
    }
    if (testTypeId == 1 || testTypeId == 2) {
        if (fg.get('usualCallDuration').value == null || fg.get('usualCallDuration').value < 1) {
            fg.get('usualCallDuration').setErrors({ 'incorrect': true });
        }
        if (fg.get('usualCallWaitTime').value == null || fg.get('usualCallWaitTime').value < 1) {
            fg.get('usualCallWaitTime').setErrors({ 'incorrect': true });
        }
        if (fg.get('usualCallNumber').value == null) {
            fg.get('usualCallNumber').setErrors({ 'incorrect': true });
        }
    }
    if (testTypeId == 2) { //MosCall
        //check upload /Download DropDown
        if (fg.get('testDataTypeId').value == null || fg.get('testDataTypeId').value == 0) {
            fg.get('testDataTypeId').setErrors({ 'incorrect': true });
        }
        //check DataServerUrl
        if (fg.get('testDataServer').value == null || fg.get('testDataServer').value == "") {
            fg.get('testDataServer').setErrors({ 'incorrect': true });
        }
    }
    if (testTypeId == 4) { //Data
        if (fg.get('testDataId').value == null || fg.get('testDataId').value <= 0) {
            fg.get('testDataId').setErrors({ 'incorrect': true });
        }
        if (fg.get('testDataServer').value == null || fg.get('testDataServer').value == "") {
            fg.get('testDataServer').setErrors({ 'incorrect': true });
        }
        if (fg.get('testDataId').value == 1) { //Ftp
            if (fg.get('testDataTypeId').value == null || fg.get('testDataTypeId').value == 0) {
                fg.get('testDataTypeId').setErrors({ 'incorrect': true });
            }
            if (fg.get('testDataUserName').value == null || fg.get('testDataUserName').value == "") {
                fg.get('testDataUserName').setErrors({ 'incorrect': true });
            }
            if (fg.get('testDataPassword').value == null || fg.get('testDataPassword').value == "") {
                fg.get('testDataPassword').setErrors({ 'incorrect': true });
            }
        }
        if (fg.get('testDataId').value == 2) { //Http
            if (fg.get('testDataTypeId').value == null || fg.get('testDataTypeId').value == 0) {
                fg.get('testDataTypeId').setErrors({ 'incorrect': true });
            }
            if (fg.get('testDataUploadFileSize').value == null || fg.get('testDataUploadFileSize').value == "") {
                fg.get('testDataUploadFileSize').setErrors({ 'incorrect': true });
            }
            // if (fg.get('testDataDownloadFileAddress').value == null || fg.get('testDataDownloadFileAddress').value == "") {
            //     fg.get('testDataDownloadFileAddress').setErrors({ 'incorrect': true });
            // }
            // if(fg.get('testDataTypeId').value == 2) { //Uploads
            //     //fileSize Check
            //     if( 100 > fg.get('testDataUploadFileSize').value  && fg.get('testDataUploadFileSize').value > 1000000){
            //         fg.get('ttl').setErrors({ 'fileSizeRang': true });
            //     }
            // }
        }
        if (fg.get('testDataId').value == 3) { //ping
            if (fg.get('numberOfPings').value == null || fg.get('numberOfPings').value < 1 || fg.get('numberOfPings').value > 100) {
                fg.get('numberOfPings').setErrors({ 'incorrect': true });
            }
            if (fg.get('packetSize').value == null || fg.get('packetSize').value < 4 || fg.get('packetSize').value > 188) {
                fg.get('packetSize').setErrors({ 'incorrect': true });
            }
            if (fg.get('internalTime').value == null || fg.get('internalTime').value < 1 || fg.get('internalTime').value > 20) {
                fg.get('internalTime').setErrors({ 'incorrect': true });
            }
            if (fg.get('responseWaitTime').value == null || fg.get('responseWaitTime').value < 10 || fg.get('responseWaitTime').value > 100) {
                fg.get('responseWaitTime').setErrors({ 'incorrect': true });
            }
            if (fg.get('ttl').value == null || fg.get('ttl').value < 16 || fg.get('ttl').value > 255) {
                fg.get('ttl').setErrors({ 'incorrect': true });
            }
            if (fg.get('ipTypeId').value == null || fg.get('ipTypeId').value < 1) {
                fg.get('ipTypeId').setErrors({ 'incorrect': true });
            }
        }
        if (fg.get('testDataId').value == 4) { //TraceRoute
            if (fg.get('traceRouteHubCount').value == null || fg.get('traceRouteHubCount').value < 1) {
                fg.get('traceRouteHubCount').setErrors({ 'incorrect': true });
            }
        }
    }
    //Check Upload FileSize only Upload Data Test
    if (testTypeId != 4) { //only Data Test
        //fg.get('testDataUploadFileSize').setErrors(null);
    }
    else if (testTypeId == 4) {
        if (fg.get('testDataId').value != 2) { //Only Http In Data Test
            //fg.get('testDataUploadFileSize').setErrors(null);
        }
        else {
            fg.get('testDataId').value == 2;
            if (fg.get('testDataTypeId').value != 2) { //Only Upload 
                //fg.get('testDataUploadFileSize').setErrors(null);
            }
        }
    }
    //End Check
    if (testTypeId == 5) {
        if (fg.get('ottServiceId').value == null || fg.get('ottServiceId').value < 1) {
            fg.get('ottServiceId').setErrors({ 'incorrect': true });
        }
        if (fg.get('ottServiceTestId').value == null || fg.get('ottServiceTestId').value < 1) {
            fg.get('ottServiceTestId').setErrors({ 'incorrect': true });
        }
    }
    if (repeatTypeId == 2) {
        if (fg.get('repeatTime').value == null) {
            fg.get('repeatTime').setErrors({ 'incorrect': true });
        }
    }
    if (repeatTypeId == 3) {
        if (fg.get('repeatCount').value == null) {
            fg.get('repeatCount').setErrors({ 'incorrect': true });
        }
    }
};
//این متد حداقل و حداکثر فایل آپلودی را چک میکد
//سایز فایل برحسب کیلو بایت می باشد
function fileSizeRangValidator(min, max) {
    return (control) => {
        if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
            return { 'fileSizeRang': true };
        }
        return null;
    };
}
let DefinedTestEditComponent = class DefinedTestEditComponent {
    constructor(_http, _fb, _avRoute, _router, baseUrl) {
        this._http = _http;
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._router = _router;
        this.showloader = false;
        this.formTitle = 'Create';
        this.myAppUrl = '';
        this.testDataDirectionIdOptionValue = 1;
        this.logFilePartitionTypeCheckValue = 1;
        this.breadcroumb = 'CreateTest';
        this.testTitle = '';
        const ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
        const reg = '((https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?)|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
        if (this._avRoute.snapshot.params['id']) {
            this.id = this._avRoute.snapshot.params['id'];
        }
        this.myAppUrl = baseUrl;
        this.getConfigList('repeatType')
            .subscribe((data) => { this.repeatTypeList = data; });
        this.getConfigList('testType')
            .subscribe((data) => { this.testTypeList = data; });
        this.getConfigList('testData')
            .subscribe((data) => { this.testDataList = data; });
        this.getConfigList('testDataType')
            .subscribe((data) => { this.testDataTypeList = data; });
        this.getConfigList('oTTService')
            .subscribe((data) => { this.oTTServiceList = data; });
        this.getConfigList('oTTServiceTest')
            .subscribe((data) => { this.oTTServiceTestList = data; });
        this.getConfigList('network')
            .subscribe((data) => { this.networkList = data; });
        this.getConfigList('band')
            .subscribe((data) => { this.bandList = data; });
        this.getConfigList('logFilePartitionType')
            .subscribe((data) => { this.logFilePartitionTypeList = data; });
        this.getConfigList('iPType')
            .subscribe((data) => { this.iPTypeList = data; });
        function validateIsSpouse(group) {
            let maritalStatus = group.get('maritalStatus').value;
            if (maritalStatus == "01") {
                return { isRequired: true };
            }
            return null;
        }
        this.definedTestForm = this._fb.group({
            id: 0,
            title: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, this.validateUniqueTitle.bind(this)],
            isActive: true,
            layer3Messages: [false],
            repeatTypeId: [1, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(1)]],
            repeatTime: [],
            repeatCount: [],
            measurementInterval: [5, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(2), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            testTypeId: [1, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            networkId: [2, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(1), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            bandId: [0, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            usualCallDuration: [],
            usualCallWaitTime: [],
            usualCallNumber: [''],
            testDataTypeId: [0],
            testDataId: [],
            testDataServer: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(reg)]],
            testDataUserName: [],
            testDataPassword: [],
            numberOfPings: [],
            packetSize: [],
            internalTime: [],
            responseWaitTime: [],
            ttl: [],
            ipTypeId: [1],
            testDataDownloadFileAddress: [],
            testDataUploadFileSize: [20, [fileSizeRangValidator(0.1, 1000)]],
            ottServiceId: [0],
            ottServiceTestId: [],
            saveLogFile: [false],
            logFilePartitionTypeId: [],
            logFilePartitionTime: [600],
            logFilePartitionSize: [20],
            logFileHoldTime: [240],
            traceRouteHubCount: [],
            repeatTypeTitle: [''],
            testTypeTitle: [''],
            testDataTypeTitle: [''],
            ottServiceTitle: [''],
            ottServiceTestTitle: [''],
            networkTitle: [''],
            bandTitle: [''],
            logFilePartitionTypeTitle: [''],
            ipTypeTitle: [''],
            editable: [true],
        }, { validators: MyAwesomeRangeValidator });
        this.saveLogFileCheckValue = this.definedTestForm.get('saveLogFile').value;
        if (this.id > 0) {
            this.formTitle = 'Edit';
            this.breadcroumb = 'EditTest';
            this.showloader = true;
            this.getDefinedTestById(this.id)
                .subscribe((response) => {
                this.testTitle = response['title'];
                this.Editable = response['editable'];
                this.testDataIdOptionValue = response['testDataId'];
                this.testDataDirectionIdOptionValue = response['testDataTypeId'];
                this.definedTestForm.setValue(response);
                this.ottServiceTestIdOption = 1;
                this.showloader = false;
            }, error => console.error(error));
        }
        ;
    }
    ngOnInit() { }
    onOptionsSelected(value) {
        //console.log("the selected value is " + value['target']['selectedIndex']);
        var selectedtestDataId = this.testDataIdOptionValue = value['target']['selectedIndex'];
        this.definedTestForm.get('testDataServer').setValue(null);
        this.definedTestForm.get('numberOfPings').setValue(null);
        this.definedTestForm.get('packetSize').setValue(null);
        this.definedTestForm.get('internalTime').setValue(null);
        this.definedTestForm.get('responseWaitTime').setValue(null);
        this.definedTestForm.get('ttl').setValue(null);
        this.definedTestForm.get('traceRouteHubCount').setValue(null);
        if (selectedtestDataId == 3) {
            this.definedTestForm.get('testDataServer').setValue('www.google.com');
            this.definedTestForm.get('numberOfPings').setValue(4);
            this.definedTestForm.get('packetSize').setValue(64);
            this.definedTestForm.get('internalTime').setValue(20);
            this.definedTestForm.get('responseWaitTime').setValue(100);
            this.definedTestForm.get('ttl').setValue(255);
            this.definedTestForm.get('ipTypeId').setValue(1);
        }
        if (selectedtestDataId == 4) {
            this.definedTestForm.get('traceRouteHubCount').setValue(10);
            this.definedTestForm.get('testDataServer').setValue('www.google.com');
        }
    }
    onDirectionSelected(value) {
        this.testDataDirectionIdOptionValue = value['target']['selectedIndex'];
        if (this.testDataDirectionIdOptionValue == 2) { //Upload Selected
            this.definedTestForm.get('testDataServer').setValue('185.192.112.74');
        }
        else { //Download Selected
            this.definedTestForm.get('testDataServer').setValue(null);
        }
        //In MosCall Test
        if (this.testTypeId.value == 2) {
            if (value["target"]["selectedIndex"] == 1) { //downlink
                this.definedTestForm.get('usualCallNumber').setValue("02186121407");
            }
            if (value["target"]["selectedIndex"] == 2) { //uplink
                this.definedTestForm.get('usualCallNumber').setValue("02186121406");
            }
        }
    }
    onTestTypeOptionsSelected(value) {
        var selectedTestTypeId = value['target']['selectedIndex'];
        this.definedTestForm.get('usualCallDuration').setValue(null);
        this.definedTestForm.get('usualCallWaitTime').setValue(null);
        this.definedTestForm.get('usualCallNumber').setValue(null);
        this.definedTestForm.get('saveLogFile').setValue(false);
        this.definedTestForm.get('testDataServer').setValue(null);
        if (selectedTestTypeId == 1 /*call*/) {
            this.definedTestForm.get('usualCallDuration').setValue(45);
            this.definedTestForm.get('usualCallWaitTime').setValue(5);
            this.definedTestForm.get('usualCallNumber').setValue("982181713999");
            this.definedTestForm.get('saveLogFile').setValue(true);
        }
        if (selectedTestTypeId == 2 /*Moscall*/) {
            this.definedTestForm.get('testDataId').setValue(0); //TransferType
            this.definedTestForm.get('testDataTypeId').setValue(0); //TransferDirection
            this.definedTestForm.get('usualCallDuration').setValue(20);
            this.definedTestForm.get('usualCallWaitTime').setValue(10);
            this.definedTestForm.get('usualCallNumber').setValue("02186121407");
            this.definedTestForm.get('saveLogFile').setValue(false);
        }
        if (selectedTestTypeId == 3 /*Idle*/) {
            this.definedTestForm.get('saveLogFile').setValue(true);
            this.definedTestForm.get('usualCallDuration').setValue(45);
            this.definedTestForm.get('usualCallNumber').setValue("02181713999");
            this.definedTestForm.get('usualCallWaitTime').setValue(5);
        }
        if (selectedTestTypeId == 4 /*data*/) {
            this.definedTestForm.get('testDataId').setValue(0); //TransferType
            this.definedTestForm.get('testDataTypeId').setValue(0); //TransferDirection
        }
    }
    save() {
        if (!this.definedTestForm.valid) {
            return;
        }
        /** هر مسیری کاربر وارد کند در حالت آپلود توکن
         * Upload
         * به ابتدای
         * TestDataDownloadFileAddress
         * اضافه خواهد شد. چون اکشن آپلود فایل می باشد.
         */
        if (this.definedTestForm.value.usualCallNumber) {
            this.definedTestForm.get('usualCallNumber').setValue(this.definedTestForm.value.usualCallNumber.toString());
        }
        if (this.definedTestForm.get('testDataDownloadFileAddress').value != null &&
            ((this.definedTestForm.get('testTypeId').value == 4 && /*Data */
                this.definedTestForm.get('testDataId').value == 2 && /*Http */
                this.definedTestForm.get('testDataTypeId').value == 2) /*Upload*/)) {
            var curvar = this.definedTestForm.get('testDataDownloadFileAddress').value;
            if (curvar == "" || curvar == null) {
                this.definedTestForm.get('testDataDownloadFileAddress').setValue('Uploads/');
            }
            else {
                curvar = curvar.replace('/', '').replace('\\', ''); //اگر کاربر ، کاراکتر وارد کرده بود، حذف شود
                this.definedTestForm.get('testDataDownloadFileAddress').setValue('Uploads/' + curvar);
            }
        }
        if (this.definedTestForm.get('testTypeId').value == 2 /*moscall */) {
            //در تست موس کال در نهایت یک فایل بر روی سرور آپلود میشود
            // if(this.definedTestForm.get('testDataTypeId').value==2)/**Upload */ {
            var curvar = this.definedTestForm.get('testDataDownloadFileAddress').value;
            if (curvar == "" || curvar == null) {
                this.definedTestForm.get('testDataDownloadFileAddress').setValue('Uploads/');
            }
            else {
                curvar = curvar.replace('/', '').replace('\\', ''); //اگر کاربر ، کاراکتر وارد کرده بود، حذف شود
                this.definedTestForm.get('testDataDownloadFileAddress').setValue('Uploads/' + curvar);
            }
            //}
        }
        if (this.formTitle === 'Create') {
            this.saveMachine(this.definedTestForm.value)
                .subscribe(() => {
                this._router.navigate(['/Test']);
            }, error => console.log(error));
        }
        else if (this.formTitle === 'Edit') {
            this.updateMachine(this.definedTestForm.value)
                .subscribe(() => {
                this._router.navigate(['/Test']);
            }, error => console.error(error));
        }
    }
    cancel() {
        this._router.navigate(['/Test']);
    }
    getDefinedTestById(id) {
        return this._http.get(this.myAppUrl + 'api/DefinedTest/Details/' + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    saveMachine(definedTest) {
        return this._http.post(this.myAppUrl + 'api/DefinedTest/Create', definedTest)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    updateMachine(definedTest) {
        return this._http.put(this.myAppUrl + 'api/DefinedTest/Edit', definedTest)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    getConfigList(configName) {
        return this._http.get(this.myAppUrl + 'api/Config/GetConfigDatas/' + configName)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    validateUniqueTitle(control) {
        return this._http.get(this.myAppUrl + 'api/DefinedTest/CheckTitle?title=' + control.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            if (this.formTitle != 'Edit') {
                if (response['id'] > 0) {
                    return { titleExist: true };
                }
                else {
                    return null;
                }
            }
            else { //this.formTitle=='Edit'
                if (response['id'] > 0) { // object from server Exist
                    if (response['id'] == this.id) { //id from api equal by selectedRow Id
                        return null;
                    }
                    else {
                        return { titleExist: true };
                    }
                }
            }
        }));
    }
    get title() { return this.definedTestForm.get('title'); }
    get isActive() { return this.definedTestForm.get('isActive'); }
    get layer3Messages() { return this.definedTestForm.get('layer3Messages'); }
    get repeatTypeId() { return this.definedTestForm.get('repeatTypeId'); }
    get repeatTime() { return this.definedTestForm.get('repeatTime'); }
    get repeatCount() { return this.definedTestForm.get('repeatCount'); }
    get measurementInterval() { return this.definedTestForm.get('measurementInterval'); }
    get testTypeId() { return this.definedTestForm.get('testTypeId'); }
    get usualCallDuration() { return this.definedTestForm.get('usualCallDuration'); }
    get usualCallWaitTime() { return this.definedTestForm.get('usualCallWaitTime'); }
    get usualCallNumber() { return this.definedTestForm.get('usualCallNumber'); }
    get testDataId() { return this.definedTestForm.get('testDataId'); }
    get testDataTypeId() { return this.definedTestForm.get('testDataTypeId'); }
    get testDataServer() { return this.definedTestForm.get('testDataServer'); }
    get testDataUserName() { return this.definedTestForm.get('testDataUserName'); }
    get testDataPassword() { return this.definedTestForm.get('testDataPassword'); }
    get testDataDownloadFileAddress() { return this.definedTestForm.get('testDataDownloadFileAddress'); }
    get testDataUploadFileSize() { return this.definedTestForm.get('testDataUploadFileSize'); }
    get ipTypeId() { return this.definedTestForm.get('ipTypeId'); }
    get ottServiceId() { return this.definedTestForm.get('ottServiceId'); }
    get ottServiceTestId() { return this.definedTestForm.get('oTTServiceTestId'); }
    get networkId() { return this.definedTestForm.get('networkId'); }
    get bandId() { return this.definedTestForm.get('bandId'); }
    get saveLogFile() { return this.definedTestForm.get('saveLogFile'); }
    get logFilePartitionTypeId() { return this.definedTestForm.get('logFilePartitionTypeId'); }
    get logFilePartitionTime() { return this.definedTestForm.get('logFilePartitionTime'); }
    get logFilePartitionSize() { return this.definedTestForm.get('logFilePartitionSize'); }
    get logFileHoldTime() { return this.definedTestForm.get('logFileHoldTime'); }
    get numberOfPings() { return this.definedTestForm.get('numberOfPings'); }
    get packetSize() { return this.definedTestForm.get('packetSize'); }
    get internalTime() { return this.definedTestForm.get('internalTime'); }
    get responseWaitTime() { return this.definedTestForm.get('responseWaitTime'); }
    get ttl() { return this.definedTestForm.get('ttl'); }
    get TraceRouteHubCount() { return this.definedTestForm.get('traceRouteHubCount'); }
};
DefinedTestEditComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: ['BASE_URL',] }] }
];
DefinedTestEditComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-edit-defined-test',
        template: __webpack_require__(/*! raw-loader!./definedTestEdit.component.html */ "./node_modules/raw-loader/index.js!./src/app/test/definedTestEdit/definedTestEdit.component.html"),
        styles: [__webpack_require__(/*! ./definedTestEdit.component.css */ "./src/app/test/definedTestEdit/definedTestEdit.component.css")]
    }),
    __param(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('BASE_URL')),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], String])
], DefinedTestEditComponent);



/***/ }),

/***/ "./src/app/test/definedTestGroupAssignment/definedTestGroupAssignment.component.css":
/*!******************************************************************************************!*\
  !*** ./src/app/test/definedTestGroupAssignment/definedTestGroupAssignment.component.css ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".leftAlign {\r\n  text-align: left;\r\n}\r\n\r\n.gridbutton {\r\n  margin: 1px 2px;\r\n}\r\n\r\n.gridIcon {\r\n  font-size: 20px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVzdC9kZWZpbmVkVGVzdEdyb3VwQXNzaWdubWVudC9kZWZpbmVkVGVzdEdyb3VwQXNzaWdubWVudC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakIiLCJmaWxlIjoic3JjL2FwcC90ZXN0L2RlZmluZWRUZXN0R3JvdXBBc3NpZ25tZW50L2RlZmluZWRUZXN0R3JvdXBBc3NpZ25tZW50LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGVmdEFsaWduIHtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcblxyXG4uZ3JpZGJ1dHRvbiB7XHJcbiAgbWFyZ2luOiAxcHggMnB4O1xyXG59XHJcblxyXG4uZ3JpZEljb24ge1xyXG4gIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/test/definedTestGroupAssignment/definedTestGroupAssignment.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/test/definedTestGroupAssignment/definedTestGroupAssignment.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: DefinedTestGroupAssignmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefinedTestGroupAssignmentComponent", function() { return DefinedTestGroupAssignmentComponent; });
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm2015/sort.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm2015/table.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm2015/paginator.js");
/* harmony import */ var _Shared_services_Language_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Shared/services/Language.service */ "./src/app/Shared/services/Language.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








let DefinedTestGroupAssignmentComponent = class DefinedTestGroupAssignmentComponent {
    constructor(_http, _avRoute, langService, baseUrl) {
        this._http = _http;
        this._avRoute = _avRoute;
        this.langService = langService;
        this.displayedColumns = ['index', 'definedTestTitle', 'testTypeTitle', 'beginDate', 'endDate' /*, 'status'*/, 'actions'];
        this.FormTitle = 'Edit';
        this.filter = '';
        this.myAppUrl = '';
        this.canEdit = true;
        if (this._avRoute.snapshot.params['id']) {
            this.groupId = this._avRoute.snapshot.params['id'];
            this.groupTitle = this._avRoute.snapshot.params['Title'];
        }
        this.myAppUrl = baseUrl;
        this.getDefinedTests(this.groupId);
    }
    getDefinedTests(id) {
        this._http.get(this.myAppUrl + 'api/MachineGroup/IndexWithDefinedTest/' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        })).subscribe((data) => {
            this.definedTestMachineGroupList = data;
            this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_5__["MatTableDataSource"](data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
    applyFilter(event) {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
};
DefinedTestGroupAssignmentComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _Shared_services_Language_service__WEBPACK_IMPORTED_MODULE_7__["LanguageService"] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: ['BASE_URL',] }] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"], { static: true }),
    __metadata("design:type", _angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"])
], DefinedTestGroupAssignmentComponent.prototype, "paginator", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material_sort__WEBPACK_IMPORTED_MODULE_0__["MatSort"], { static: true }),
    __metadata("design:type", _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__["MatSort"])
], DefinedTestGroupAssignmentComponent.prototype, "sort", void 0);
DefinedTestGroupAssignmentComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-defined-test-group-assignment',
        template: __webpack_require__(/*! raw-loader!./definedTestGroupAssignment.component.html */ "./node_modules/raw-loader/index.js!./src/app/test/definedTestGroupAssignment/definedTestGroupAssignment.component.html"),
        styles: [__webpack_require__(/*! ./definedTestGroupAssignment.component.css */ "./src/app/test/definedTestGroupAssignment/definedTestGroupAssignment.component.css")]
    }),
    __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])('BASE_URL')),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _Shared_services_Language_service__WEBPACK_IMPORTED_MODULE_7__["LanguageService"], String])
], DefinedTestGroupAssignmentComponent);



/***/ }),

/***/ "./src/app/test/definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component.css":
/*!**************************************************************************************************!*\
  !*** ./src/app/test/definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component.css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Rlc3QvZGVmaW5lZFRlc3RHcm91cEFzc2lnbm1lbnRFZGl0L2RlZmluZWRUZXN0R3JvdXBBc3NpZ25tZW50RWRpdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/test/definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/test/definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: DefinedTestGroupAssignmentEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefinedTestGroupAssignmentEditComponent", function() { return DefinedTestGroupAssignmentEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var _Shared_services_NgbDatepickerI18nPersian__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Shared/services/NgbDatepickerI18nPersian */ "./src/app/Shared/services/NgbDatepickerI18nPersian.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









let DefinedTestGroupAssignmentEditComponent = class DefinedTestGroupAssignmentEditComponent {
    //defaultTime: NgbTimeStruct;
    constructor(_http, _fb, _avRoute, _router, baseUrl, toastrService, translate) {
        this._http = _http;
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._router = _router;
        this.toastrService = toastrService;
        this.translate = translate;
        this.showloader = false;
        this.formTitle = 'Create';
        this.myAppUrl = '';
        this.id = 0;
        //defaultDate: NgbDateStruct;
        this.breadcroumb = 'AssignTestToGroup';
        this.ReplaceTestConfirmMessage = "";
        this.getDefinedTestList().subscribe((data) => {
            this.definedTestList = data;
        });
        this.definedTestGroupForm = this._fb.group({
            id: 0,
            definedTestId: [0, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(1)]],
            isActive: [true, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            machineGroupId: [0],
            beginDate: [, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            endDate: [, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            sim: [0, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(1)]],
            beginDateTime: [/*this.defaultTime*/ , _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            endDateTime: [/*this.defaultTime*/ , _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            bDate: [],
            eDate: []
        });
        if (this._avRoute.snapshot.params['id']) {
            if (this._avRoute.snapshot.params['id'].indexOf(',') == -1) {
                this.machineGroupId = this._avRoute.snapshot.params['id'];
                this.GroupTitle = this._avRoute.snapshot.params['Title'];
            }
            else {
                this.machineGroupId = this._avRoute.snapshot.params['id'].split(",")[0];
                this.id = this._avRoute.snapshot.params['id'].split(",")[1];
                this.GroupTitle = this._avRoute.snapshot.params['Title'];
            }
            if (this.id > 0) {
                this.formTitle = 'Edit';
                this.breadcroumb = 'EditGroupTest';
                this.showloader = true;
                this.getDefinedTestGroupById(this.id)
                    .subscribe((response) => {
                    //this.definedTestGroupForm.setValue(response[0]);
                    this.definedTestGroupForm.controls['id'].setValue(response["id"]);
                    this.definedTestGroupForm.controls['definedTestId'].setValue(response["definedTestId"]);
                    this.definedTestGroupForm.controls['isActive'].setValue(response["isActive"]);
                    this.definedTestGroupForm.controls['machineGroupId'].setValue(response["machineGroupId"]);
                    this.definedTestGroupForm.controls['sim'].setValue(response["sim"]);
                    this.definedTestGroupForm.controls['beginDate'].setValue(response["bDate"]);
                    this.definedTestGroupForm.controls['endDate'].setValue(response["eDate"]);
                    var bdate = new Date(response["bDate"]);
                    var btime = ('00' + bdate.getHours()).substr(-2) + ":" + ('00' + bdate.getMinutes()).substr(-2);
                    this.definedTestGroupForm.controls['beginDateTime'].setValue(btime);
                    var edate = new Date(response["eDate"]);
                    var etime = ('00' + edate.getHours()).substr(-2) + ":" + ('00' + edate.getMinutes()).substr(-2);
                    this.definedTestGroupForm.controls['endDateTime'].setValue(etime);
                    this.showloader = false;
                }, error => console.error(error));
            }
            else {
                //this.definedTestGroupForm.controls['beginDate'].setValue(this.defaultDate);
                //this.definedTestGroupForm.controls['endDate'].setValue(this.defaultDate);
                //this.definedTestGroupForm.controls['beginDateTime'].setValue(this.defaultTime);
                //this.definedTestGroupForm.controls['endDateTime'].setValue(this.defaultTime);
                var defaultDate = new Date();
                var defaultTime = ('00' + defaultDate.getHours()).substr(-2) + ":" + ('00' + defaultDate.getMinutes()).substr(-2);
                //this.definedTestGroupForm.controls['beginDate'].setValue(defaultDate);
                //this.exportForm.controls['endDate'].setValue(defaultDate);
                this.definedTestGroupForm.controls['beginDateTime'].setValue(defaultTime);
                this.definedTestGroupForm.controls['endDateTime'].setValue(defaultTime);
            }
        }
        this.myAppUrl = baseUrl;
    }
    ngOnInit() {
        if (this.id > 0) {
            //this.definedTestGroupForm.get('definedTestId').disable();
            //this.definedTestGroupForm.get('beginDate').disable();
            //this.definedTestGroupForm.get('endDate').disable();
            //this.definedTestGroupForm.get('sim').disable();
            //this.definedTestGroupForm.get('beginDateTime').disable();
            //this.definedTestGroupForm.get('endDateTime').disable();
        }
    }
    getDefinedTestGroupById(id) {
        return this._http.get(this.myAppUrl + 'api/DefinedTestMachineGroup/Details/' + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    cancel() {
        this._router.navigate(['/Test/Group/Assignment/', this.machineGroupId, this.GroupTitle]);
    }
    getDefinedTestList() {
        return this._http.get(this.myAppUrl + 'api/DefinedTest/index/')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    getDefaultDateTime() {
        return this._http.get(this.myAppUrl + 'api/DefinedTestMachineGroup/DefaultDateTime/')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    saveDefinedTestGroup(definedTestGroup) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/Create', definedTestGroup)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    updateDefinedTestGroup(definedTestGroup) {
        return this._http.put(this.myAppUrl + 'api/DefinedTestMachineGroup/Edit', definedTestGroup)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    IsDefinedTestForMachineGroupAndParent(definedTestGroup) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/IsDefinedTestForMachineGroupAndParent', definedTestGroup)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    IsDefinedTestForMachineAndParent(definedTestGroup) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/IsDefinedTestForMachineParent', definedTestGroup)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    DeactivateTestForMachineInGroupAndParent(definedTestGroup) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/DeactivateTestForMachineInGroupAndParent', definedTestGroup)
            .pipe(response => {
            return response;
        });
    }
    DeactivateTestForMachineAndDefinedTestMachineGroup(definedTestGroup) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachineGroup/DeactivateTestForMachineAndDefinedTestMachineGroup', definedTestGroup)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    get definedTestId() { return this.definedTestGroupForm.get('definedTestId'); }
    get isActive() { return this.definedTestGroupForm.get('isActive'); }
    get sim() { return this.definedTestGroupForm.get('sim'); }
    // convenience getter for easy access to form fields
    get f() { return this.definedTestGroupForm.controls; }
    save_Old() {
        if (!this.definedTestGroupForm.valid) {
            return;
        }
        else {
            if (!this.definedTestGroupForm.controls['beginDate'].valid || this.definedTestGroupForm.controls['beginDate'].value == null) {
                this.toastrService.error(this.translate.instant('BeginDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            if (!this.definedTestGroupForm.controls['endDate'].valid || this.definedTestGroupForm.controls['endDate'].value == null) {
                this.toastrService.error(this.translate.instant('EndDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            var TDate = new Date();
            var BDate;
            var EDate;
            if (localStorage.getItem('Language') == 'ar') {
                BDate = this.definedTestGroupForm.controls['beginDate'].value._d;
                EDate = this.definedTestGroupForm.controls['endDate'].value._d;
            }
            else {
                BDate = this.definedTestGroupForm.controls['beginDate'].value;
                EDate = this.definedTestGroupForm.controls['endDate'].value;
            }
            if (BDate) {
                var BOTime = this.definedTestGroupForm.controls['beginDateTime'].value.split(':');
                BDate.setHours(BOTime[0], BOTime[1], 0, 0);
            }
            if (EDate) {
                var EOTime = this.definedTestGroupForm.controls['endDateTime'].value.split(':');
                EDate.setHours(EOTime[0], EOTime[1], 0, 0);
            }
            if (TDate >= BDate) {
                this.toastrService.error(this.translate.instant('BeginDateShouldBeGreaterThanCurrentDate'), this.translate.instant('Error'));
                return;
            }
            if (BDate >= EDate) {
                this.toastrService.error(this.translate.instant('EndDateShouldBeGreaterThanBeginDate'), this.translate.instant('Error'));
                return;
            }
        }
        if (this._avRoute.snapshot.params['id'].indexOf(',') == -1) { //create
            this.definedTestGroupForm.controls['machineGroupId'].setValue(this._avRoute.snapshot.params['id']);
        }
        else {
            this.definedTestGroupForm.controls['machineGroupId'].setValue(this._avRoute.snapshot.params['id'].split(",")[0]);
            this.definedTestGroupForm.controls['id'].setValue(this._avRoute.snapshot.params['id'].split(",")[1]);
            // this.definedTestGroupForm.controls['sim'].setValue(this.definedTestGroupForm.get('sim').value);
            // this.definedTestGroupForm.controls['definedTestId'].setValue(this.definedTestGroupForm.get('definedTestId').value);
        }
        this.showloader = true;
        if (localStorage.getItem('Language') == 'ar') {
            if (this.definedTestGroupForm.controls['beginDate'].value._d == undefined) {
                var temp = new Date(this.definedTestGroupForm.controls['beginDate'].value);
                this.definedTestGroupForm.controls['bDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestGroupForm.controls['bDate'].setValue(this.definedTestGroupForm.controls['beginDate'].value._d.toLocaleDateString());
            if (this.definedTestGroupForm.controls['endDate'].value._d == undefined) {
                var temp = new Date(this.definedTestGroupForm.controls['endDate'].value);
                this.definedTestGroupForm.controls['eDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestGroupForm.controls['eDate'].setValue(this.definedTestGroupForm.controls['endDate'].value._d.toLocaleDateString());
        }
        else {
            if (this.definedTestGroupForm.controls['beginDate'].value.toLocaleDateString == undefined) {
                var temp = new Date(this.definedTestGroupForm.controls['beginDate'].value);
                this.definedTestGroupForm.controls['bDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestGroupForm.controls['bDate'].setValue(this.definedTestGroupForm.controls['beginDate'].value.toLocaleDateString());
            if (this.definedTestGroupForm.controls['endDate'].value.toLocaleDateString == undefined) {
                var temp = new Date(this.definedTestGroupForm.controls['endDate'].value);
                this.definedTestGroupForm.controls['eDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestGroupForm.controls['eDate'].setValue(this.definedTestGroupForm.controls['endDate'].value.toLocaleDateString());
        }
        if (this.formTitle === 'Create') {
            //بررسی وجود تست برای حد اقل یکی از دستگاه های گروه و پدرهای گروه
            //اگر تست وجود داشت نمایش پیغام به کاربر و دریافت تایید برای ذخیره
            //اگر کاربر تایید کرد متد ذخیره را فراخوانی می کنیم
            this.IsDefinedTestForMachineGroupAndParent(this.definedTestGroupForm.value)
                .subscribe((result) => {
                this.showloader = false;
                if (result == 0) {
                    this.showloader = true;
                    //بررسی وجود تست انفرادی برای همه دستگاه های گروه
                    this.IsDefinedTestForMachineAndParent(this.definedTestGroupForm.value)
                        .subscribe((mustBeDeactivateTestNumber) => {
                        this.showloader = true;
                        if (mustBeDeactivateTestNumber == 0) {
                            this.saveDefinedTestGroup(this.definedTestGroupForm.value)
                                .subscribe(() => {
                                this.showloader = false;
                                this._router.navigate(['/Test/Group/Assignment/' + this.machineGroupId, this.GroupTitle]);
                            }, error => console.error(error));
                        }
                        else {
                            this.showloader = false;
                            $('#modal-default').modal('show');
                            this.ReplaceTestConfirmMessage = this.translate.instant('InterferenceTestDateRangeConfirmMessage');
                        }
                    });
                }
                else {
                    this.showloader = false;
                    $('#modal-default').modal('show');
                    this.ReplaceTestConfirmMessage = this.translate.instant('InterferenceGroupTestDateRangeConfirmMessage');
                }
            }, error => console.error(error));
        }
        else if (this.formTitle === 'Edit') {
            this.updateDefinedTestGroup(this.definedTestGroupForm.value)
                .subscribe(() => {
                this.showloader = false;
                this._router.navigate(['/Test/Group/Assignment/' + this.machineGroupId, this.GroupTitle]);
            }, error => console.error(error));
        }
    }
    AcceptConfirm_Old() {
        //فراخانی متد غیرفعال سازی تست های انفرادی و ذخیره تست گروهی
        this.DeactivateTestForMachineAndDefinedTestMachineGroup(this.definedTestGroupForm.value)
            .subscribe(() => {
            $('#modal-default').modal('hide');
            this.showloader = true;
            this._router.navigate(['/Test/Group/Assignment/' + this.machineGroupId, this.GroupTitle]);
        });
    }
    save(reblace) {
        // ToDo :: Mostafa :: edit data validation
        if (!this.definedTestGroupForm.valid) {
            return;
        }
        else {
            if (!this.definedTestGroupForm.controls['beginDate'].valid || this.definedTestGroupForm.controls['beginDate'].value == null) {
                this.toastrService.error(this.translate.instant('BeginDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            if (!this.definedTestGroupForm.controls['endDate'].valid || this.definedTestGroupForm.controls['endDate'].value == null) {
                this.toastrService.error(this.translate.instant('EndDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            var TDate = new Date();
            var BDate;
            var EDate;
            if (localStorage.getItem('Language') == 'ar') {
                BDate = this.definedTestGroupForm.controls['beginDate'].value._d;
                EDate = this.definedTestGroupForm.controls['endDate'].value._d;
            }
            else {
                BDate = this.definedTestGroupForm.controls['beginDate'].value;
                EDate = this.definedTestGroupForm.controls['endDate'].value;
            }
            if (BDate) {
                var BOTime = this.definedTestGroupForm.controls['beginDateTime'].value.split(':');
                BDate.setHours(BOTime[0], BOTime[1], 0, 0);
            }
            if (EDate) {
                var EOTime = this.definedTestGroupForm.controls['endDateTime'].value.split(':');
                EDate.setHours(EOTime[0], EOTime[1], 0, 0);
            }
            if (TDate >= BDate) {
                this.toastrService.error(this.translate.instant('BeginDateShouldBeGreaterThanCurrentDate'), this.translate.instant('Error'));
                return;
            }
            if (BDate >= EDate) {
                this.toastrService.error(this.translate.instant('EndDateShouldBeGreaterThanBeginDate'), this.translate.instant('Error'));
                return;
            }
        }
        if (this._avRoute.snapshot.params['id'].indexOf(',') == -1) { //create
            this.definedTestGroupForm.controls['machineGroupId'].setValue(this._avRoute.snapshot.params['id']);
        }
        else {
            this.definedTestGroupForm.controls['machineGroupId'].setValue(this._avRoute.snapshot.params['id'].split(",")[0]);
            this.definedTestGroupForm.controls['id'].setValue(this._avRoute.snapshot.params['id'].split(",")[1]);
            // this.definedTestGroupForm.controls['sim'].setValue(this.definedTestGroupForm.get('sim').value);
            // this.definedTestGroupForm.controls['definedTestId'].setValue(this.definedTestGroupForm.get('definedTestId').value);
        }
        //فراخوانی  متد ذخیره
        this.saveDefinedTestGroupNia(this.definedTestGroupForm.value, reblace)
            .subscribe((result) => {
            this.showloader = false;
            if (result["succeed"] == true)
                if (result["result"] == true) {
                    $('#modal-default').modal('hide');
                    this._router.navigate(['/Test/Group/Assignment/' + this.machineGroupId, this.GroupTitle]);
                }
                else {
                    $('#modal-default').modal('show');
                    this.ReplaceTestConfirmMessage = this.translate.instant(result["message"]);
                }
            else
                this.toastrService.error(this.translate.instant('DatabaseActionError'), this.translate.instant('Error'));
        });
    }
    AcceptConfirm() {
        this.save(true);
    }
    saveDefinedTestGroupNia(definedTestMachine, reblace) {
        if (!reblace)
            return this._http.post('api/DefinedTestMachineGroup/CreateNia', definedTestMachine);
        else
            return this._http.post('api/DefinedTestMachineGroup/CreateAndDeactiveNia', definedTestMachine);
    }
};
DefinedTestGroupAssignmentEditComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: ['BASE_URL',] }] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"] }
];
DefinedTestGroupAssignmentEditComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-edit-defined-test-group-assignment',
        template: __webpack_require__(/*! raw-loader!./definedTestGroupAssignmentEdit.component.html */ "./node_modules/raw-loader/index.js!./src/app/test/definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component.html"),
        providers: [
            { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbCalendar"], useClass: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbCalendarPersian"] },
            { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbDatepickerI18n"], useClass: _Shared_services_NgbDatepickerI18nPersian__WEBPACK_IMPORTED_MODULE_6__["NgbDatepickerI18nPersian"] }
        ],
        styles: [__webpack_require__(/*! ./definedTestGroupAssignmentEdit.component.css */ "./src/app/test/definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component.css")]
    }),
    __param(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('BASE_URL')),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], String, ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"],
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]])
], DefinedTestGroupAssignmentEditComponent);



/***/ }),

/***/ "./src/app/test/definedTestMachineAssignment/definedTestMachineAssignment.component.css":
/*!**********************************************************************************************!*\
  !*** ./src/app/test/definedTestMachineAssignment/definedTestMachineAssignment.component.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Rlc3QvZGVmaW5lZFRlc3RNYWNoaW5lQXNzaWdubWVudC9kZWZpbmVkVGVzdE1hY2hpbmVBc3NpZ25tZW50LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/test/definedTestMachineAssignment/definedTestMachineAssignment.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/test/definedTestMachineAssignment/definedTestMachineAssignment.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: DefinedTestMachineAssignmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefinedTestMachineAssignmentComponent", function() { return DefinedTestMachineAssignmentComponent; });
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm2015/sort.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm2015/table.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm2015/paginator.js");
/* harmony import */ var _Shared_services_Language_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Shared/services/Language.service */ "./src/app/Shared/services/Language.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









let DefinedTestMachineAssignmentComponent = class DefinedTestMachineAssignmentComponent {
    constructor(_http, _avRoute, langService, baseUrl) {
        this._http = _http;
        this._avRoute = _avRoute;
        this.langService = langService;
        this.displayedColumns = ['index', 'definedTestTitle', 'testTypeTitle', 'beginDate', 'endDate', 'status', 'actions'];
        this.FormTitle = 'Edit';
        this.myAppUrl = '';
        if (this._avRoute.snapshot.params['id']) {
            this.machinId = this._avRoute.snapshot.params['id'];
            this.MachineTitle = this._avRoute.snapshot.params['Title'];
        }
        this.myAppUrl = baseUrl;
        this.getDefinedTests(this.machinId);
        var currentDate = new Date();
        var ngbCurrentDate = { day: currentDate.getUTCDate(), month: currentDate.getUTCMonth() + 1, year: currentDate.getUTCFullYear() };
        var ngbCurrenTime = { hour: currentDate.getUTCHours(), minute: currentDate.getUTCMinutes(), second: currentDate.getUTCSeconds() };
        // this.currentDate = this.calendar.getToday().year+this.calendar.getToday().month+this.calendar.getToday().day+
        //                    currenTime.getHours()+ currenTime.getMinutes() + currenTime.getSeconds(); 
        this.currentDate = ngbCurrentDate.day + ngbCurrentDate.month + ngbCurrentDate.year;
        this.currentTime = ngbCurrenTime.hour + ngbCurrenTime.minute + ngbCurrenTime.second;
    }
    getDefinedTests(id) {
        this._http.get(this.myAppUrl + 'api/Machine/IndexWithDefinedTest/' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((response) => {
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
        })).subscribe((data) => {
            this.definedTestMachineList = data;
            this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
    applyFilter(event) {
        const filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    ngOnInit() { }
};
DefinedTestMachineAssignmentComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _Shared_services_Language_service__WEBPACK_IMPORTED_MODULE_8__["LanguageService"] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: ['BASE_URL',] }] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"], { static: true }),
    __metadata("design:type", _angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"])
], DefinedTestMachineAssignmentComponent.prototype, "paginator", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material_sort__WEBPACK_IMPORTED_MODULE_5__["MatSort"], { static: true }),
    __metadata("design:type", _angular_material_sort__WEBPACK_IMPORTED_MODULE_5__["MatSort"])
], DefinedTestMachineAssignmentComponent.prototype, "sort", void 0);
DefinedTestMachineAssignmentComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-defined-test-machine-assignment',
        template: __webpack_require__(/*! raw-loader!./definedTestMachineAssignment.component.html */ "./node_modules/raw-loader/index.js!./src/app/test/definedTestMachineAssignment/definedTestMachineAssignment.component.html"),
        providers: [
            { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__["NgbCalendar"], useClass: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_0__["NgbCalendarPersian"] }
        ],
        styles: [__webpack_require__(/*! ./definedTestMachineAssignment.component.css */ "./src/app/test/definedTestMachineAssignment/definedTestMachineAssignment.component.css")]
    }),
    __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])('BASE_URL')),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _Shared_services_Language_service__WEBPACK_IMPORTED_MODULE_8__["LanguageService"], String])
], DefinedTestMachineAssignmentComponent);



/***/ }),

/***/ "./src/app/test/definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component.css":
/*!******************************************************************************************************!*\
  !*** ./src/app/test/definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component.css ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Rlc3QvZGVmaW5lZFRlc3RNYWNoaW5lQXNzaWdubWVudEVkaXQvZGVmaW5lZFRlc3RNYWNoaW5lQXNzaWdubWVudEVkaXQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/test/definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/test/definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: DefinedTestMachineAssignmentEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefinedTestMachineAssignmentEditComponent", function() { return DefinedTestMachineAssignmentEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm2015/ng-bootstrap.js");
/* harmony import */ var _Shared_services_NgbDatepickerI18nPersian__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Shared/services/NgbDatepickerI18nPersian */ "./src/app/Shared/services/NgbDatepickerI18nPersian.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm2015/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









let DefinedTestMachineAssignmentEditComponent = class DefinedTestMachineAssignmentEditComponent {
    constructor(_http, _fb, _avRoute, _router, baseUrl, toastrService, translate) {
        this._http = _http;
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._router = _router;
        this.toastrService = toastrService;
        this.translate = translate;
        this.showloader = false;
        this.formTitle = 'Create';
        this.myAppUrl = '';
        this.id = 0;
        //defaultTime: NgbTimeStruct;
        this.breadcroumb = 'TestAssignment';
        this.ReplaceTestConfirmMessage = "";
        if (this._avRoute.snapshot.params['Title']) {
            this.machineTitle = this._avRoute.snapshot.params['Title'];
        }
        this.getDefinedTestList().subscribe((data) => {
            this.definedTestList = data;
        });
        this.definedTestMachineForm = this._fb.group({
            id: 0,
            definedTestId: [0, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(1)]],
            isActive: [true, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            machineId: [0],
            beginDate: [, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            endDate: [, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            sim: [0, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].min(1)]],
            beginDateTime: [/*this.defaultTime*/ , _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            endDateTime: [/*this.defaultTime*/ , _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            bDate: [],
            eDate: [],
        });
        if (this._avRoute.snapshot.params['id']) {
            if (this._avRoute.snapshot.params['id'].indexOf(',') == -1) {
                this.machineId = this._avRoute.snapshot.params['id'];
            }
            else {
                this.machineId = this._avRoute.snapshot.params['id'].split(",")[0];
                this.id = this._avRoute.snapshot.params['id'].split(",")[1]; //Id of groupTest
            }
            //this.defaultDate = data['defaultDate'];
            //this.defaultTime = data['defaultTime'];
            if (this.id > 0) {
                this.formTitle = 'Edit';
                this.breadcroumb = 'EditTest';
                this.showloader = true;
                this.getDefinedTestMachineById(this.id)
                    .subscribe((response) => {
                    //this.definedTestMachineForm.setValue(response);
                    this.definedTestMachineForm.controls['id'].setValue(response["id"]);
                    this.definedTestMachineForm.controls['definedTestId'].setValue(response["definedTestId"]);
                    this.definedTestMachineForm.controls['isActive'].setValue(response["isActive"]);
                    this.definedTestMachineForm.controls['machineId'].setValue(response["machineId"]);
                    this.definedTestMachineForm.controls['sim'].setValue(response["sim"]);
                    this.definedTestMachineForm.controls['beginDate'].setValue(response["bDate"]);
                    this.definedTestMachineForm.controls['endDate'].setValue(response["eDate"]);
                    var bdate = new Date(response["bDate"]);
                    var btime = ('00' + bdate.getHours()).substr(-2) + ":" + ('00' + bdate.getMinutes()).substr(-2);
                    this.definedTestMachineForm.controls['beginDateTime'].setValue(btime);
                    var edate = new Date(response["eDate"]);
                    var etime = ('00' + edate.getHours()).substr(-2) + ":" + ('00' + edate.getMinutes()).substr(-2);
                    this.definedTestMachineForm.controls['endDateTime'].setValue(etime);
                    this.definedTestMachineForm.controls['bDate'].setValue(bdate);
                    this.definedTestMachineForm.controls['eDate'].setValue(edate);
                    this.showloader = false;
                }, error => console.error(error));
            }
            else {
                this.defaultDate = new Date();
                var defaultTime = ('00' + this.defaultDate.getHours()).substr(-2) + ":" + ('00' + this.defaultDate.getMinutes()).substr(-2);
                this.definedTestMachineForm.controls['beginDateTime'].setValue(defaultTime);
                this.definedTestMachineForm.controls['endDateTime'].setValue(defaultTime);
            }
        }
        this.myAppUrl = baseUrl;
    }
    ngOnInit() {
    }
    getDefinedTestMachineById(id) {
        return this._http.get(this.myAppUrl + 'api/DefinedTestMachine/Details/' + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    cancel() {
        this._router.navigate(['/Test/Assignment/Machine/' + this.machineId + "/" + this.machineTitle]);
    }
    getDefinedTests(id) {
        this._http.get(this.myAppUrl + 'api/Machine/IndexWithDefinedTest/' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        })).subscribe((data) => {
            this.definedTestMachineList = data;
        });
    }
    getDefinedTestList() {
        return this._http.get(this.myAppUrl + 'api/DefinedTest/index/')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    getDefaultDateTime() {
        return this._http.get(this.myAppUrl + 'api/DefinedTestMachine/DefaultDateTime/')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    saveDefinedTestMachine(definedTestMachine) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachine/Create', definedTestMachine)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    updateDefinedTestMachine(definedTestMachine) {
        return this._http.put(this.myAppUrl + 'api/DefinedTestMachine/Edit', definedTestMachine)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    IsDefinedTestForMachineByMachineID(definedTestMachine) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachine/IsDefinedTestForMachineByMachineID', definedTestMachine)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    IsDefinedTestForMachineGroupAndParentByMachineID(definedTestMachine) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachine/IsDefinedTestForMachineGroupAndParentByMachineID', definedTestMachine)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    DeactivateTestForMachineGroupAndDefinedTestMachine(definedTestMachine) {
        return this._http.post(this.myAppUrl + 'api/DefinedTestMachine/DeactivateTestForMachineGroupAndDefinedTestMachine', definedTestMachine)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(response => {
            return response;
        }));
    }
    get definedTestId() { return this.definedTestMachineForm.get('definedTestId'); }
    get isActive() { return this.definedTestMachineForm.get('isActive'); }
    get sim() { return this.definedTestMachineForm.get('sim'); }
    // convenience getter for easy access to form fields
    get f() { return this.definedTestMachineForm.controls; }
    save_Old() {
        if (!this.definedTestMachineForm.valid) {
            return;
        }
        else if (this.definedTestMachineForm.valid) { //addby omid for ignore check DateTime validation
            if (!this.definedTestMachineForm.controls['beginDate'].valid ||
                this.definedTestMachineForm.controls['beginDate'].value == null) {
                this.toastrService.error(this.translate.instant('BeginDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            if (!this.definedTestMachineForm.controls['endDate'].valid || this.definedTestMachineForm.controls['endDate'].value == null) {
                this.toastrService.error(this.translate.instant('EndDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            var TDate = new Date();
            var BDate;
            var EDate;
            if (localStorage.getItem('Language') == 'ar') {
                BDate = this.definedTestMachineForm.controls['beginDate'].value._d;
                EDate = this.definedTestMachineForm.controls['endDate'].value._d;
            }
            else {
                BDate = this.definedTestMachineForm.controls['beginDate'].value;
                EDate = this.definedTestMachineForm.controls['endDate'].value;
            }
            if (BDate) {
                var BOTime = this.definedTestMachineForm.controls['beginDateTime'].value.split(':');
                BDate.setHours(BOTime[0], BOTime[1], 0, 0);
            }
            if (EDate) {
                var EOTime = this.definedTestMachineForm.controls['endDateTime'].value.split(':');
                EDate.setHours(EOTime[0], EOTime[1], 0, 0);
            }
            if (TDate >= BDate) {
                this.toastrService.error(this.translate.instant('BeginDateShouldBeGreaterThanCurrentDate'), this.translate.instant('Error'));
                return;
            }
            if (BDate >= EDate) {
                this.toastrService.error(this.translate.instant('EndDateShouldBeGreaterThanBeginDate'), this.translate.instant('Error'));
                return;
            }
        }
        if (this._avRoute.snapshot.params['id'].indexOf(',') == -1) {
            this.definedTestMachineForm.controls['machineId'].setValue(this._avRoute.snapshot.params['id']);
        }
        else {
            this.definedTestMachineForm.controls['machineId'].setValue(this._avRoute.snapshot.params['id'].split(",")[0]);
            this.definedTestMachineForm.controls['id'].setValue(this._avRoute.snapshot.params['id'].split(",")[1]);
        }
        this.showloader = true;
        if (localStorage.getItem('Language') == 'ar') {
            if (this.definedTestMachineForm.controls['beginDate'].value._d == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['beginDate'].value);
                this.definedTestMachineForm.controls['bDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['bDate'].setValue(this.definedTestMachineForm.controls['beginDate'].value._d.toLocaleDateString());
            if (this.definedTestMachineForm.controls['endDate'].value._d == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['endDate'].value);
                this.definedTestMachineForm.controls['eDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['eDate'].setValue(this.definedTestMachineForm.controls['endDate'].value._d.toLocaleDateString());
        }
        else {
            if (this.definedTestMachineForm.controls['beginDate'].value.toLocaleDateString == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['beginDate'].value);
                this.definedTestMachineForm.controls['bDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['bDate'].setValue(this.definedTestMachineForm.controls['beginDate'].value.toLocaleDateString());
            if (this.definedTestMachineForm.controls['endDate'].value.toLocaleDateString == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['endDate'].value);
                this.definedTestMachineForm.controls['eDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['eDate'].setValue(this.definedTestMachineForm.controls['endDate'].value.toLocaleDateString());
        }
        if (this.formTitle === 'Create') {
            //بررسی وجود تست گروهی برای گروه و پدرهای گروه دستگاه
            //اگر تست گروهی وجود داشت با نمایش پیغام به کاربر و دریافت تایید جایگزینی تست جدید
            //متد ذخیره را فراخوانی می کنیم
            this.IsDefinedTestForMachineGroupAndParentByMachineID(this.definedTestMachineForm.value)
                .subscribe((result) => {
                this.showloader = false;
                if (result == 0) {
                    this.showloader = true;
                    this.IsDefinedTestForMachineByMachineID(this.definedTestMachineForm.value)
                        .subscribe((res) => {
                        this.showloader = true;
                        if (res == 0) {
                            this.saveDefinedTestMachine(this.definedTestMachineForm.value)
                                .subscribe(() => {
                                this.showloader = false;
                                this._router.navigate(['/Test/Assignment/Machine/' + this.machineId + "/" + this.machineTitle]);
                            }, error => console.error(error));
                        }
                        else {
                            this.showloader = false;
                            $('#modal-default').modal('show');
                            this.ReplaceTestConfirmMessage = this.translate.instant('InterferenceTestDateRangeConfirmMessage');
                        }
                    }, error => console.error(error));
                }
                else {
                    this.showloader = false;
                    $('#modal-default').modal('show');
                    this.ReplaceTestConfirmMessage = this.translate.instant('InterferenceTestDateRangeConfirmMessage');
                }
            }, error => console.error(error));
        }
        else if (this.formTitle === 'Edit') {
            this.updateDefinedTestMachine(this.definedTestMachineForm.value)
                .subscribe(() => {
                this.showloader = false;
                this._router.navigate(['/Test/Assignment/Machine/' + this.machineId + "/" + this.machineTitle]);
            }, error => console.error(error));
        }
    }
    AcceptConfirm_Old() {
        //فراخانی متد غیرفعال سازی تست های گروهی و ذخیره تست انفرادی
        this.DeactivateTestForMachineGroupAndDefinedTestMachine(this.definedTestMachineForm.value)
            .subscribe(() => {
            $('#modal-default').modal('hide');
            this.showloader = true;
            this._router.navigate(['/Test/Assignment/Machine/' + this.machineId + "/" + this.machineTitle]);
        });
    }
    save(reblace) {
        // ToDo :: Mostafa :: edit data validation
        if (!this.definedTestMachineForm.valid) {
            return;
        }
        else if (this.definedTestMachineForm.valid) { //addby omid for ignore check DateTime validation
            if (!this.definedTestMachineForm.controls['beginDate'].valid ||
                this.definedTestMachineForm.controls['beginDate'].value == null) {
                this.toastrService.error(this.translate.instant('BeginDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            if (!this.definedTestMachineForm.controls['endDate'].valid || this.definedTestMachineForm.controls['endDate'].value == null) {
                this.toastrService.error(this.translate.instant('EndDateIsRequired'), this.translate.instant('Error'));
                return;
            }
            var TDate = new Date();
            var BDate;
            var EDate;
            if (localStorage.getItem('Language') == 'ar') {
                BDate = this.definedTestMachineForm.controls['beginDate'].value._d;
                EDate = this.definedTestMachineForm.controls['endDate'].value._d;
            }
            else {
                BDate = this.definedTestMachineForm.controls['beginDate'].value;
                EDate = this.definedTestMachineForm.controls['endDate'].value;
            }
            if (BDate) {
                var BOTime = this.definedTestMachineForm.controls['beginDateTime'].value.split(':');
                BDate.setHours(BOTime[0], BOTime[1], 0, 0);
            }
            if (EDate) {
                var EOTime = this.definedTestMachineForm.controls['endDateTime'].value.split(':');
                EDate.setHours(EOTime[0], EOTime[1], 0, 0);
            }
            if (TDate >= BDate) {
                this.toastrService.error(this.translate.instant('BeginDateShouldBeGreaterThanCurrentDate'), this.translate.instant('Error'));
                return;
            }
            if (BDate >= EDate) {
                this.toastrService.error(this.translate.instant('EndDateShouldBeGreaterThanBeginDate'), this.translate.instant('Error'));
                return;
            }
        }
        if (this._avRoute.snapshot.params['id'].indexOf(',') == -1) {
            this.definedTestMachineForm.controls['machineId'].setValue(this._avRoute.snapshot.params['id']);
        }
        else {
            this.definedTestMachineForm.controls['machineId'].setValue(this._avRoute.snapshot.params['id'].split(",")[0]);
            this.definedTestMachineForm.controls['id'].setValue(this._avRoute.snapshot.params['id'].split(",")[1]);
        }
        this.showloader = true;
        if (localStorage.getItem('Language') == 'ar') {
            if (this.definedTestMachineForm.controls['beginDate'].value._d == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['beginDate'].value);
                this.definedTestMachineForm.controls['bDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['bDate'].setValue(this.definedTestMachineForm.controls['beginDate'].value._d.toLocaleDateString());
            if (this.definedTestMachineForm.controls['endDate'].value._d == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['endDate'].value);
                this.definedTestMachineForm.controls['eDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['eDate'].setValue(this.definedTestMachineForm.controls['endDate'].value._d.toLocaleDateString());
        }
        else {
            if (this.definedTestMachineForm.controls['beginDate'].value.toLocaleDateString == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['beginDate'].value);
                this.definedTestMachineForm.controls['bDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['bDate'].setValue(this.definedTestMachineForm.controls['beginDate'].value.toLocaleDateString());
            if (this.definedTestMachineForm.controls['endDate'].value.toLocaleDateString == undefined) {
                var temp = new Date(this.definedTestMachineForm.controls['endDate'].value);
                this.definedTestMachineForm.controls['eDate'].setValue(temp.toLocaleDateString());
            }
            else
                this.definedTestMachineForm.controls['eDate'].setValue(this.definedTestMachineForm.controls['endDate'].value.toLocaleDateString());
        }
        //فراخوانی  متد ذخیره
        this.saveDefinedTestMachineNia(this.definedTestMachineForm.value, reblace)
            .subscribe((result) => {
            this.showloader = false;
            if (result["succeed"] == true)
                if (result["result"] == true) {
                    $('#modal-default').modal('hide');
                    this._router.navigate(['/Test/Assignment/Machine/' + this.machineId + "/" + this.machineTitle]);
                }
                else {
                    $('#modal-default').modal('show');
                    this.ReplaceTestConfirmMessage = this.translate.instant(result["message"]);
                }
            else
                this.toastrService.error(this.translate.instant('DatabaseActionError'), this.translate.instant('Error'));
        });
    }
    AcceptConfirm() {
        this.save(true);
    }
    saveDefinedTestMachineNia(definedTestMachine, reblace) {
        if (!reblace)
            return this._http.post('api/DefinedTestMachine/CreateNia', definedTestMachine);
        else
            return this._http.post('api/DefinedTestMachine/CreateAndDeactiveNia', definedTestMachine);
    }
};
DefinedTestMachineAssignmentEditComponent.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: ['BASE_URL',] }] },
    { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"] }
];
DefinedTestMachineAssignmentEditComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-edit-defined-test-machine-assignment',
        template: __webpack_require__(/*! raw-loader!./definedTestMachineAssignmentEdit.component.html */ "./node_modules/raw-loader/index.js!./src/app/test/definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component.html"),
        providers: [
            { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbCalendar"], useClass: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbCalendarPersian"] },
            { provide: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbDatepickerI18n"], useClass: _Shared_services_NgbDatepickerI18nPersian__WEBPACK_IMPORTED_MODULE_6__["NgbDatepickerI18nPersian"] }
        ],
        styles: [__webpack_require__(/*! ./definedTestMachineAssignmentEdit.component.css */ "./src/app/test/definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component.css")]
    }),
    __param(4, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])('BASE_URL')),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], String, ngx_toastr__WEBPACK_IMPORTED_MODULE_7__["ToastrService"],
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]])
], DefinedTestMachineAssignmentEditComponent);



/***/ }),

/***/ "./src/app/test/test-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/test/test-routing.module.ts ***!
  \*********************************************/
/*! exports provided: TestRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestRoutingModule", function() { return TestRoutingModule; });
/* harmony import */ var _Authority_loginguard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Authority/loginguard */ "./src/app/Authority/loginguard.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _definedTestEdit_definedTestEdit_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./definedTestEdit/definedTestEdit.component */ "./src/app/test/definedTestEdit/definedTestEdit.component.ts");
/* harmony import */ var _definedTestMachineAssignment_definedTestMachineAssignment_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./definedTestMachineAssignment/definedTestMachineAssignment.component */ "./src/app/test/definedTestMachineAssignment/definedTestMachineAssignment.component.ts");
/* harmony import */ var _definedTestGroupAssignment_definedTestGroupAssignment_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./definedTestGroupAssignment/definedTestGroupAssignment.component */ "./src/app/test/definedTestGroupAssignment/definedTestGroupAssignment.component.ts");
/* harmony import */ var _definedTestMachineAssignmentEdit_definedTestMachineAssignmentEdit_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component */ "./src/app/test/definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component.ts");
/* harmony import */ var _definedTestGroupAssignmentEdit_definedTestGroupAssignmentEdit_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component */ "./src/app/test/definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component.ts");
/* harmony import */ var _definedTest_definedTest_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./definedTest/definedTest.component */ "./src/app/test/definedTest/definedTest.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









const routes = [
    {
        path: '',
        children: [
            { path: '', component: _definedTest_definedTest_component__WEBPACK_IMPORTED_MODULE_8__["DefinedTestComponent"], data: { breadcrumb: 'فهرست تست ها ', pageTitle: "فهرست تست ها" } },
            { path: 'Create', component: _definedTestEdit_definedTestEdit_component__WEBPACK_IMPORTED_MODULE_3__["DefinedTestEditComponent"], data: { breadcrumb: 'ایجاد تست ', pageTitle: "فهرست تست ها" } },
            { path: 'edit/:id', component: _definedTestEdit_definedTestEdit_component__WEBPACK_IMPORTED_MODULE_3__["DefinedTestEditComponent"], data: { breadcrumb: 'اصلاح تست ', pageTitle: "فهرست تست ها" } },
            { path: 'Assignment/Machine/:id/:Title', component: _definedTestMachineAssignment_definedTestMachineAssignment_component__WEBPACK_IMPORTED_MODULE_4__["DefinedTestMachineAssignmentComponent"], data: { breadcrumb: 'فهرست تست های دستگاه ', pageTitle: "فهرست تست های دستگاه" } },
            { path: 'Assignment/edit/:id/:Title', component: _definedTestMachineAssignmentEdit_definedTestMachineAssignmentEdit_component__WEBPACK_IMPORTED_MODULE_6__["DefinedTestMachineAssignmentEditComponent"], data: { breadcrumb: 'تخصیص تست به دستگاه ', pageTitle: "تخصیص تست به دستگاه" } },
            { path: 'Assignment/create/:id/:Title', component: _definedTestMachineAssignmentEdit_definedTestMachineAssignmentEdit_component__WEBPACK_IMPORTED_MODULE_6__["DefinedTestMachineAssignmentEditComponent"], data: { breadcrumb: 'اصلاح تست دستگاه ', pageTitle: "اصلاح تست دستگاه" } },
            { path: 'Group/Assignment/:id/:Title', component: _definedTestGroupAssignment_definedTestGroupAssignment_component__WEBPACK_IMPORTED_MODULE_5__["DefinedTestGroupAssignmentComponent"], data: { breadcrumb: 'فهرست تست های گروه ', pageTitle: "فهرست تست های گروه" } },
            { path: 'Group/Assignment/Create/:id/:Title', component: _definedTestGroupAssignmentEdit_definedTestGroupAssignmentEdit_component__WEBPACK_IMPORTED_MODULE_7__["DefinedTestGroupAssignmentEditComponent"], data: { breadcrumb: 'تخصیص تست به گروه ', pageTitle: "تخصیص تست به گروه" } },
            { path: 'Group/Assignment/Edit/:id/:Title', component: _definedTestGroupAssignmentEdit_definedTestGroupAssignmentEdit_component__WEBPACK_IMPORTED_MODULE_7__["DefinedTestGroupAssignmentEditComponent"], data: { breadcrumb: 'اصلاح تست گروه ', pageTitle: "اصلاح تست گروه" } },
        ], canActivate: [_Authority_loginguard__WEBPACK_IMPORTED_MODULE_0__["LoginGruard"]]
    }
];
let TestRoutingModule = class TestRoutingModule {
};
TestRoutingModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], TestRoutingModule);



/***/ }),

/***/ "./src/app/test/test.module.ts":
/*!*************************************!*\
  !*** ./src/app/test/test.module.ts ***!
  \*************************************/
/*! exports provided: TestModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestModule", function() { return TestModule; });
/* harmony import */ var _Shared_shared_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../Shared/shared.modules */ "./src/app/Shared/shared.modules.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _test_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./test-routing.module */ "./src/app/test/test-routing.module.ts");
/* harmony import */ var _definedTest_definedTest_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./definedTest/definedTest.component */ "./src/app/test/definedTest/definedTest.component.ts");
/* harmony import */ var _definedTestEdit_definedTestEdit_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./definedTestEdit/definedTestEdit.component */ "./src/app/test/definedTestEdit/definedTestEdit.component.ts");
/* harmony import */ var _definedTestMachineAssignment_definedTestMachineAssignment_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./definedTestMachineAssignment/definedTestMachineAssignment.component */ "./src/app/test/definedTestMachineAssignment/definedTestMachineAssignment.component.ts");
/* harmony import */ var _definedTestGroupAssignment_definedTestGroupAssignment_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./definedTestGroupAssignment/definedTestGroupAssignment.component */ "./src/app/test/definedTestGroupAssignment/definedTestGroupAssignment.component.ts");
/* harmony import */ var _definedTestMachineAssignmentEdit_definedTestMachineAssignmentEdit_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component */ "./src/app/test/definedTestMachineAssignmentEdit/definedTestMachineAssignmentEdit.component.ts");
/* harmony import */ var _definedTestGroupAssignmentEdit_definedTestGroupAssignmentEdit_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component */ "./src/app/test/definedTestGroupAssignmentEdit/definedTestGroupAssignmentEdit.component.ts");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm2015/datepicker.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/esm2015/progress-bar.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/esm2015/checkbox.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm2015/input.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm2015/form-field.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm2015/icon.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm2015/table.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm2015/paginator.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















let TestModule = class TestModule {
};
TestModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _definedTest_definedTest_component__WEBPACK_IMPORTED_MODULE_4__["DefinedTestComponent"],
            _definedTestEdit_definedTestEdit_component__WEBPACK_IMPORTED_MODULE_5__["DefinedTestEditComponent"],
            _definedTestMachineAssignment_definedTestMachineAssignment_component__WEBPACK_IMPORTED_MODULE_6__["DefinedTestMachineAssignmentComponent"],
            _definedTestGroupAssignment_definedTestGroupAssignment_component__WEBPACK_IMPORTED_MODULE_7__["DefinedTestGroupAssignmentComponent"],
            _definedTestMachineAssignmentEdit_definedTestMachineAssignmentEdit_component__WEBPACK_IMPORTED_MODULE_8__["DefinedTestMachineAssignmentEditComponent"],
            _definedTestGroupAssignmentEdit_definedTestGroupAssignmentEdit_component__WEBPACK_IMPORTED_MODULE_9__["DefinedTestGroupAssignmentEditComponent"],
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _test_routing_module__WEBPACK_IMPORTED_MODULE_3__["TestRoutingModule"],
            _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_11__["MatProgressBarModule"],
            _Shared_shared_modules__WEBPACK_IMPORTED_MODULE_0__["sharedModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__["MatCheckboxModule"],
            _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_10__["MatDatepickerModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInputModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatFormFieldModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__["MatIconModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_16__["MatTableModule"],
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_17__["MatPaginatorModule"]
        ],
    })
], TestModule);



/***/ })

}]);
//# sourceMappingURL=test-test-module-es2015.js.map