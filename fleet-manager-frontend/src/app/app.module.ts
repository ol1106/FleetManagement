import { ServicesListComponent } from './components/VehicleServices/services-list/services-list.component';
import { AddServiceComponent } from './components/VehicleServices/add-service/add-service.component';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {ToastrModule} from 'ngx-toastr';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import 'hammerjs';
import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';
import {FuseModule} from "../../@fuse/fuse.module";
import {fuseConfig} from './fuse-config';
import {SharedModule} from "./shared-module/shared.module";
import {CustomHttpLoaderFactory} from "./shared-module/customLanguageHttpLoader";
import {SsoModule} from "../../sso-implementation/sso.module";
import {environment} from "../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {SSOConfigFactory, SSOConfigService} from "../../sso-implementation/config/SSOConfigService";
import {JwtInterceptor} from "../../sso-implementation/interceptors/jwt-interceptor.service";
import {ErrorInterceptor} from "../../sso-implementation/interceptors/error-interceptor.service";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NgxAutoScrollModule} from "ngx-auto-scroll";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CompanyComponent } from '././components/company/company.component';
import { VehicleClassComponent } from '././components/vehicle-class/vehicle-class.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { FleetComponent } from '././components/fleet/fleet.component';
import { DriverComponent } from './components/driver/driver.component';
import { AddVehicleClassComponent } from '././components/vehicle-class/add-vehicle-class/add-vehicle-class.component';
import { LoginComponent } from '././components/login/login.component';
import { AddvehicleComponent } from './components/vehicle/addvehicle/addvehicle.component';
import { VehicleDetailsComponent } from './components/vehicle/vehicle-details/vehicle-details.component';
import { UpdateServiceComponent } from './components/VehicleServices/update-service/update-service.component';
import { RegisterComponent } from './components/register/register.component';
import { AddDriverComponent } from './components/driver/add-driver/add-driver.component';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
import { AddIssueComponent } from './components/VehicleIssues/add-issue/add-issue.component';
import { IssuesListComponent } from './components/VehicleIssues/issues-list/issues-list.component';
import { UpdateIssueComponent } from './components/VehicleIssues/update-issue/update-issue.component';
import { ProfileComponent } from './components/profile/profile.component';


registerLocaleData(localeIt, 'it');


@NgModule({
    declarations: [AppComponent, CompanyComponent, VehicleClassComponent, VehicleComponent,AddServiceComponent,ServicesListComponent, FleetComponent, DriverComponent, LoginComponent,AddVehicleClassComponent, AddvehicleComponent, VehicleDetailsComponent,UpdateServiceComponent,RegisterComponent, AddDriverComponent, AddCompanyComponent, AddIssueComponent, IssuesListComponent, UpdateIssueComponent,ProfileComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DragDropModule,
        MatProgressBarModule,
        NgxAutoScrollModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        ToastrModule.forRoot( {
            timeOut: 2000,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            progressBar: true,
            maxOpened: 10,
            tapToDismiss: true,
            newestOnTop: true
        }),
        LeafletModule,
        LeafletModule.forRoot(),
        LeafletDrawModule.forRoot(),
        FuseModule.forRoot(fuseConfig),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: CustomHttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        // SsoModule.forRoot(environment)
    ],
    bootstrap: [AppComponent],
    providers: [
        CookieService,
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: SSOConfigFactory,
        //     deps: [SSOConfigService],
        //     multi: true
        // },
        [
            {provide: APP_BASE_HREF, useValue: '/'},
            // {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
            // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
        ]
    ]


})
export class AppModule {

}

