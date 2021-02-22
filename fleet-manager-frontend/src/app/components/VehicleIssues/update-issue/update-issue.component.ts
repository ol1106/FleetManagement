import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleIssue } from '../../../models/vehicle-issue';
import { ApiVehicleIssues } from '../../../_services/vehicle-issue.service';

@Component({
  selector: 'update-issue',
  templateUrl: './update-issue.component.html',
  styleUrls: ['./update-issue.component.scss']
})
export class UpdateIssueComponent implements OnInit {

  issueForm: any;
  VehicleArray: any = ['5fa3db7ae34ef7400da76628'];
  VehicleIssue = new VehicleIssue();
  @ViewChild('resetissueForm') myNgForm;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private vehicleIssueService: ApiVehicleIssues
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.vehicleIssueService.getById(id).subscribe(data=>{
      console.log(data);
      this.issueForm=this.fb.group({
      vehicleId: [data.vehicleId, [Validators.required]],
      part: [data.part, [Validators.required]],
      status: [data.status],
      description: [data.description]
      })
    },
    error=> console.log("error with data")
    )
   }

   ngOnInit() {
    this.updateIssueForm();
}


  updateIssueForm(){
  this.issueForm=this.fb.group({
    vehicleId: ['', [Validators.required]],
      part: ['', [Validators.required]],
      status: [''],
      description: ['']
  })
}

// updateIssue(){
//   console.log(this.issueForm.value);
//   var id = this.actRoute.snapshot.paramMap.get('id');
//   if(window.confirm('Are you sure you want to update?')){
//     this.vehicleIssueService.updateIssue(this.issueForm.value, id).subscribe(res=>{
//       this.ngZone.run(() => this.router.navigateByUrl('/vehicleIssueList'))
//      });
//   }
//   else{
//     console.log("update failed");
//     }
// }
 
/* Get errors */
   public handleError = (controlName: string, errorName: string) => {
    return this.issueForm.controls[controlName].hasError(errorName);
  } 

  onClear(){
    this.issueForm.reset();
  }
  





}
