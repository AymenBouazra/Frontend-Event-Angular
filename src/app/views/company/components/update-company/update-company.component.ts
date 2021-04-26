import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {
  submitted = false;
  loginSubmitted=false;
  updateCompanyForm: FormGroup = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    companyDescription: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required]),
  });
  index: any;
  CompanyService: any;

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private company:CompanyService) { }

  ngOnInit(): void {

    this.index = this.activatedRoute.snapshot.params['i'];
    // console.log(this.index);
    this.loadCompany();


  }
  loadCompany(){
    let companyData = this.CompanyService.getcompanyByindex(this.index) ;
    this.updateCompanyForm.patchValue(companyData);


  }
  saveCrud()
  {
    this.submitted = true;
    if(this.updateCompanyForm.invalid)
    {
      return ;
    }

    
    let updateProductData=this.updateCompanyForm.value;
    this.CompanyService.updateProductDataByIndex(updateProductData,this.index);

    
    this.updateCompanyForm.reset();
    this.submitted = false;

    
     this.router.navigate(['/companies'])

  }

}
