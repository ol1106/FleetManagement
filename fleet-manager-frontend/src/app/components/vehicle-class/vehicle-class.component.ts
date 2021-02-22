import { Component, OnInit } from '@angular/core';
import { VehicleClassService } from '../../_services/vehicle-class.service';
import { Observable } from 'rxjs';
import { VehicleClass } from '../../models/vehicle-class';


@Component({
  selector: 'vehicle-class',
  templateUrl: './vehicle-class.component.html',
  styleUrls: ['./vehicle-class.component.scss']
})
export class VehicleClassComponent implements OnInit {
  vehicleClasses:Observable<VehicleClass[]>

  constructor(private service:VehicleClassService) { }

  ngOnInit() {
    this.getAllVehicleClass()
      }


    getAllVehicleClass(){
      this.service.getAllVehicleClass().subscribe(
        data=>this.vehicleClasses=data )}
 
    deleteVehicle(Id:string){
      if(confirm("Are you sure you want to delete this type?")){
      this.service.deleteVehicleCLass(Id).subscribe(
        data=>{
          console.log(data);
          this.getAllVehicleClass();
        },
        error=>{
          console.log(error);
        }
      );
      }
    }
  }

  

