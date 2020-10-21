import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Machine } from '../../Shared/models/machine';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MachineType } from '../../Shared/models/machineType';
import { MachineGroup } from '../../Shared/models/machineGroup';
import { isNil } from 'lodash';
import { TreeviewItem, TreeviewConfig, TreeviewComponent, TreeviewEventParser, DownlineTreeviewItem } from 'ngx-treeview';
import { BehaviorSubject } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { ConfigService } from '../../Shared/services/config.service';
import { Configurations } from '../../Shared/models/Configurations';
import { TimeZone } from '../../Shared/models/time-zone.enum';


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
  checked: boolean;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
  editing: boolean;
  id: number;
  checked: boolean;
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

        //data.forEach(val => {
        //  if (val.parrentId == null)
        //    val.parrentId = -1;
        //});
        //data.push({ id: -1, title: "گروه ها", parrentId: null })

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

  setNodeChecked(elements: TodoItemNode[], nodeId) {
    var node = this.searchTree(elements, nodeId);

    node.checked = true;
    this.dataChange.next(this.data);
  }

  checkAllNode(elements: TodoItemNode[], check) {

    for (let nodeItem of elements) {
      nodeItem.checked = check;
      if (nodeItem.children) {//else if (nodeItem.children.length > 0) {
        this.checkAllNode(nodeItem.children, check);
      }
    }
    this.dataChange.next(this.data);
  }
}



@Injectable()
export class DownlineTreeviewEventParser extends TreeviewEventParser {
  buttonClass: string;
  whoIsChecked(item: TreeviewItem) {
    //if (item.internalChecked) {
    //    this.result.push(item.value)
    //}
    //if (item.children != null && item.children.length > 0) {
    //    item.children.forEach(t => { this.whoIsChecked(t); })
    //}
  }
  result: any[];
  getSelectedChange(component: TreeviewComponent): any[] {
    this.result = [];
    const items = component.items;
    if (!isNil(items)) {
      items.forEach((item => { this.whoIsChecked(item) }))
    }
    return this.result;
  }
  private getLinks(item: TreeviewItem, parent: DownlineTreeviewItem): DownlineTreeviewItem[] {
    if (!isNil(item.children)) {
      const link = {
        item: item,
        parent: parent
      };
      let result: DownlineTreeviewItem[] = [];
      item.children.forEach(child => {
        const links = this.getLinks(child, link);
        if (!isNil(links)) {
          result = result.concat(links);
        }
      });
      return result;
    }
    if (item.checked) {
      return [{
        item: item,
        parent: parent
      }];
    }
    return null;
  }
}
@Injectable()
export class OrderDownlineTreeviewEventParser extends TreeviewEventParser {
  private currentDownlines: DownlineTreeviewItem[] = [];
  private parser = new DownlineTreeviewEventParser();
  getSelectedChange(component: TreeviewComponent): any[] {
    const newDownlines: DownlineTreeviewItem[] = this.parser.getSelectedChange(component);
    this.currentDownlines = newDownlines;
    return this.currentDownlines;
  }
}


