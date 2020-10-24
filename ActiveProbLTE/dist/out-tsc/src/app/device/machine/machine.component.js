var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from '../../Shared/services/Language.service';
import { ConfigService } from '../../Shared/services/config.service';
var MachineComponent = /** @class */ (function () {
    function MachineComponent(_http, toastrService, translate, langService, _config) {
        var _this = this;
        this._http = _http;
        this.toastrService = toastrService;
        this.translate = translate;
        this.langService = langService;
        this._config = _config;
        this.showloader = false;
        this.displayedColumns = ['index', 'name', 'identifier', 'machineTypeTitle', 'machineGroupTitle', 'Location', 'imeI1', 'imeI2', 'version', 'status', 'testStatus', 'actions'];
        this.displayedModemColumns = ['index', 'name', 'identifier', 'machineTypeTitle', 'machineGroupTitle', 'Location', 'imeI1', 'iccid', 'version', 'status', 'lastConnectionTime', 'actions'];
        this.filter = '';
        this._config.currentConfigurations.subscribe(function (t) {
            _this.config = t;
        });
        this.getMachines();
    }
    MachineComponent.prototype.ngOnInit = function () {
    };
    MachineComponent.prototype.getMachines = function () {
        var _this = this;
        this.showloader = true;
        this._http.get('api/Machine/Index').subscribe(function (data) {
            _this.dataSource = new MatTableDataSource(data);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort1;
            _this.modemDataSource = new MatTableDataSource(data);
            _this.modemDataSource.paginator = _this.paginator;
            _this.modemDataSource.sort = _this.sort2;
            _this.showloader = false;
        });
    };
    MachineComponent.prototype.deleteConfirm = function (id) {
        this.selectedId = id;
    };
    MachineComponent.prototype.doDelete = function () {
        var _this = this;
        this.showloader = true;
        this._http.delete('api/machine/Delete/' + this.selectedId).pipe(map(function (response) {
            _this.showloader = false;
            if (response == 2) {
                _this.toastrService.error(_this.translate.instant('DatabaseActionError'), _this.translate.instant('Error'));
            }
            return response;
        })).subscribe(function () {
            _this.getMachines();
            $('#modal-default').modal('hide');
        }, function (error) { return console.log(error); });
    };
    MachineComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
        this.modemDataSource.filter = filterValue.trim().toLowerCase();
        if (this.modemDataSource.paginator) {
            this.modemDataSource.paginator.firstPage();
        }
    };
    __decorate([
        ViewChild(MatPaginator, { static: true }),
        __metadata("design:type", MatPaginator)
    ], MachineComponent.prototype, "paginator", void 0);
    __decorate([
        ViewChild(MatSort, { static: true }),
        __metadata("design:type", MatSort)
    ], MachineComponent.prototype, "sortAll", void 0);
    __decorate([
        ViewChild('sort1', { static: true }),
        __metadata("design:type", MatSort)
    ], MachineComponent.prototype, "sort1", void 0);
    __decorate([
        ViewChild('sort2', { static: true }),
        __metadata("design:type", MatSort)
    ], MachineComponent.prototype, "sort2", void 0);
    MachineComponent = __decorate([
        Component({
            selector: 'app-machine',
            templateUrl: './machine.component.html',
            styleUrls: ['./machine.component.css']
        }),
        __metadata("design:paramtypes", [HttpClient,
            ToastrService,
            TranslateService,
            LanguageService,
            ConfigService])
    ], MachineComponent);
    return MachineComponent;
}());
export { MachineComponent };
//# sourceMappingURL=machine.component.js.map