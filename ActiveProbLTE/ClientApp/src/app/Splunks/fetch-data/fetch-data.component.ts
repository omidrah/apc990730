import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public showloader: boolean = false;
  constructor(private santizer: DomSanitizer) {
  }
  public ngOnInit() {
    // call this setTimer method when you want to set timer
    this.initLoader();
  }
  uploadDone() {
    this.showloader = false;
  }
  public initLoader() {
    this.showloader = true;
  }
}

