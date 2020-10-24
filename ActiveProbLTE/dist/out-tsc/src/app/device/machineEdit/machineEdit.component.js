var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Injectable, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { isNil } from 'lodash';
import { TreeviewConfig, TreeviewEventParser } from 'ngx-treeview';
import { BehaviorSubject } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { ConfigService } from '../../Shared/services/config.service';
import { TimeZone } from '../../Shared/models/time-zone.enum';
/**
 * Node for to-do item
 */
var TodoItemNode = /** @class */ (function () {
    function TodoItemNode() {
    }
    return TodoItemNode;
}());
export { TodoItemNode };
/** Flat to-do item node with expandable and level information */
var TodoItemFlatNode = /** @class */ (function () {
    function TodoItemFlatNode() {
    }
    return TodoItemFlatNode;
}());
export { TodoItemFlatNode };
/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
var ChecklistDatabase = /** @class */ (function () {
    function ChecklistDatabase(_http, baseUrl) {
        this._http = _http;
        this.myAppUrl = '';
        this.dataChange = new BehaviorSubject([]);
        this.myAppUrl = baseUrl;
        this.initialize();
    }
    Object.defineProperty(ChecklistDatabase.prototype, "data", {
        get: function () { return this.dataChange.value; },
        enumerable: false,
        configurable: true
    });
    ChecklistDatabase.prototype.initialize = function () {
        var _this = this;
        this._http.get('api/MachineGroup/Index').subscribe(function (data) {
            //data.forEach(val => {
            //  if (val.parrentId == null)
            //    val.parrentId = -1;
            //});
            //data.push({ id: -1, title: "گروه ها", parrentId: null })
            //var sortData = data.sort((a, b) => a.parrentId === b.parrentId ? a.id - b.id : a.parrentId - b.parrentId);
            var sortData = data.sort(_this.alphabetically(true));
            var treeData = sortData.reduce(function (accumulator, key) {
                _this.addChildren(accumulator, key);
                return accumulator;
            }, []);
            // Notify the change.
            _this.dataChange.next(treeData);
        });
    };
    ChecklistDatabase.prototype.alphabetically = function (ascending) {
        return function (a, b) {
            // equal items sort equally
            if (a.parrentId === b.parrentId) {
                return 0;
            }
            // nulls sort befor anything else
            else if (a.parrentId === null) {
                return -1;
            }
            else if (b.parrentId === null) {
                return 1;
            }
            // otherwise, if we're ascending, lowest sorts first
            else if (ascending) {
                return a.parrentId < b.parrentId ? -1 : 1;
            }
            // if descending, highest sorts first
            else {
                return a.parrentId < b.parrentId ? 1 : -1;
            }
        };
    };
    ChecklistDatabase.prototype.addChildren = function (accumulator, key) {
        if (key.parrentId == null) {
            var node = new TodoItemNode();
            node.id = key.id;
            node.item = key.title;
            node.checked = key.checked;
            accumulator.push(node);
        }
        else {
            var x = this.searchTree(accumulator, key.parrentId);
            key.parrentId = null;
            if (!x.children)
                x.children = [];
            this.addChildren(x.children, key);
        }
    };
    ChecklistDatabase.prototype.searchTree = function (elements, matchingId) {
        var findItem = null;
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var nodeItem = elements_1[_i];
            if (nodeItem.id == matchingId) {
                findItem = nodeItem;
                break;
            }
            else if (nodeItem.children) { //else if (nodeItem.children.length > 0) {
                findItem = this.searchTree(nodeItem.children, matchingId);
            }
            if (findItem != null) {
                return findItem;
                break;
            }
        }
        return findItem;
    };
    ChecklistDatabase.prototype.setNodeChecked = function (elements, nodeId) {
        var node = this.searchTree(elements, nodeId);
        node.checked = true;
        this.dataChange.next(this.data);
    };
    ChecklistDatabase.prototype.checkAllNode = function (elements, check) {
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var nodeItem = elements_2[_i];
            nodeItem.checked = check;
            if (nodeItem.children) { //else if (nodeItem.children.length > 0) {
                this.checkAllNode(nodeItem.children, check);
            }
        }
        this.dataChange.next(this.data);
    };
    ChecklistDatabase = __decorate([
        Injectable(),
        __param(1, Inject('BASE_URL')),
        __metadata("design:paramtypes", [HttpClient, String])
    ], ChecklistDatabase);
    return ChecklistDatabase;
}());
export { ChecklistDatabase };
var DownlineTreeviewEventParser = /** @class */ (function (_super) {
    __extends(DownlineTreeviewEventParser, _super);
    function DownlineTreeviewEventParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DownlineTreeviewEventParser.prototype.whoIsChecked = function (item) {
        //if (item.internalChecked) {
        //    this.result.push(item.value)
        //}
        //if (item.children != null && item.children.length > 0) {
        //    item.children.forEach(t => { this.whoIsChecked(t); })
        //}
    };
    DownlineTreeviewEventParser.prototype.getSelectedChange = function (component) {
        var _this = this;
        this.result = [];
        var items = component.items;
        if (!isNil(items)) {
            items.forEach((function (item) { _this.whoIsChecked(item); }));
        }
        return this.result;
    };
    DownlineTreeviewEventParser.prototype.getLinks = function (item, parent) {
        var _this = this;
        if (!isNil(item.children)) {
            var link_1 = {
                item: item,
                parent: parent
            };
            var result_1 = [];
            item.children.forEach(function (child) {
                var links = _this.getLinks(child, link_1);
                if (!isNil(links)) {
                    result_1 = result_1.concat(links);
                }
            });
            return result_1;
        }
        if (item.checked) {
            return [{
                    item: item,
                    parent: parent
                }];
        }
        return null;
    };
    DownlineTreeviewEventParser = __decorate([
        Injectable()
    ], DownlineTreeviewEventParser);
    return DownlineTreeviewEventParser;
}(TreeviewEventParser));
export { DownlineTreeviewEventParser };
var OrderDownlineTreeviewEventParser = /** @class */ (function (_super) {
    __extends(OrderDownlineTreeviewEventParser, _super);
    function OrderDownlineTreeviewEventParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentDownlines = [];
        _this.parser = new DownlineTreeviewEventParser();
        return _this;
    }
    OrderDownlineTreeviewEventParser.prototype.getSelectedChange = function (component) {
        var newDownlines = this.parser.getSelectedChange(component);
        this.currentDownlines = newDownlines;
        return this.currentDownlines;
    };
    OrderDownlineTreeviewEventParser = __decorate([
        Injectable()
    ], OrderDownlineTreeviewEventParser);
    return OrderDownlineTreeviewEventParser;
}(TreeviewEventParser));
export { OrderDownlineTreeviewEventParser };
var MyAwesomeRangeValidator = function (fg) {
    fg.get('imei1').setErrors(null);
    fg.get('imei2').setErrors(null);
    fg.get('hostName').setErrors(null);
    fg.get('timeZone').setErrors(null);
    if (false) {
        return { range: false };
    }
    if (fg.get('imei1').value == null || fg.get('imei1').value == '') {
        fg.get('imei1').setErrors({ 'incorrect': true });
    }
    if (fg.get('imei2').value == null || fg.get('imei2').value == '') {
        fg.get('imei2').setErrors({ 'incorrect': true });
    }
    if (fg.get('hostName').value == null || fg.get('hostName').value == '') {
        fg.get('hostName').setErrors({ 'incorrect': true });
    }
    if (fg.get('timeZone').value == null || fg.get('timeZone').value == '') {
        fg.get('timeZone').setErrors({ 'incorrect': true });
    }
};
function projectRequiredValidator(projectName) {
    return function (control) {
        if (projectName === "Modem" && control.value !== undefined && (isNaN(control.value) || control.value == "")) {
            return { 'required': true };
        }
        return null;
    };
}
var MachineEditComponent = /** @class */ (function () {
    function MachineEditComponent(_http, _database, _fb, _avRoute, _router, baseUrl, _config) {
        var _this = this;
        this._http = _http;
        this._database = _database;
        this._fb = _fb;
        this._avRoute = _avRoute;
        this._router = _router;
        this._config = _config;
        /** Map from flat node to nested node. This helps us finding the nested node to be modified */
        this.flatNodeMap = new Map();
        /** Map from nested node to flattened node. This helps us to keep the same object for selection */
        this.nestedNodeMap = new Map();
        /** A selected parent node to be inserted */
        this.selectedParent = null;
        this.showLoading = true;
        this.formTitle = 'Create';
        this.title = 'Create';
        this.myAppUrl = '';
        this.canEdit = false;
        this.items = [];
        this.counter = 0;
        this.breadcroumb = 'CreateDevice';
        this.treeConfig = TreeviewConfig.create({
            hasAllCheckBox: false,
            hasFilter: false,
            hasCollapseExpand: false,
            decoupleChildFromParent: false,
            maxHeight: 400
        });
        this.timeZoneTypes = [];
        this.getLevel = function (node) { return node.level; };
        this.isExpandable = function (node) { return node.expandable; };
        this.getChildren = function (node) { return node.children; };
        this.hasChild = function (_, _nodeData) { return _nodeData.expandable; };
        this.hasNoContent = function (_, _nodeData) { return _nodeData.item === ''; };
        /**
         * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
         */
        this.transformer = function (node, level) {
            var existingNode = _this.nestedNodeMap.get(node);
            var flatNode = existingNode && existingNode.item === node.item
                ? existingNode
                : new TodoItemFlatNode();
            flatNode.item = node.item;
            flatNode.editing = node.editing;
            flatNode.id = node.id;
            flatNode.level = level;
            flatNode.expandable = !!node.children;
            flatNode.checked = node.checked;
            _this.flatNodeMap.set(flatNode, node);
            _this.nestedNodeMap.set(node, flatNode);
            return flatNode;
        };
        this._config.currentConfigurations.subscribe(function (t) {
            _this.config = t;
        });
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        _database.dataChange.subscribe(function (data) {
            _this.dataSource.data = data;
            _this.showLoading = false;
            _this.treeControl.expandAll();
        });
        this.getMachineGroupList().subscribe(function (data) { return _this.machineGroupList = data; });
        if (this._avRoute.snapshot.params['id']) {
            this.id = this._avRoute.snapshot.params['id'];
        }
        this.myAppUrl = baseUrl;
        this.machineForm = this._fb.group({
            id: 0,
            name: [''],
            identifier: ['', [Validators.required]],
            serialNo: ['', Validators.required],
            imei1: ['', [projectRequiredValidator(this.config.name)]],
            imei2: ['', [projectRequiredValidator(this.config.name)]],
            hostName: ['', [Validators.required]],
            timeZone: ['', [Validators.required]],
            machineTypeId: [1, [Validators.min(1)]],
            machineGroupId: [],
            machineTypeTitle: [''],
            machineGroupTitle: [''],
        }); //, { validators: MyAwesomeRangeValidator })
        if (this.id > 0) {
            this.formTitle = 'Edit';
            this.breadcroumb = 'EditDevice';
        }
        for (var time in TimeZone) {
            this.timeZoneTypes.push(time);
        }
    }
    MachineEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.id > 0) {
            this.title = 'Edit';
            this.getMachineById(this.id)
                .subscribe(function (response) {
                if (response['identifier'] == null || response['identifier'] == "" || response['identifier'] == " " || response['machineTypeId'] == null) //means ,,first time for edit
                 {
                    _this.canEdit = true; //first Edit
                }
                _this.machineForm.get('id').setValue(response['id']);
                _this.machineForm.get('name').setValue(response['name']);
                _this.machineName = response['name'];
                _this.machineForm.get('identifier').setValue(response['identifier']);
                if (response['serialNo'] == null) {
                    _this.machineForm.get('serialNo').setValue(response['identifier']);
                }
                else {
                    _this.machineForm.get('serialNo').setValue(response['serialNo']);
                }
                ;
                _this.machineForm.get('machineTypeId').setValue(response['machineTypeId']);
                _this.machineForm.get('machineTypeTitle').setValue(response['machineTypeTitle']);
                _this.machineForm.get('machineGroupId').setValue(response['machineGroupId']);
                _this.machineForm.get('machineGroupTitle').setValue(response['machineGroupTitle']);
                _this.machineForm.get('imei1').setValue(response['imeI1']);
                _this.machineForm.get('imei2').setValue(response['imeI2']);
                _this.machineForm.get('hostName').setValue(response['hostName']);
                _this.machineForm.get('timeZone').setValue(response['timeZone']);
                if (response['machineGroupId'] != undefined && response['machineGroupId'] != null && response['machineGroupId'] != "") {
                    _this._database.setNodeChecked(_this.dataSource.data, response['machineGroupId']);
                }
            }, function (error) { return console.error(error); });
        }
        this.getMachineTypeList().subscribe(function (data) { return _this.machineTypeList = data; });
    };
    MachineEditComponent.prototype.checkAllNode = function (check) {
        this._database.checkAllNode(this.dataSource.data, check);
    };
    MachineEditComponent.prototype.doSelect = function (node) {
        this.checkAllNode(false);
        this._database.setNodeChecked(this.dataSource.data, node.id);
        this.machineForm.get('machineGroupTitle').setValue(node.item);
        this.machineForm.get('machineGroupId').setValue(node.id);
    };
    MachineEditComponent.prototype.save = function () {
        var _this = this;
        if (!this.machineForm.valid) {
            return;
        }
        if (this.title === 'Create' && this.config.name === "Modem") {
            this.saveMachine(this.machineForm.value)
                .subscribe(function () {
                _this._router.navigate(['/machine']);
            }, function (error) { return console.error(error); });
        }
        else if (this.title === 'Edit') {
            this.updateMachine(this.machineForm.value)
                .subscribe(function () {
                _this._router.navigate(['machine']);
            }, function (error) { return console.error(error); });
        }
    };
    MachineEditComponent.prototype.cancel = function () {
        this._router.navigate(['machine']);
    };
    MachineEditComponent.prototype.getMachineById = function (id) {
        return this._http.get(this.myAppUrl + 'api/Machine/Details/' + id)
            .pipe(map(function (response) {
            return response;
        }));
    };
    MachineEditComponent.prototype.saveMachine = function (machine) {
        return this._http.post(this.myAppUrl + 'api/Machine/Create', machine)
            .pipe(map(function (response) {
            return response;
        }));
    };
    MachineEditComponent.prototype.updateMachine = function (machine) {
        return this._http.put(this.myAppUrl + 'api/Machine/Edit', machine)
            .pipe(map(function (response) {
            return response;
        }));
    };
    MachineEditComponent.prototype.getMachineTypeList = function () {
        return this._http.get(this.myAppUrl + 'api/MachineType/Index')
            .pipe(map(function (response) {
            return response;
        }));
    };
    MachineEditComponent.prototype.getMachineGroupList = function () {
        return this._http.get(this.myAppUrl + 'api/MachineGroup/Index')
            .pipe(map(function (response) {
            return response;
        }));
    };
    Object.defineProperty(MachineEditComponent.prototype, "name", {
        get: function () { return this.machineForm.get('name'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MachineEditComponent.prototype, "identifier", {
        get: function () { return this.machineForm.get('identifier'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MachineEditComponent.prototype, "imei1", {
        get: function () { return this.machineForm.get('imei1'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MachineEditComponent.prototype, "imei2", {
        get: function () { return this.machineForm.get('imei2'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MachineEditComponent.prototype, "hostName", {
        get: function () { return this.machineForm.get('hostName'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MachineEditComponent.prototype, "timeZone", {
        get: function () { return this.machineForm.get('timeZone'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MachineEditComponent.prototype, "machineTypeId", {
        get: function () { return this.machineForm.get('machineTypeId'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MachineEditComponent.prototype, "machineGroupId", {
        get: function () { return this.machineForm.get('machineGroupId'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MachineEditComponent.prototype, "serialNo", {
        get: function () { return this.machineForm.get('serialNo'); },
        enumerable: false,
        configurable: true
    });
    MachineEditComponent.prototype.onSerialChange = function (event) {
        this.machineForm.get('identifier').setValue(this.machineForm.get('serialNo').value);
    };
    MachineEditComponent = __decorate([
        Injectable(),
        Component({
            selector: 'app-edit-machine',
            templateUrl: './machineEdit.component.html',
            styleUrls: ['./machineEdit.component.css'],
            providers: [
                { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
                ChecklistDatabase
            ]
        }),
        __param(5, Inject('BASE_URL')),
        __metadata("design:paramtypes", [HttpClient,
            ChecklistDatabase,
            FormBuilder, ActivatedRoute,
            Router, String, ConfigService])
    ], MachineEditComponent);
    return MachineEditComponent;
}());
export { MachineEditComponent };
//# sourceMappingURL=machineEdit.component.js.map