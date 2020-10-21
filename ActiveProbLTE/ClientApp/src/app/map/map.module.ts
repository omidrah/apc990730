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

@NgModule({
  declarations: [OlMapComponent],
  imports: [
      CommonModule,
      FormsModule,
    MapRoutingModule,

    sharedModule,

    MatInputModule,
    MatFormFieldModule,
    MatRadioModule
    ,
    MatListModule,
    MatSelectModule
  ]
})
export class MapModule { }
