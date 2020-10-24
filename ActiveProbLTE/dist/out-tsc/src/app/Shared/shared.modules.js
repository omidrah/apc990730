var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { MatSortModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatPaginatorIntl } from '@angular/material';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatTableModule } from '@angular/material';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS, MaterialDateAdapter } from './models/material-persian-date-adapter';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { PaginatorIntlService } from './services/CustomPaginatorConfiguration';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfigService } from './services/config.service';
import { Platform } from '@angular/cdk/platform';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PduDecoderService } from './services/pdu-decoder.service';
import { APP_CONFIG, AppConfig } from './config';
var sharedModule = /** @class */ (function () {
    function sharedModule() {
    }
    sharedModule = __decorate([
        NgModule({
            declarations: [
                BreadcrumbComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                NgbModule,
                RouterModule,
                MatSortModule,
                NgxPaginationModule,
                Ng2SearchPipeModule,
                MatTableModule,
                ToastrModule.forRoot({
                    timeOut: 3000,
                    positionClass: 'toast-top-left',
                    preventDuplicates: true,
                    countDuplicates: true,
                    resetTimeoutOnDuplicate: true,
                    closeButton: false,
                    tapToDismiss: false,
                    progressBar: true,
                    progressAnimation: 'increasing',
                }),
                TranslateModule,
                MatIconModule,
                MatTooltipModule
            ],
            exports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                NgbModule,
                MatSortModule,
                NgxPaginationModule,
                Ng2SearchPipeModule,
                MatTableModule,
                ToastrModule,
                RouterModule,
                BreadcrumbComponent,
                TranslateModule,
                MatIconModule,
                MatTooltipModule
                //MatDatepickerModule,
                //MatNativeDateModule,
            ],
            providers: [
                ConfigService,
                PduDecoderService,
                //MatDatepickerModule,
                {
                    provide: DateAdapter,
                    useFactory: function () {
                        if (localStorage.getItem('Language') == 'ar')
                            return new MaterialPersianDateAdapter();
                        //return new MaterialDateAdapter('fa', new Platform())
                        else
                            return new MaterialDateAdapter(localStorage.getItem('Language'), new Platform());
                    },
                    deps: [MAT_DATE_LOCALE]
                },
                { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
                {
                    provide: MatPaginatorIntl,
                    useFactory: function (translate) {
                        var service = new PaginatorIntlService();
                        service.injectTranslateService(translate);
                        return service;
                    },
                    deps: [TranslateService]
                },
                { provide: APP_CONFIG, useValue: AppConfig }
            ]
        })
    ], sharedModule);
    return sharedModule;
}());
export { sharedModule };
//# sourceMappingURL=shared.modules.js.map