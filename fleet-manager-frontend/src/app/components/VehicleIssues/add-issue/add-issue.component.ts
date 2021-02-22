import { VehicleServices } from './../../../models/vehicle-service';
import { VehicleIssue } from './../../../models/vehicle-issue';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, NgZone, OnInit, ContentChild, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiVehicleIssues } from '../../../_services/vehicle-issue.service';
import { MatFormField, MatFormFieldControl, MatInputModule} from '@angular/material';
import { Vehicle } from '../../../models/vehicle';
import { VehicleConfigService } from '../../../_services/vehicle-config.service';
import { List } from 'lodash';
import { User } from '../../../models/user';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss']
})


export class AddIssueComponent implements OnInit {
  // @ContentChild(MatFormFieldControl) _control: MatFormFieldControl<any>;
  // @ViewChild(MatFormField) _matFormField: MatFormField;

  //issueForm: FormGroup;
  issueForm: any;
  // VehicleArray: any = ['5fa3db7ae34ef7400da76628'];
  VehicleIssue = new VehicleIssue();
  getAllVehicle: Vehicle[];
  user: User;
  companyId: String;
  
  vehicless:String[] = [];
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private vehicleIssueService: ApiVehicleIssues,
    private vehicleService: VehicleConfigService,
    private token:TokenStorageService,
    private toaster: ToastrService 
  ) { }


  ngOnInit():void {
   
      this.issueForm = this.fb.group({
      vehicleId: ['',  [Validators.required]],
      part: ['', [Validators.required]],
      status: ['Demaged'],
      description: [''],
     });

     if(this.token.getToken()){
      this.user=this.token.getUser();
      this.companyId=this.user.id;
    }

    console.log("id"+this.companyId);
    
    this.vehicleService.getAllVehicle(this.companyId).subscribe(
      data=>{ 
       this.vehicless=data;
        console.log(this.vehicless);  
        
      },
      error=>{
        this.toaster.error("No vehicles found!");
       
      });
  }
  /* Submit issue */
      saveIssue(): void{
      if (this.issueForm.valid) {
        console.log(this.issueForm.value);
       console.log(this.issueForm.get('vehicleId').value);
        this.vehicleIssueService.addVehicleIssue(this.issueForm.get('vehicleId').value, this.issueForm.value).subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl('vehicleIssueList'));
          this.toaster.success("Issue added succesfully");
            },error=>{
              this.toaster.error("Issue not added!");
             } );
      }
    }

   /* Get errors */
   public handleError = (controlName: string, errorName: string) => {
    return this.issueForm.controls[controlName].hasError(errorName);
  } 

  onClear(){
    this.issueForm.reset();
  }


//  this.vehicless = this.vehicleService.getAll();
  
//  foods:  vehicles[]= this.a;

  
}
