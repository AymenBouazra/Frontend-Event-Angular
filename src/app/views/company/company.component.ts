import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from './services/company.service';




@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  searchText: any;
  company: any;
  hideInputPassword = false;
  submitted = false;
  showUpdateButton = false;
  modalTitle: string = 'Add company'
  companyForm: FormGroup = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    companyDescription: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required]),
    photo: new FormControl('', []),

  });
  companyid: number;

  constructor(private router: Router, private companyService: CompanyService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.companyService.getAllCompnanies().subscribe(response => {
      this.company = response;
    });

  }

  upload(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.companyForm.patchValue({
      photo: file
    });
    this.companyForm.get('photo').updateValueAndValidity()
  }
  addCompany() {
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }

    const formData: any = new FormData();
    formData.append("photo", this.companyForm.get('photo').value);
    this.companyService.postCompany(formData).subscribe((response: any) => {
      this.toastr.success(this.companyForm.value.companyName + ' Added successfully', 'Company added');
      this.ngOnInit();
      this.hide();



    },
      (error) => {
        console.log(error);
        this.toastr.error('This email ' + this.companyForm.value.email + ' alreay exists, please enter an other email!', 'Register Failed');
      })

  }
  deletecompany(i: number) {

    this.companyService.deleteCompanyById(i).subscribe((response: any) => {
      this.toastr.warning('Company succesfully deleted.', 'Company deleted !');;
      this.ngOnInit()
    }, (error) => { })
    console.log(i);


  }
  updateCompany() {

    {
      this.submitted = true;
      this.companyService.updateCompanyDataByid(this.companyForm.value, this.companyid).subscribe((response: any) => {
        this.toastr.success('Company succesfully updated.', 'Company updated !');
        this.hide();
        this.ngOnInit();
      }, (error) => {

      })
    }

  }

  showAdd() {
    this.modal.show()
    this.showUpdateButton = false;
    this.hideInputPassword = true;
  }
  showUpdate(id: number) {
    this.showUpdateButton = true;
    this.hideInputPassword = false;
    this.modalTitle = 'Update company'
    this.companyid = id
    this.modal.show()
    this.companyService.getcompanyByid(id).subscribe((response: any) => {
      this.companyForm.patchValue(response);
      this.ngOnInit()
    }, (error) => {

    })
  }
  hide() {
    this.modal.hide();
    this.modalTitle = 'Add company'
    this.companyForm.reset()
    this.submitted = false;
  }

}