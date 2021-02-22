import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { VehicleIssue } from './../../../models/vehicle-issue';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiVehicleIssues } from '../../../_services/vehicle-issue.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from '../../../models/vehicle';
import { User } from '../../../models/user';
import { VehicleConfigService } from '../../../_services/vehicle-config.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})

export class IssuesListComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

      dataSaved=false;
      IssueData: any=[];
      vehicleName: String;
      allIssues: Observable<VehicleIssue[]>;
      listData: MatTableDataSource<VehicleIssue>;
      displayedColumns: string[]=[ 'part', 'status', 'description', 'actions'];
      public page=0;
      public size=5;
      public totalElements: number;
      private dialogRef: any;
      public toBeDeleted: any;
      
      user:User;
      vehicless: String[] = [];
      companyId: String;
      issueForm: any;
      public toBeEdited: any;
      status = new FormControl();
      // status: String[] = ['Demaged', 'In progress', 'Fixed'];


    constructor(
    private vehicleIssueService: ApiVehicleIssues,
    private router: Router,
    public dialog: MatDialog,
    private vehicleService: VehicleConfigService,
    private token:TokenStorageService,
    private toaster: ToastrService,
    public fb: FormBuilder
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
 
  getPage(event) {

    if(this.token.getToken()){
      this.user=this.token.getUser();
      this.companyId=this.user.id; }

      if (event != null) {
      this.size = event.pageSize;
      this.page = event.pageIndex;
    }

    return this.vehicleIssueService.getById(this.companyId).subscribe(
      data=> {

        this.listData=data;
        console.log(this.listData);

        }
    );

  }
 
  form(){
    this.issueForm = this.fb.group({
      id:'',
      vehicleId: '',
      part: ['', [Validators.required]],
      status: [''],
      description: [''],
     });
  }

  
  ngOnInit() {
    
    this.form();
    this.getPage(null);

    if(this.token.getToken()){
      this.user=this.token.getUser();
      this.companyId=this.user.id;
    }
   }
 
    loadAllIssues() {  
      this.allIssues = this.vehicleIssueService.getAll( this.page, this.size);     
    }


    @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;

    deleteIssue(index:number,element:any){
      let dialogRef = this.dialog.open(this.deleteDialog);
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'yes'){
        this.vehicleIssueService.deleteIssue(this.issueForm['vehicleId'] ,element.id).subscribe(
          ()=>{
            this.getPage(null);
           this.toaster.error("Deleted successfully!");
            this.dataSaved = true;
            this.loadAllIssues();
          },
          ()=>{
            this.toaster.error("Cannot be deleted! ");
          }
        );
      }
        
        else if (result === 'no') {
          this.dialog.closeAll();
        }
      });
    }

    editIssue(element, templateRef) {
      this.toBeEdited = element;
      this.dialogRef = this.dialog.open(templateRef);
  
      this.issueForm.patchValue({
        'id': this.toBeEdited.id,
        'vehicleId': this.toBeEdited.vehicleId,
        'part':this.toBeEdited.part,
        'status': this.toBeEdited.status,
        'description': this.toBeEdited.description
       
      })
      console.log(this.toBeEdited.id);
      console.log(this.toBeEdited.status);
      this.status=this.toBeEdited.status;
    }

    submitIssue(formValue) {
    
      let issues: VehicleIssue = new VehicleIssue();
    
      issues.id=formValue.id;
      issues.vehicleId = formValue.vehicleId;
      issues.part=formValue.part;
      issues.status=formValue.status;
      issues.description=formValue.description;
      
       this.vehicleIssueService.updateIssue(issues,this.issueForm['vehicleId']).subscribe(data=>{
        this.getPage(null);
        this.toaster.success("Service was edited")
        this.dialog.closeAll()
      }, error => {
        console.log(error)
        this.toaster.error("Cannot be edited! " + error.message)
      })
  
  }   

  closeDialog() {
    this.dialog.closeAll()
  }


    
}
