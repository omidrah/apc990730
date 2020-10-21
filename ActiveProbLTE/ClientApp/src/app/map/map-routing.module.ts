import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OlMapComponent } from './ol-map/ol-map.component';

const routes: Routes = [{
    path: '', children: [{
        path: '', component: OlMapComponent
    }]
}];

@NgModule({
    imports: [        
        RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
