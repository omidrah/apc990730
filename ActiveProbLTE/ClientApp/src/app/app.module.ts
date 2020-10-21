import { sharedModule } from './Shared/shared.modules';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppsettingComponent } from './appsetting/appsetting.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AppfooterComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppsettingComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '', children: [
          { path: 'splunk', loadChildren: './Splunks/splunk.module#SplunkModule' },
          { path: 'machine', loadChildren: './device/device.module#DeviceModule' }, //add by omid
          { path: 'login', loadChildren: './Authority/login.module#LoginModule' },
          { path: 'Test', loadChildren: './test/test.module#TestModule' },//add by omid
          { path: 'export', loadChildren: './Reports/Report.module#ReportModule' },
          { path: 'ol', loadChildren: () => import('./map/map.module').then(a => a.MapModule) },//o990511
          { path: 'manager', loadChildren: () => import('./manager/manager.module').then(a => a.ManagerModule) },
          { path: '', loadChildren: './Splunks/splunk.module#SplunkModule' },
        ],
        data: { breadcrumb: 'خانه', pageTitle: "خانه" } 
      },
    ]),//{enableTracing:true, preloadingStrategy:PreloadAllModules}),//add by omid
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    sharedModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      useDefaultLang: true,
    })
  ],
  exports: [
    TranslateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
