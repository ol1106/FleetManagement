import { Component, OnInit } from '@angular/core';
import { VehicleClassService } from '../../../_services/vehicle-class.service';
import { VehicleClass } from '../../../models/vehicle-class';
import { Router } from '@angular/router';

@Component({
  selector: 'add-vehicle-class',
  templateUrl: './add-vehicle-class.component.html',
  styleUrls: ['./add-vehicle-class.component.scss']
})
export class AddVehicleClassComponent implements OnInit {

  constructor(private service:VehicleClassService,
    private router:Router
    ) { }
  vehicleClass= new VehicleClass();
  selectedFile: File;
  url:any;


  ngOnInit() {
  }



  SaveVehicleClass(){
    console.log('te pkt jam ketu')
    this.service.addNewVehicleClass(this.vehicleClass).subscribe(
      data=>{console.log('data'+data)
      this.router.navigateByUrl("/home")
    }
    )
      // this.router.navigateByUrl("/expense")

    }
    updateFile(event:Event) {
      this.selectedFile = (event.target as HTMLInputElement).files[0];
      if(this.selectedFile.size>2097152){
        alert("File is too big!");
      }
      else{
      var reader=new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload=(event)=>{
        this.url=reader.result;
      }
      
     }
    }


}
