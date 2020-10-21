import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() labelKey = 'label';
  @Input() idKey = 'id';
  @Input() options = [];
  @Input() model;

    originalOptions: any[];

  constructor() { }


  ngOnInit() {
    this.originalOptions = [...this.options];
    if (this.model !== undefined) {
      this.model = this.options.find(
        currentOption => currentOption[this.idKey] === this.model
      );
    }
  }

  get label() {
    return this.model ? this.model[this.labelKey] : 'Select...';
  }

}
