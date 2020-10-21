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
import { ManagerService } from './../../Shared/services/manager.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
var UserManagerComponent = /** @class */ (function () {
    function UserManagerComponent(_manager) {
        this._manager = _manager;
        this.displayedColumns = ['index', 'FirstName', 'LastName', 'IsActive', 'actions'];
        this.filter = '';
        this.showloader = false;
        this.getUsers();
    }
    UserManagerComponent.prototype.getUsers = function () {
        var _this = this;
        this.showloader = true;
        this._manager.getUsers().subscribe(function (data) {
            //this.users = <any>data;
            _this.dataSource = new MatTableDataSource(data["users"]);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort1;
            _this.showloader = false;
        });
    };
    UserManagerComponent.prototype.ngOnInit = function () {
    };
    UserManagerComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    __decorate([
        ViewChild(MatPaginator, { static: true }),
        __metadata("design:type", MatPaginator)
    ], UserManagerComponent.prototype, "paginator", void 0);
    __decorate([
        ViewChild('sort1', { static: true }),
        __metadata("design:type", MatSort)
    ], UserManagerComponent.prototype, "sort1", void 0);
    UserManagerComponent = __decorate([
        Component({
            selector: 'app-usermanager',
            templateUrl: './user-manager.component.html',
            styleUrls: ['./user-manager.component.css'],
            providers: [ManagerService]
        }),
        __metadata("design:paramtypes", [ManagerService])
    ], UserManagerComponent);
    return UserManagerComponent;
}());
export { UserManagerComponent };
//# sourceMappingURL=user-manager.component.js.map