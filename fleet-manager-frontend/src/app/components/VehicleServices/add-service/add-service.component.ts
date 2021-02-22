import { VehicleServices } from './../../../models/vehicle-service';
import { FusePerfectScrollbarDirective } from './../../../../../@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { ApiVehicleServices } from './../../../_services/vehicleServicesService';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})

export class AddServiceComponent implements OnInit {
  dataSaved = false;  
  serviceForm: any;
  VehicleServices= new VehicleServices();
  partsArray: String[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  
  @ViewChild('partsInput') partsInput: ElementRef<HTMLInputElement>;
  @ViewChild('resetserviceForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  partsCtrl = new FormControl();


  constructor(
    private formbuilder: FormBuilder,
    private vehicleService: ApiVehicleServices,
    private router: Router,
    private ngZone: NgZone,
    private toasterServ: ToastrService
    
    ) { }

    /* Reactive service form */
    ngOnInit():void {
        this.serviceForm = this.formbuilder.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],  
        time_freq: ['', [Validators.required]],  
        km_freq: ['', [Validators.required]],  
        parts: [this.partsArray]
      });
     }

   onClear(){
    //  this.serviceForm.reset();
    this.partsArray=[];
    this.serviceForm.reset();
   
     }

   saveService():void{
    this.serviceForm['parts'] =["parts1","parts3"];
    this.vehicleService.addVehicleService(this.serviceForm.value).subscribe(
      data => {
        
        console.log( this.serviceForm['parts']);
        console.log(this.partsArray);
       this.ngZone.run(() => this.router.navigateByUrl('/vehicleServiceList'))
        this.toasterServ.success("Service addedd successfully");
       },
      errorMsg =>{
      this.toasterServ.error("Services is not added  " + errorMsg.message)
       });
  }

   /* Add dynamic parts */
   add(event: MatChipInputEvent){
    const input = event.input;
    const value = event.value;
    // Add parts of the service
    if ((value || '').trim() && this.partsArray.length < 5) {
      this.partsArray.push( value.trim())
     }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.partsCtrl.setValue(null);

  }
      /* Remove dynamic parts */    
      remove(partsArray: String): void {
        const index = this.partsArray.indexOf(partsArray);
        if (index >= 0) {
          this.partsArray.splice(index, 1);
        }
      }
}

 