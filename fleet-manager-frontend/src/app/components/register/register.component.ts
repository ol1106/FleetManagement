import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../_services/auth.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSignUpFailed = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
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

  constructor(private authService: AuthService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/allCompanies']);
      },
      err => {
        this.toastr.error("Sign up failed please try again!");
        this.isSignUpFailed = true;
      }
    );
  }

}

