import { sharedModule } from '../Shared/shared.modules';
import { NgModule } from '@angular/core';
import { SplunkComponent } from './splunk/splunk.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SplunkRoutingModule } from './splunk-routing.module';
import { MatProgressSpinnerModule } from '@angular/material';
@NgModule({
  declarations: [
    SplunkComponent,
    FetchDataComponent
  ],
  imports: [       
    sharedModule    ,
    MatProgressSpinnerModule,
    SplunkRoutingModule, 
  ],
  providers: []
})
export class SplunkModule { }
