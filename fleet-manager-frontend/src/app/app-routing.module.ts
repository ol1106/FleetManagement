import { UpdateIssueComponent } from './components/VehicleIssues/update-issue/update-issue.component';
import { IssuesListComponent } from './components/VehicleIssues/issues-list/issues-list.component';
import { AddIssueComponent } from './components/VehicleIssues/add-issue/add-issue.component';
import { UpdateServiceComponent } from './components/VehicleServices/update-service/update-service.component';
import { ServicesListComponent } from './components/VehicleServices/services-list/services-list.component';
import { AddServiceComponent } from './components/VehicleServices/add-service/add-service.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { LoginComponent } from '././components/login/login.component';
import { VehicleClassComponent } from '././components/vehicle-class/vehicle-class.component';
import { AddVehicleClassComponent } from '././components/vehicle-class/add-vehicle-class/add-vehicle-class.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { AddvehicleComponent } from './components/vehicle/addvehicle/addvehicle.component';
import { VehicleDetailsComponent } from './components/vehicle/vehicle-details/vehicle-details.component';
import { RegisterComponent } from './components/register/register.component';
import { AddDriverComponent } from './components/driver/add-driver/add-driver.component';
import { DriverComponent } from './components/driver/driver.component';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
import {FleetComponent} from "./components/fleet/fleet.component";
import {CompanyComponent} from "./components/company/company.component";
import { ProfileComponent } from './components/profile/profile.component';
import { Driver } from './models/driver';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {path: 'vehicleClassAll',component:VehicleClassComponent} ,
   {path:'vehicleClassAdd',component:AddVehicleClassComponent},
   {path:'vehicle',component:VehicleComponent},
   {path:'AddVehicle',component:AddvehicleComponent},
   {path:'vehicles/:id',component:VehicleDetailsComponent},
    {path:'addCompany',component:AddCompanyComponent},
    {path:'allCompanies',component:CompanyComponent},
    {path:'addDriver',component:AddDriverComponent},
    {path:'drivers',component:DriverComponent},
    {path: 'vehicleService', component:AddServiceComponent},
   {path: 'vehicleServiceList', component:ServicesListComponent},
   {path: 'edit-service/:id', component:UpdateServiceComponent},
   {path: 'vehicleIssue', component:AddIssueComponent},
   {path: 'vehicleIssueList', component:IssuesListComponent},
   {path: 'edit-issue/:id', component:UpdateIssueComponent},
   { path: 'profile', component: ProfileComponent },
    {path:'fleet',component:FleetComponent},
    {path:'company',component:CompanyComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {

}
