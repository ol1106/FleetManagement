import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Address} from "../../models/address";
import {CompanyService} from "../../_services/company.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Company} from "../../models/company";

@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor(public dialog: MatDialog,
      private companyService:CompanyService,
      private formBuilder: FormBuilder,
      private toastrService:ToastrService) {
  }

  private dialogRef: any;
  public dataSource: any = [];
  public toBeDeleted: any;
  public toBeEdited: any;
  public formGroup: FormGroup;
  public page=0;
  public size=5;
  public totalElements;
  fileToUpload: File = null;

  displayedColumns = ['position','logo', 'name', 'address', 'email', 'description', 'actions'];

  ngOnInit() {
    this.getPage(null);
    this.formGroup = this.formBuilder.group({
      'id': [null],
      'logo': [null],
      'name': [null],
      'state': [null],
      'city': [null],
      'postalCode': [null],
      'email': [null],
      'description': [null]
    });
  }

  deleteCompany(id) {
    this.companyService.deleteCompany(id).subscribe(data => {
      this.getPage(null);
      this.toastrService.success("Deleted successfully!")
    }, error => {
      this.toastrService.error("Cannot be deleted! " + error.message)
    })
  }

  closeDialog() {
    this.dialog.closeAll()
  }

  openDialog(element, templateRef) {
    this.toBeDeleted = element
    this.dialogRef = this.dialog.open(templateRef)
  }

  photoDialog(element, templateRef) {
    this.toBeEdited = element
    this.dialogRef = this.dialog.open(templateRef)
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
  }

  upload() {
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = () => {
      console.log(reader.result);
      this.toBeEdited.logo = reader.result;
      this.companyService.editCompany(this.toBeEdited).subscribe(data=>{
        this.getPage(null);
        this.toastrService.success("Logo was assigned")
        this.dialog.closeAll()
      }, error => {
        this.toastrService.error("Cannot be assigned! " + error.message)
      })
    };
  }

  editCompany(element, templateRef) {
    this.toBeEdited = element
    this.dialogRef = this.dialog.open(templateRef)
    this.formGroup.patchValue({
      'id':this.toBeEdited.id,
      'logo':this.toBeEdited.logo,
      'name': this.toBeEdited.name,
      'state': this.toBeEdited.address.state,
      'city': this.toBeEdited.address.city,
      'postalCode': this.toBeEdited.address.postalCode,
      'email': this.toBeEdited.email,
      'description': this.toBeEdited.description
    })
  }

  submitEdit(formValue) {
    let company : Company = new Company();
    let address : Address = new Address();
    company.address=address;
    company.id=formValue.id;
    company.logo=formValue.logo;
    company.name=formValue.name;
    company.address.state=formValue.state;
    company.address.city=formValue.city;
    company.address.postalCode=formValue.postalCode;
    company.email=formValue.email;
    company.description=formValue.description;
    this.companyService.editCompany(company).subscribe(data=>{
      this.getPage(null);
      this.toastrService.success("Company was edited")
      this.dialog.closeAll()
    }, error => {
      console.log(error)
      this.toastrService.error("Cannot be edited! " + error.error)
    })

  }

  getPage(event) {
    if (event != null) {
      this.size = event.pageSize;
      this.page = event.pageIndex;
    }
    this.companyService.getPageCompany(this.page,this.size).subscribe(data => {
      console.log(data);
      this.dataSource = data.content;
      this.totalElements = data.totalElements;
    })
  }

}
