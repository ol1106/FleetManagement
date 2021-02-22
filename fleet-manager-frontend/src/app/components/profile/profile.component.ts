import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith,map } from 'rxjs/operators';
import { Address } from '../../models/address';
import { Driver } from '../../models/driver';
import { User } from '../../models/user';
import { CompanyService } from '../../_services/company.service';
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
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  nameFormControl= new FormControl('',[
    Validators.minLength(2),
    Validators.maxLength(20)
  ]);
  emailFormControl = new FormControl('', [
    Validators.email
  ]);
  noPhoto=false;
  editMode=false;
  id:String;
  user:User;
  driver:Driver;
  email:String;
  companyName:String;
  vehicleName:String;
  selectedFile:File;
  address:Address=new Address();
  url:any;
  phoneNumberControl=new FormControl('', [
    Validators.minLength(10),
    Validators.maxLength(10)
  ]);
  options: string[] = ['Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'The Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
   ' Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
   ' Côte d’Ivoire',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
   ' Dominican Republic',
    'East Timor(Timor - Leste)',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
   ' Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
   ' Gabon',
    'The Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea - Bissau',
    'Guyana',
    'Haiti',
   ' Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
   ' Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea, North',
    'Korea, South',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar(Burma)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
   ' North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Sudan, South',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe'];
    myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  constructor(private token:TokenStorageService,
    private driverService:DriverService,
    private companyService:CompanyService,
    private vehicleService:VehicleConfigService,
    private router:Router) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    if(this.token.getUser){
      this.user=this.token.getUser();
      if(this.user.roles.includes("COMPANY") || this.user.roles.includes("ADMIN")){
        this.router.navigate(['/']);
      }
      this.driverService.getDriverById(this.user.id).subscribe(
        data=>{
          console.log(data);
          this.driver=data;
          if(this.driver.profile.photo==null){
            this.noPhoto=true;
          }
          this.companyService.getCompanyById(this.driver.companyId).subscribe(
            data=>{
              this.companyName=data.name;
            }
          );
          this.vehicleService.getVehicleById(this.driver.vehicleId).subscribe(
            data=>{
              this.vehicleName=data.name;
            }
          );
          
        },
        err=>{
          console.log("error");
        }
      );
    }

    
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  updateDriver(){
    this.driverService.updateDriver(this.user.id,this.driver).subscribe(
      data=>{
        console.log(data);
        this.editMode=false;
      },
      error=>{
        console.log(error);
        
      }
    );
  }
  editForm(){
    this.editMode=true;
  }
  finish(){
    this.updateDriver();
  }
  addPhoto(){
    document.getElementById('photo').click();  
  }
  updateFile(e:Event) {
    this.selectedFile = (e.target as HTMLInputElement).files[0];
    if(this.selectedFile.size>2097152){
      alert("File is too big!");
    }
    else{
    var reader=new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload=()=>{
      this.url=reader.result;
      this.driver.profile.photo=this.url;
      this.noPhoto=false;
      this.driverService.updateDriver(this.driver.id,this.driver).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
        
      }
    );
    }
    
  }
}
}
