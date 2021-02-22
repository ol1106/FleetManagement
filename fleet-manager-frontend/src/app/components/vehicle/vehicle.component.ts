import { Component, OnInit } from '@angular/core';
import { VehicleConfigService } from '../../_services/vehicle-config.service';
import { Observable } from 'rxjs';
import { Vehicle } from '../../models/vehicle';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})

export class VehicleComponent implements OnInit {
  displayedColumns: string[] = ['consumption','enginePower','fleetId','id','maxCapacity','name','vehicleClassId','vehicleServicesId'];
  vehicles:Observable<Vehicle[]>
  dataSource:MatTableDataSource<Vehicle[]>;

  constructor(private serviceVehice:VehicleConfigService,
    private router:Router
    ) { }
  

  ngOnInit() {
    this.getAll();
  }
  companyId:string="5fa40327ffae8c45db5fd07e"

  getAll(){
    return this.serviceVehice.getAllVehicle(this.companyId).subscribe(
    (data)=>{this.vehicles=data ,
      this.dataSource=data,
      console.log(this.dataSource)
      
      
        console.log(data)}
    )

  }

  navigateTo(row: any) {
    this.router.navigateByUrl('vehicles/'+row.id);
  } 

}
