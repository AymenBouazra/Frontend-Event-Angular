import { HttpClient } from '@angular/common/http';
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
  companyForm: FormGroup = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    companyDescription: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required]),
    uploadPhoto:new FormControl('', []), 
    
  });
  
 

  constructor(private router: Router,private company:CompanyService,private toastr:ToastrService,private http :HttpClient) { }

  ngOnInit(): void {
  }
  AddCompany() {
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }
    this.company.postCompany(this.companyForm.value).subscribe((response: any) => {
      this.toastr.success( this.companyForm.value.companyName+' Added successfully','Company added');
      this.router.navigateByUrl('/companies')
      
    },
      (error) => {
        console.log(error);
        this.toastr.error( 'Failed to add','Company not added');
      })

  }
}
