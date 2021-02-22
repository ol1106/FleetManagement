import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from '../../../models/address';
import { Driver } from '../../../models/driver';
import { Profile } from '../../../models/profile';
import { User } from '../../../models/user';
import { AuthService } from '../../../_services/auth.service';
import { DriverService } from '../../../_services/driver.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { VehicleConfigService } from '../../../_services/vehicle-config.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {
  form: any = {};
  isSignUpFailed = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  nameFormControl= new FormControl('',[
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(20)
  ]);
  usernameFormControl= new FormControl('',[
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);
  passwordFormControl=new FormControl('',[
    Validators.required,
    Validators.minLength(6)
  ]);

  matcher = new MyErrorStateMatcher();

  user:User;
  companyId:String;
  id:String;
  idCompany:String;
  driver:Driver=new Driver();
  isRegistered:Boolean=false;
  newUser:User;
  newUserId:String;
  role:Array<any>=new Array();
  vehicles:Array<String>=new Array();

  constructor(private authService:AuthService,
    private token:TokenStorageService,
    private toastr:ToastrService,
    private driverService:DriverService,
    private router:Router,
    private vehicleService:VehicleConfigService) { }

  ngOnInit() {
    this.user=this.token.getUser();
    this.companyId=this.user.id;
    this.role.push("DRIVER");
    this.form.role=this.role;
    this.driver.companyId=this.companyId;
  }

  onSubmit(){
    this.form.role=this.role;
    this.authService.register(this.form).subscribe(
      data => {
        this.newUser=data;
        this.driver.id=this.newUser.id;
        this.id=this.driver.id;
        this.isRegistered=true;
      },
      err => {
        this.toastr.error(err.error.message);
        this.isSignUpFailed = true;
      }
    );
    this.vehicleService.getAllVehicle(this.companyId).subscribe(
      data=>{
        this.vehicles=data;
      },
      error=>{
        this.toastr.error("No vehicles found!");
      }
    );
  }
  addDriver(){
    this.driver.id=this.id;
    this.driver.companyId=this.user.id;
    this.driver.profile=new Profile();
    this.driver.profile.email=this.newUser.email;
    this.driver.profile.addressDriver=new Address();
    
    this.driverService.addDriver(this.user.id,this.driver).subscribe(
      data=>{
        this.router.navigate(['/drivers']);
        this.toastr.success("Driver added successfully!");
      },
      err=>{
        this.toastr.error(err.error.message);
      }
    );
    this.driver = new Driver();
  }
}
