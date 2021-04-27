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
  loginSubmitted = false;
  updateCompanyForm: FormGroup = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    companyDescription: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required]),
  });
  id: any;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private companyService: CompanyService) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];
    // console.log(this.id);
    this.loadCompany();


  }
  loadCompany() {
    this.companyService.getcompanyByid(this.id).subscribe((response: any) => {

      this.updateCompanyForm.patchValue(response);
    });



  }
  saveCompany() {

    this.submitted = true;
    if (this.updateCompanyForm.invalid) {
      return;
    }


    let updatecompanyData = this.updateCompanyForm.value;
    this.companyService.updateCompanyDataByid(updatecompanyData, this.id).subscribe((rsponse: any) => {
      this.updateCompanyForm.reset();
      this.submitted = false;
      this.router.navigate(['/companies'])

    });



  }

}
