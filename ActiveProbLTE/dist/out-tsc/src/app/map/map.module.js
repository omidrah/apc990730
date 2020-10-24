var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { OlMapComponent } from './ol-map/ol-map.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { sharedModule } from '../Shared/shared.modules';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material';
var MapModule = /** @class */ (function () {
    function MapModule() {
    }
    MapModule = __decorate([
        NgModule({
            declarations: [OlMapComponent],
            imports: [
                CommonModule,
                FormsModule,
                MapRoutingModule,
                sharedModule,
                MatInputModule,
                MatFormFieldModule,
                MatRadioModule,
                MatListModule,
                MatSelectModule
            ]
        })
    ], MapModule);
    return MapModule;
}());
export { MapModule };
//# sourceMappingURL=map.module.js.map