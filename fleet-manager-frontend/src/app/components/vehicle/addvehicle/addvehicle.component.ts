import { Component, OnInit } from '@angular/core';
import { VehicleConfigService } from '../../../_services/vehicle-config.service';
import { Vehicle } from '../../../models/vehicle';
import { VehicleClassService } from '../../../_services/vehicle-class.service';
import { VehicleClass } from '../../../models/vehicle-class';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.scss']
})
export class AddvehicleComponent implements OnInit {

  constructor(private vehicleService:VehicleConfigService,
    private vehicleClassService:VehicleClassService,
    private router:Router
    ) { }
  vehicle:Vehicle=new Vehicle()

  vehicleClassHelper:Observable<VehicleClass>
  companyId:string="5fa40327ffae8c45db5fd07e"
  ngOnInit() {
    this.vehicleClassService.getAllVehicleClass().subscribe(
     data=>{
       console.log(data)
       this.vehicleClassHelper=data;
     }
    )
  }

  saveNewVehicle(){
    return this.vehicleService.AddNewVehicle(this.companyId,this.vehicle).subscribe(
      data=>{
        console.log("une u bera save"+data[8])
        this.router.navigateByUrl('/vehicle')
        
      }
    )
  }
}
