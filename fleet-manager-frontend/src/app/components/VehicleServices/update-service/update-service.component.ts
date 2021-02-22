import { MatChipInputEvent } from '@angular/material';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { VehicleServices } from '../../../models/vehicle-service';
import { ApiVehicleServices } from '../../../_services/vehicleServicesService';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.scss']
})
export class UpdateServiceComponent implements OnInit {
  dataSaved = false;  
  serviceForm: FormGroup;
  VehicleServices:VehicleServices= new VehicleServices();
  partsArray: String[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('partsInput') partsInput: ElementRef<HTMLInputElement>;
  @ViewChild('resetserviceForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  partsCtrl = new FormControl();

  ngOnInit() {
    this.updateServiceForm();
    
 }
    constructor(
    private formbuilder: FormBuilder,
    private vehicleService: ApiVehicleServices,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute) {

      // var id = this.actRoute.snapshot.paramMap.get('id');
      // this.vehicleService.getById(id).subscribe(data =>{
      //   console.log(data);
      //     this.partsArray= data.parts ;
      //     console.log(data.parts);
      //     this.serviceForm = this.formbuilder.group({
      //     name: [data.name, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      //     time_freq: [data.time_freq, [Validators.required]],  
      //     km_freq: [data.km_freq, [Validators.required]],  
      //     parts: [data.parts]
      //    })
      //   },
      //   error=>console.log("data error" )
      //   )
     }
 
  updateServiceForm() {
    this.serviceForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      time_freq: ['', [Validators.required]],  
      km_freq: ['', [Validators.required]],  
      parts: [this.partsArray]
    })
  }

  //    /* Update service */  
  // updateService(id) {
  //   console.log(this.serviceForm.value);
  //   var id = this.actRoute.snapshot.paramMap.get('id');
  //   if (window.confirm('Are you sure you want to update?')) {
  //     this.vehicleService.updateService(this.serviceForm.value, id).subscribe(res => {
  //       this.ngZone.run(() => this.router.navigateByUrl('/vehicleServiceList'))
  //     });
  //   }
  //   else{
  //   console.log("update failed");
  //   }
  // }

     /* Add dynamic parts */
 
   add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add parts
    if ((value || '').trim() && this.partsArray.length < 5) {
      this.partsArray.push( value.trim())
     }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  
  /* Remove dynamic parts */    
  remove(partsArray: String): void {
    const index = this.partsArray.indexOf(partsArray);
    if (index >= 0) {
      this.partsArray.splice(index, 1);
    }
  }

  

}
