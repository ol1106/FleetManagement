import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Driver } from '../../models/driver';
import { User } from '../../models/user';
import { Vehicle } from '../../models/vehicle';
import { DriverService } from '../../_services/driver.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { VehicleConfigService } from '../../_services/vehicle-config.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  displayedColumns: String[]=['position','name','email','phoneNr','state','city','update','delete'];
  drivers:Observable<Driver[]>;
  dataSource:MatTableDataSource<Driver[]>;
  user:User;
  driver:Driver;
  companyId:String;
  page:number=0;
  size:number=10;
  edit=false;
  pages:Array<number>;
  selection:SelectionModel<Driver[]>;
  vehicles:Array<Vehicle>;
  nameFormControl= new FormControl('',[
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(20)
  ]);

  constructor(private driverService:DriverService,
    private token:TokenStorageService,
    private toastr:ToastrService,
    private vehicleService:VehicleConfigService,
    private dialog:MatDialog) { }

    @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    if(this.token.getToken()){
      this.user=this.token.getUser();
      this.companyId=this.user.id;
    }
    this.driverService.getAllDrivers(this.companyId,this.page,this.size).subscribe(
      data=>{
        this.drivers=data['content'];
        this.dataSource=new MatTableDataSource<Driver[]>(data['content']);
        this.dataSource.paginator = this.paginator;
      },
      error=>{
        this.toastr.error("No drivers found!");
      }
    );
  }
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  deleteDriver(index:number,element:any){
    let dialogRef = this.dialog.open(this.deleteDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes'){
      this.driverService.deleteDriver(this.companyId,element.id).subscribe(
        ()=>{
          const data=this.dataSource.data;
          data.splice(index,1);
          this.dataSource.data=data;
          this.toastr.success("Driver deleted!");
        },
        ()=>{
          this.toastr.error("Driver not deleted,please try again!");
        }
      );
      }
      else if (result === 'no') {
        this.dialog.closeAll();
      }
    });
  }
  @ViewChild('updateDialog') updateDialog: TemplateRef<any>;
  updateDriver(element:any){
    this.driverService.getDriverById(element.id).subscribe(
      data=>{
        this.driver=data;
        
        this.vehicleService.getAllVehicle(this.driver.companyId).subscribe(
          data=>{
            this.vehicles=data;
          }
        );
      },
      error=>{
        this.toastr.error("Couldn't find this driver!");
      }
    );
    let dialogRef = this.dialog.open(this.updateDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result==='yes'){
        this.driverService.updateDriver(element.id,this.driver).subscribe(
          data=>{
            console.log(data);
            
          },
          err=>{
            console.log(err.error.message);
            
          }
        );
      }
      else if(result==='no'){
        this.dialog.closeAll();
      }
    });
  }
  loadAllDrivers() {  
    this.driverService.getAllDrivers(this.companyId,this.page,this.size);  
  }

}
