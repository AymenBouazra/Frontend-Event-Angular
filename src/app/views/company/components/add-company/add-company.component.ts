import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  submitted = false;
  companyForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    companyName: new FormControl('', [Validators.required]),
    companyDescription: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  AddCompany() {
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }
    let Companies = JSON.parse(localStorage.getItem('companies') || '[]');
    Companies.push(this.companyForm.value);
    localStorage.setItem('companies', JSON.stringify(Companies));
    this.router.navigateByUrl('/companies')

  }
}