const MyAwesomeRangeValidator: ValidatorFn = (fg: FormGroup) => {
  fg.get('imei1').setErrors(null);
  fg.get('imei2').setErrors(null);
  fg.get('hostName').setErrors(null);
  fg.get('timeZone').setErrors(null);

  if (false) {
    return { range: false }
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


function projectRequiredValidator(projectName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {

    if (projectName === "Modem" && control.value !== undefined && (isNaN(control.value) || control.value == "")) {
      return { 'required': true }
    }
    return null;
  }
}


@Injectable()
@Component({
  selector: 'app-edit-machine',
  templateUrl: './machineEdit.component.html',
  styleUrls: ['./machineEdit.component.css'],
  providers: [
    { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
    ChecklistDatabase
  ]
})
export class MachineEditComponent implements OnInit {

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  selectedNode: TodoItemFlatNode;

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  showLoading = true;

  machineForm: FormGroup;
  formTitle = 'Create';
  title = 'Create';
  id: number;
  errorMessage: any;
  myAppUrl = '';
  canEdit: boolean = false;
  machineTypeList: MachineType[];
  machineGroupList: MachineGroup[];
  items: TreeviewItem[] = [];
  treeviewItem: TreeviewItem;
  counter: number = 0;
  counterText: any[];

  machineName: '';

  breadcroumb = 'CreateDevice';

  treeConfig = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 400
  });

  config: Configurations;
  timeZoneTypes = [];

  constructor(private _http: HttpClient,
    private _database: ChecklistDatabase,
    private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private _config: ConfigService) {

    this._config.currentConfigurations.subscribe(t => {
      this.config = t;
    });

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);

    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
      this.showLoading = false;
      this.treeControl.expandAll();
    });

    this.getMachineGroupList().subscribe(
      (data: MachineGroup[]) => this.machineGroupList = data
    );
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
    })//, { validators: MyAwesomeRangeValidator })

    if (this.id > 0) {
      this.formTitle = 'Edit';
      this.breadcroumb = 'EditDevice';
    }

    for (var time in TimeZone) {
      this.timeZoneTypes.push(time);
    }
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
    flatNode.checked = node.checked;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  ngOnInit() {
    if (this.id > 0) {
      this.title = 'Edit';
      this.getMachineById(this.id)
        .subscribe((response: Machine) => {
          if (response['identifier'] == null || response['identifier'] == "" || response['identifier'] == " " || response['machineTypeId'] == null)//means ,,first time for edit
          {
            this.canEdit = true; //first Edit
          }
          this.machineForm.get('id').setValue(response['id']);
          this.machineForm.get('name').setValue(response['name']);

          this.machineName = response['name'];

          this.machineForm.get('identifier').setValue(response['identifier']);
          if (response['serialNo'] == null) {
            this.machineForm.get('serialNo').setValue(response['identifier'])
          }
          else {
            this.machineForm.get('serialNo').setValue(response['serialNo'])
          };
          this.machineForm.get('machineTypeId').setValue(response['machineTypeId']);
          this.machineForm.get('machineTypeTitle').setValue(response['machineTypeTitle']);
          this.machineForm.get('machineGroupId').setValue(response['machineGroupId']);
          this.machineForm.get('machineGroupTitle').setValue(response['machineGroupTitle']);

          this.machineForm.get('imei1').setValue(response['imeI1']);
          this.machineForm.get('imei2').setValue(response['imeI2']);
          this.machineForm.get('hostName').setValue(response['hostName']);
          this.machineForm.get('timeZone').setValue(response['timeZone']);

          if (response['machineGroupId'] != undefined && response['machineGroupId'] != null && response['machineGroupId'] != "") {

            this._database.setNodeChecked(this.dataSource.data, response['machineGroupId']);
          }


        }, error => console.error(error));
    }
    this.getMachineTypeList().subscribe(
      (data: MachineType[]) => this.machineTypeList = data
    );
  }

  checkAllNode(check) {

    this._database.checkAllNode(this.dataSource.data, check);
  }

  doSelect(node: TodoItemNode) {

    this.checkAllNode(false);
    this._database.setNodeChecked(this.dataSource.data, node.id);

    this.machineForm.get('machineGroupTitle').setValue(node.item);
    this.machineForm.get('machineGroupId').setValue(node.id);
  }

  save() {
    if (!this.machineForm.valid) {
      return;
    }
    if (this.title === 'Create' && this.config.name === "Modem") {
      this.saveMachine(this.machineForm.value)
        .subscribe(() => {
          this._router.navigate(['/machine']);
        }, error => console.error(error));
    } else
      if (this.title === 'Edit') {
        this.updateMachine(this.machineForm.value)
          .subscribe(() => {
            this._router.navigate(['machine']);
          }, error => console.error(error));
      }
  }
  cancel() {
    this._router.navigate(['machine']);
  }
  getMachineById(id: number) {
    return this._http.get(this.myAppUrl + 'api/Machine/Details/' + id)
      .pipe(map(
        response => {
          return response;
        }));
  }
  saveMachine(machine: Machine) {
    return this._http.post(this.myAppUrl + 'api/Machine/Create', machine)
      .pipe(map(
        response => {
          return response;
        }));
  }
  updateMachine(machine: Machine) {
    return this._http.put(this.myAppUrl + 'api/Machine/Edit', machine)
      .pipe(map(
        response => {
          return response;
        }));
  }
  getMachineTypeList() {
    return this._http.get(this.myAppUrl + 'api/MachineType/Index')
      .pipe(map(
        response => {
          return response;
        }));
  }
  getMachineGroupList() {
    return this._http.get(this.myAppUrl + 'api/MachineGroup/Index')
      .pipe(map(
        response => {
          return response;
        }));
  }

  get name() { return this.machineForm.get('name'); }
  get identifier() { return this.machineForm.get('identifier'); }
  get imei1() { return this.machineForm.get('imei1'); }
  get imei2() { return this.machineForm.get('imei2'); }
  get hostName() { return this.machineForm.get('hostName'); }
  get timeZone() { return this.machineForm.get('timeZone'); }

  
  get machineTypeId() { return this.machineForm.get('machineTypeId'); }
  get machineGroupId() { return this.machineForm.get('machineGroupId'); }
  get serialNo() { return this.machineForm.get('serialNo'); }

  public onSerialChange(event: any): void {
    this.machineForm.get('identifier').setValue(this.machineForm.get('serialNo').value);
  }
}
