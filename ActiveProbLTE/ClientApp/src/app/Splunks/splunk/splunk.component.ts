import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
    selector: 'splunk',
    templateUrl: './splunk.component.html',
    styleUrls: ['./splunk.component.css']
})
export class SplunkComponent implements OnInit {
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
