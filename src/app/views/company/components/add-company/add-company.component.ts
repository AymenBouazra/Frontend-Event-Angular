import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../services/company.service';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  submitted = false;
  loginSubmitted=false;
  companyForm: FormGroup = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    companyDescription: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required]),
  });
  
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router,private company:CompanyService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  AddCompany() {
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }
    this.company.postCompany(this.companyForm.value).subscribe((response: any) => {
      this.toastr.success( this.companyForm.value.companyName+' Added successfully','Company added');
      
    },
      (error) => {
        console.log(error);
        this.toastr.error( 'Failed to add','Company not added');
      })

  }
  login() {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.company.loginCompany(this.loginForm.value).subscribe((response: any) => {
      this.router.navigate(['/dashboard'])
      this.toastr.success( 'You are succesfully logged in !.','Logged in');
    },
      (error) => {
        console.log(error);
        this.toastr.error( 'Please verify your email and password!','Login Failed');
      })

  }

}
