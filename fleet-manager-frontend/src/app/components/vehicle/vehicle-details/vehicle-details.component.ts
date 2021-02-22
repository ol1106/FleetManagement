import { Component, OnInit } from '@angular/core';
import { VehicleConfigService } from '../../../_services/vehicle-config.service';
import { Vehicle } from '../../../models/vehicle';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  constructor(private VehicleService:VehicleConfigService, private rout:ActivatedRoute,
    private router:Router) { }
  id:string
  vehicleDetail:Vehicle

  ngOnInit() {
    this.getVehiclesById()
  }

  getVehiclesById(){
      this.id=this.rout.snapshot.paramMap.get('id');
      console.log(this.id);
      
      this.VehicleService.getVehicleById(this.id).subscribe(
        data=>{
          console.log(this.id)
          this.vehicleDetail=data
        }
      )
  }

  DeleteVehicle(id:string){
    return this.VehicleService.DeleteById(id).subscribe(
      data=>{
        console.log(data);
        this.router.navigateByUrl('/vehicle')
      }
    )
  }

}
