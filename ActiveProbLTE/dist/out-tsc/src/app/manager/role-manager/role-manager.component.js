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
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from './../../Shared/services/Language.service';
import { ManagerService } from './../../Shared/services/manager.service';
var RoleManagerComponent = /** @class */ (function () {
    function RoleManagerComponent(_manager, toastrService, translate, langService) {
        this._manager = _manager;
        this.toastrService = toastrService;
        this.translate = translate;
        this.langService = langService;
        this.displayedColumns = ['index', 'name', 'description', 'UserCount', 'actions'];
        this.filter = '';
        this.showloader = false;
        this.getRoles();
    }
    RoleManagerComponent.prototype.getRoles = function () {
        var _this = this;
        this.showloader = true;
        this._manager.getRole().subscribe(function (data) {
            _this.dataSource = new MatTableDataSource(data);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort1;
            _this.showloader = false;
        });
    };
    RoleManagerComponent.prototype.ngOnInit = function () {
    };
    RoleManagerComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    RoleManagerComponent.prototype.doDelete = function (elem) {
        var _this = this;
        this.showloader = true;
        this._manager.DeleteRole(elem.id).subscribe(function (x) {
            alert(elem);
            _this.showloader = false;
            _this.getRoles();
        }, function (err) { console.log(err); });
    };
    __decorate([
        ViewChild(MatPaginator, { static: true }),
        __metadata("design:type", MatPaginator)
    ], RoleManagerComponent.prototype, "paginator", void 0);
    __decorate([
        ViewChild(MatSort, { static: true }),
        __metadata("design:type", MatSort)
    ], RoleManagerComponent.prototype, "sortAll", void 0);
    __decorate([
        ViewChild('sort1', { static: true }),
        __metadata("design:type", MatSort)
    ], RoleManagerComponent.prototype, "sort1", void 0);
    __decorate([
        ViewChild('sort2', { static: true }),
        __metadata("design:type", MatSort)
    ], RoleManagerComponent.prototype, "sort2", void 0);
    RoleManagerComponent = __decorate([
        Component({
            selector: 'app-rolemanager',
            templateUrl: './role-manager.component.html',
            styleUrls: ['./role-manager.component.css'],
            providers: [ManagerService]
        }),
        __metadata("design:paramtypes", [ManagerService,
            ToastrService,
            TranslateService,
            LanguageService])
    ], RoleManagerComponent);
    return RoleManagerComponent;
}());
export { RoleManagerComponent };
//# sourceMappingURL=role-manager.component.js.map