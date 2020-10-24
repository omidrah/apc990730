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
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, ViewEncapsulation, Inject } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MachineGroup } from '../../Shared/models/machineGroup';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from '../../Shared/services/config.service';
import { TranslateService } from '@ngx-translate/core';
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
            data.forEach(function (val) {
                if (val.parrentId == null)
                    val.parrentId = -1;
            });
            data.push({ id: -1, title: "گروه ها", parrentId: null });
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
    /** Add an item to to-do list */
    ChecklistDatabase.prototype.insertItem = function (parent, name) {
        var child = { item: name, editing: false };
        if (!parent.children) { // if parent is a leaf node
            parent.children = [];
        }
        parent.children.push(child);
        this.dataChange.next(this.data);
    };
    ChecklistDatabase.prototype.saveAPI = function (machineGroup, editing) {
        if (!editing)
            return this._http.post(this.myAppUrl + 'api/MachineGroup/Create', machineGroup);
        else
            return this._http.put(this.myAppUrl + 'api/MachineGroup/Edit', machineGroup);
    };
    ChecklistDatabase.prototype.updateItem = function (node, name) {
        node.item = name;
        this.dataChange.next(this.data);
    };
    ChecklistDatabase.prototype.removeItem = function (node, teammateNode) {
        var index = teammateNode.indexOf(node);
        if (index !== -1) {
            teammateNode.splice(index, 1);
            this.dataChange.next(this.data);
        }
    };
    ChecklistDatabase.prototype.deleteAPI = function (node) {
        //return this._http.delete('api/machineGroup/Delete/' + node.id);
        return this._http.delete('api/machineGroup/DeleteNia/' + node.id);
    };
    ChecklistDatabase = __decorate([
        Injectable(),
        __param(1, Inject('BASE_URL')),
        __metadata("design:paramtypes", [HttpClient, String])
    ], ChecklistDatabase);
    return ChecklistDatabase;
}());
export { ChecklistDatabase };
var MachineGroupComponent = /** @class */ (function () {
    function MachineGroupComponent(_database, router, toastrService, translate, _config) {
        var _this = this;
        this._database = _database;
        this.router = router;
        this.toastrService = toastrService;
        this.translate = translate;
        this._config = _config;
        /** Map from flat node to nested node. This helps us finding the nested node to be modified */
        this.flatNodeMap = new Map();
        /** Map from nested node to flattened node. This helps us to keep the same object for selection */
        this.nestedNodeMap = new Map();
        /** A selected parent node to be inserted */
        this.selectedParent = null;
        /** The new item's name */
        this.newItemName = '';
        /** The selection for checklist */
        this.checklistSelection = new SelectionModel(true /* multiple */);
        this.showLoading = true;
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
            _this.flatNodeMap.set(flatNode, node);
            _this.nestedNodeMap.set(node, flatNode);
            return flatNode;
        };
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this._config.currentConfigurations.subscribe(function (t) {
            _this.config = t;
            _database.dataChange.subscribe(function (data) {
                _this.dataSource.data = data;
                _this.showLoading = false;
                _this.treeControl.expand(_this.treeControl.dataNodes[0]);
            });
        });
    }
    /* Get the parent node of a node */
    MachineGroupComponent.prototype.getParentNode = function (node) {
        var currentLevel = this.getLevel(node);
        if (currentLevel < 1) {
            return null;
        }
        var startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
        for (var i = startIndex; i >= 0; i--) {
            var currentNode = this.treeControl.dataNodes[i];
            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    };
    /** Select the category so we can insert the new item. */
    MachineGroupComponent.prototype.addNewItem = function (node) {
        var parentNode = this.flatNodeMap.get(node);
        // 
        var isParentHasChildren = false;
        if (parentNode.children)
            isParentHasChildren = true;
        //
        this._database.insertItem(parentNode, '');
        // expand the subtree only if the parent has children (parent is not a leaf node)
        if (isParentHasChildren)
            this.treeControl.expand(node);
        else {
            var gParent = this.getParentNode(this.nestedNodeMap.get(parentNode));
            if (gParent != null) {
                this.treeControl.collapse(gParent);
                this.treeControl.expand(gParent);
                this.treeControl.expand(node);
            }
        }
    };
    /** Save the node to database */
    MachineGroupComponent.prototype.saveNode = function (node, itemValue) {
        var _this = this;
        this.showLoading = true;
        var flatParentNode = this.getParentNode(node);
        var machineGroup = new MachineGroup();
        if ((flatParentNode != null || flatParentNode != undefined) && flatParentNode.id != -1)
            machineGroup.ParrentId = flatParentNode.id;
        machineGroup.Title = itemValue;
        if (node.editing)
            machineGroup.Id = node.id;
        this._database.saveAPI(machineGroup, node.editing).subscribe(function (id) {
            var msg = "";
            var nestedNode = _this.flatNodeMap.get(node);
            if (!node.editing) {
                nestedNode.id = id;
                msg = "GroupCreationCompletedSuccessfully";
            }
            else
                msg = "GroupEditingCompletedSuccessfully";
            _this._database.updateItem(nestedNode, itemValue);
            _this.showLoading = false;
            _this.toastrService.success(_this.translate.instant(msg), _this.translate.instant('Noticeable'));
        }, function (error) { return console.error(error); });
    };
    /** Remove the node to database */
    MachineGroupComponent.prototype.removeNode = function (node) {
        this.selectedNode = node;
        $('#modal-default').modal('show');
    };
    MachineGroupComponent.prototype.doDelete = function () {
        var _this = this;
        this.showLoading = true;
        var deleteAPIResult;
        var teammateNode;
        var nestedNode = this.flatNodeMap.get(this.selectedNode);
        if (this.selectedNode.level > 0) {
            var flatParentNode = this.getParentNode(this.selectedNode);
            var nestedParentNode = this.flatNodeMap.get(flatParentNode);
            teammateNode = nestedParentNode.children;
        }
        else //if select root node       
            teammateNode = this._database.data;
        deleteAPIResult = this._database.deleteAPI(nestedNode);
        deleteAPIResult.subscribe(function (result) {
            $('#modal-default').modal('hide');
            //if (result == 1) {
            //  this._database.removeItem(nestedNode!, teammateNode);
            //  this.flatNodeMap.delete(this.selectedNode);
            //  this.nestedNodeMap.delete(nestedNode);        
            //}
            //else {
            //  this.toastrService.error('به دلیل وجود اطلاعات وابسته(زیرگروه) امکان حذف وجود ندارد', 'خطا');
            //}
            if (result.succeed == true) {
                _this._database.removeItem(nestedNode, teammateNode);
                _this.flatNodeMap.delete(_this.selectedNode);
                _this.nestedNodeMap.delete(nestedNode);
            }
            else {
                _this.toastrService.error(_this.translate.instant(result.message), _this.translate.instant('Error'));
            }
            _this.showLoading = false;
        }, function (error) { return console.error(error); });
    };
    /** Remove the node from ChecklistDatabase class*/
    MachineGroupComponent.prototype.removeTempNode = function (node) {
        this.showLoading = true;
        var teammateNode;
        var nestedNode = this.flatNodeMap.get(node);
        if (node.level > 0) {
            var flatParentNode = this.getParentNode(node);
            var nestedParentNode = this.flatNodeMap.get(flatParentNode);
            teammateNode = nestedParentNode.children;
        }
        else //if select root node       
            teammateNode = this._database.data;
        this._database.removeItem(nestedNode, teammateNode);
        this.flatNodeMap.delete(node);
        this.nestedNodeMap.delete(nestedNode);
        this.showLoading = false;
    };
    /** Edit node*/
    MachineGroupComponent.prototype.editNode = function (node) {
        node.editing = true;
    };
    MachineGroupComponent.prototype.cancelEditNode = function (node) {
        node.editing = false;
    };
    MachineGroupComponent.prototype.groupTestAssignment = function (node) {
        if (node != null)
            this.router.navigate(['/Test/Group/Assignment/', node.id, node.item]);
    };
    MachineGroupComponent.prototype.groupUpdateAssignment = function (node) {
        if (node != null)
            this.router.navigate(['machine/Group/Version', node.id, node.item]);
    };
    MachineGroupComponent.prototype.groupDviceAssignment = function (node) {
        if (node != null)
            this.router.navigate(['machine/Group/edit', node.id, node.item]);
    };
    MachineGroupComponent = __decorate([
        Component({
            //providers: [{ provide: IgxGridTransaction, useClass: IgxTransactionService }],
            selector: 'app-machine-group',
            templateUrl: './machineGroup.component.html',
            styleUrls: ['./machineGroup.component.css'],
            providers: [ChecklistDatabase],
            encapsulation: ViewEncapsulation.None,
        }),
        __metadata("design:paramtypes", [ChecklistDatabase,
            Router,
            ToastrService,
            TranslateService,
            ConfigService])
    ], MachineGroupComponent);
    return MachineGroupComponent;
}());
export { MachineGroupComponent };
//# sourceMappingURL=machineGroup.component.js.map