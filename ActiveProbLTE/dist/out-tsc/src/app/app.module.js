var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { sharedModule } from './Shared/shared.modules';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
export function HttpLoaderFactory(http) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                        path: '',
                        children: [
                            { path: 'splunk', loadChildren: './Splunks/splunk.module#SplunkModule' },
                            { path: 'machine', loadChildren: './device/device.module#DeviceModule' },
                            { path: 'login', loadChildren: './Authority/login.module#LoginModule' },
                            { path: 'Test', loadChildren: './test/test.module#TestModule' },
                            { path: 'export', loadChildren: './Reports/Report.module#ReportModule' },
                            { path: 'ol', loadChildren: function () { return import('./map/map.module').then(function (a) { return a.MapModule; }); } },
                            { path: 'manager', loadChildren: function () { return import('./manager/manager.module').then(function (a) { return a.ManagerModule; }); } },
                            { path: '', loadChildren: './Splunks/splunk.module#SplunkModule' },
                        ],
                        data: { breadcrumb: 'خانه', pageTitle: "خانه" }
                    },
                ]),
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
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map