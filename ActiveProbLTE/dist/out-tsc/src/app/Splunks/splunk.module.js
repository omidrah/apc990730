var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { sharedModule } from '../Shared/shared.modules';
import { NgModule } from '@angular/core';
import { SplunkComponent } from './splunk/splunk.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SplunkRoutingModule } from './splunk-routing.module';
import { MatProgressSpinnerModule } from '@angular/material';
var SplunkModule = /** @class */ (function () {
    function SplunkModule() {
    }
    SplunkModule = __decorate([
        NgModule({
            declarations: [
                SplunkComponent,
                FetchDataComponent
            ],
            imports: [
                sharedModule,
                MatProgressSpinnerModule,
                SplunkRoutingModule,
            ],
            providers: []
        })
    ], SplunkModule);
    return SplunkModule;
}());
export { SplunkModule };
//# sourceMappingURL=splunk.module.js.map