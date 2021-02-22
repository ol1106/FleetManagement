import { environment } from './../../../../environments/environment.prod';
import { VehicleServices } from './../../../models/vehicle-service';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatChipInputEvent } from '@angular/material';
import { ApiVehicleServices } from '../../../_services/vehicleServicesService';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';



@Component({
  selector: 'services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private vehicleService: ApiVehicleServices, 
    private router: Router, 
    private toasterServ: ToastrService, 
    public dialog: MatDialog,
    private formbuilder: FormBuilder,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute
    ) 
    
    {
    this.router.errorHandler = (error: any) => {
      let routerError = error.toString();
      if (routerError.indexOf('Cannot match any routes') >= 0 ) {
         this.router.navigate(['/404']);
      } else {
         throw error; 
      }
  }
   }

  ServiceData: any=[];
  dataSaved = false;  
  allServices: Observable<VehicleServices[]>; 
  listData:MatTableDataSource<VehicleServices>;
  private dialogRef: any;
  public toBeDeleted: any;
  serviceForm: FormGroup;
  displayedColumns: string[]=['name', 'time_freq', 'km_freq', 'parts', 'actions'];
  public toBeEdited: any;
  partsArray: String[] = [];
  public page=0;
  public size=5;
  public totalElements: number;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('partsInput') partsInput: ElementRef<HTMLInputElement>;
  @ViewChild('resetserviceForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  partsCtrl = new FormControl();

  ngOnInit() {
    
    this.serviceForm = this.formbuilder.group({
      id:[''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],  
      time_freq: ['', [Validators.required]],  
      km_freq: ['', [Validators.required]],  
      parts: [this.partsArray]
    });
    this.getPage(null);

}

loadAllServices() {  
  this.allServices = this.vehicleService.getAllByPage(this.page, this.size); 

}

  getPage(event) {
    if (event != null) {
    this.size = event.pageSize;
    this.page = event.pageIndex;
  }

   return this.vehicleService.getAllByPage( this.page, this.size).subscribe(data => {
    console.log(this.page, this.size);
    console.log(data);
    this.listData = data.content;
    console.log(this.listData);
    this.totalElements = data.totalElements;
  })
}


  deleteServices(id){
    this.vehicleService.deleteService(id).subscribe(()=>{
      this.getPage(null);
      this.toasterServ.error("Deleted successfully!")
       this.dataSaved=true;
         this.loadAllServices();
        },  error => {
        this.toasterServ.error("Cannot be deleted! " + error.message);
   });
      
  }

  closeDialog() {
    this.dialog.closeAll()
  }

  openDialog(element, templateRef) {
    this.toBeDeleted = element
    this.dialogRef = this.dialog.open(templateRef)
  }

  editService(element, templateRef) {
    this.toBeEdited = element;
    this.dialogRef = this.dialog.open(templateRef);

    this.serviceForm.patchValue({
      'id': this.toBeEdited.id,
      'name': this.toBeEdited.name,
      'time_freq': this.toBeEdited.time_freq,
      'km_freq': this.toBeEdited.km_freq,
      'parts': this.toBeEdited.parts
    });
    this.partsArray=this.toBeEdited.parts;
    console.log(this.toBeEdited.id);
    console.log(this.toBeEdited.parts);
  }

    submitService(formValue) {
    
    let services: VehicleServices = new VehicleServices();
  
    services.id=formValue.id;
    services.name = formValue.name;
    services.time_freq=formValue.time_freq;
    services.km_freq=formValue.km_freq;
    services.parts=formValue.parts;
    

     console.log(formValue.parts);
     this.vehicleService.updateService(services).subscribe(data=>{
      this.getPage(null);
      this.toasterServ.success("Service was edited")
      this.dialog.closeAll()
    }, error => {
      console.log(error)
      this.toasterServ.error("Cannot be edited! " + error.message)
    })

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
