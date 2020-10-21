import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, ViewEncapsulation, Inject } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MachineGroup } from '../../Shared/models/machineGroup';
import { ToastrService } from 'ngx-toastr';
import { Configurations } from '../../Shared/models/Configurations';
import { ConfigService } from '../../Shared/services/config.service';
import { TranslateService } from '@ngx-translate/core';

// only used for modal
declare var $: any;

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
  editing: boolean;
  id: number;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  editing: boolean;
  id: number;
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {

  myAppUrl = '';

  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }



  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.myAppUrl = baseUrl;

    this.initialize();
  }

  initialize() {

    this._http.get('api/MachineGroup/Index').subscribe(
      (data: any[]) => {

        data.forEach(val => {
          if (val.parrentId == null)
            val.parrentId = -1;
        });
        data.push({ id: -1, title: "گروه ها", parrentId: null })

        //var sortData = data.sort((a, b) => a.parrentId === b.parrentId ? a.id - b.id : a.parrentId - b.parrentId);
        var sortData = data.sort(this.alphabetically(true));
        var treeData = sortData.reduce<TodoItemNode[]>((accumulator, key) => {

          this.addChildren(accumulator, key);
          return accumulator;
        }, []);

        // Notify the change.
        this.dataChange.next(treeData);
      }
    );
  }

  alphabetically(ascending) {

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
  }

  addChildren(accumulator, key) {

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
  }

  searchTree(elements: TodoItemNode[], matchingId) {

    var findItem = null;
    for (let nodeItem of elements) {

      if (nodeItem.id == matchingId) {
        findItem = nodeItem;
        break;
      }
      else if (nodeItem.children) {//else if (nodeItem.children.length > 0) {
        findItem = this.searchTree(nodeItem.children, matchingId);
      }
      if (findItem != null) {
        return findItem;
        break;
      }
    }
    return findItem;
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {

    const child = <TodoItemNode>{ item: name, editing: false };

    if (!parent.children) { // if parent is a leaf node
      parent.children = [];
    }
    parent.children.push(child);

    this.dataChange.next(this.data);
  }

  saveAPI(machineGroup: MachineGroup, editing) {
    if (!editing)
      return this._http.post(this.myAppUrl + 'api/MachineGroup/Create', machineGroup);
    else
      return this._http.put(this.myAppUrl + 'api/MachineGroup/Edit', machineGroup)
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }

  removeItem(node: TodoItemNode, teammateNode: TodoItemNode[]) {

    const index = teammateNode.indexOf(node);
    if (index !== -1) {
      teammateNode.splice(index, 1);
      this.dataChange.next(this.data);
    }
  }

  deleteAPI(node: TodoItemNode) {

    //return this._http.delete('api/machineGroup/Delete/' + node.id);
    return this._http.delete('api/machineGroup/DeleteNia/' + node.id);
  }
}

@Component({
  //providers: [{ provide: IgxGridTransaction, useClass: IgxTransactionService }],
  selector: 'app-machine-group',
  templateUrl: './machineGroup.component.html',
  styleUrls: ['./machineGroup.component.css'],
  providers: [ChecklistDatabase],
  encapsulation: ViewEncapsulation.None,
})
export class MachineGroupComponent {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  selectedNode: TodoItemFlatNode;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  showLoading = true;

  config: Configurations;

  constructor(
    private _database: ChecklistDatabase,
    private router: Router,
    private toastrService: ToastrService,
    private translate: TranslateService,
    private _config: ConfigService
  ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);

    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this._config.currentConfigurations.subscribe(t => {

      this.config = t;

      _database.dataChange.subscribe(data => {
        this.dataSource.data = data;
        this.showLoading = false;
        this.treeControl.expand(this.treeControl.dataNodes[0]);
      });
    });

  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);

    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.editing = node.editing;
    flatNode.id = node.id;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }


  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }


  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    // 
    let isParentHasChildren: boolean = false;
    if (parentNode.children)
      isParentHasChildren = true;
    //
    this._database.insertItem(parentNode!, '');
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
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {

    this.showLoading = true;

    var flatParentNode = this.getParentNode(node)

    var machineGroup = new MachineGroup();
    if ((flatParentNode != null || flatParentNode != undefined) && flatParentNode.id != -1)
      machineGroup.ParrentId = flatParentNode.id;

    machineGroup.Title = itemValue;

    if (node.editing)
      machineGroup.Id = node.id;

    this._database.saveAPI(machineGroup, node.editing).subscribe((id) => {

      var msg = "";
      const nestedNode = this.flatNodeMap.get(node);

      if (!node.editing) {
        nestedNode.id = id as number;
        msg = "GroupCreationCompletedSuccessfully";
      }
      else
        msg = "GroupEditingCompletedSuccessfully";


      this._database.updateItem(nestedNode!, itemValue);

      this.showLoading = false;
      this.toastrService.success(this.translate.instant(msg), this.translate.instant('Noticeable'));

    }, error => console.error(error));

  }

  /** Remove the node to database */
  removeNode(node: TodoItemFlatNode) {

    this.selectedNode = node;
    $('#modal-default').modal('show');
  }

  doDelete() {

    this.showLoading = true;

    var deleteAPIResult;
    var teammateNode;
    const nestedNode = this.flatNodeMap.get(this.selectedNode);

    if (this.selectedNode.level > 0) {

      var flatParentNode = this.getParentNode(this.selectedNode);
      var nestedParentNode = this.flatNodeMap.get(flatParentNode);
      teammateNode = nestedParentNode.children;
    }
    else //if select root node       
      teammateNode = this._database.data;


    deleteAPIResult = this._database.deleteAPI(nestedNode!);

    deleteAPIResult.subscribe((result) => {

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

        this._database.removeItem(nestedNode!, teammateNode);
        this.flatNodeMap.delete(this.selectedNode);
        this.nestedNodeMap.delete(nestedNode);
      }
      else {
        this.toastrService.error(this.translate.instant(result.message), this.translate.instant('Error'));
      }

      this.showLoading = false;
    }, error => console.error(error));
  }

  /** Remove the node from ChecklistDatabase class*/
  removeTempNode(node: TodoItemFlatNode) {

    this.showLoading = true;

    var teammateNode;
    const nestedNode = this.flatNodeMap.get(node);

    if (node.level > 0) {

      var flatParentNode = this.getParentNode(node);
      var nestedParentNode = this.flatNodeMap.get(flatParentNode);
      teammateNode = nestedParentNode.children;
    }
    else //if select root node       
      teammateNode = this._database.data;

    this._database.removeItem(nestedNode!, teammateNode);

    this.flatNodeMap.delete(node);
    this.nestedNodeMap.delete(nestedNode);

    this.showLoading = false;
  }

  /** Edit node*/
  editNode(node: TodoItemFlatNode) {

    node.editing = true;
  }

  cancelEditNode(node: TodoItemFlatNode) {

    node.editing = false;
  }

  groupTestAssignment(node: TodoItemFlatNode) {

    if (node != null)
      this.router.navigate(['/Test/Group/Assignment/', node.id, node.item]);
  }

  groupUpdateAssignment(node: TodoItemFlatNode) {

    if (node != null)
      this.router.navigate(['machine/Group/Version', node.id, node.item]);
  }

  groupDviceAssignment(node: TodoItemFlatNode) {
    if (node != null)
      this.router.navigate(['machine/Group/edit', node.id, node.item]);
  }
}
