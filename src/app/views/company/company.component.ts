import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from './services/company.service';
import jwt_decode from "jwt-decode";



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
    // photo: new FormControl('', []),

  });
  companyid: number;
  file: any;
  selectedFile: any;
  connectedCompanyId:any;
  constructor(private router: Router, private companyService: CompanyService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.companyService.getAllCompnanies().subscribe(response => {
      this.company = response;
    });
    const token = localStorage.getItem('token');
    let decoded: any = jwt_decode(token);
    this.connectedCompanyId = decoded.companyId 
        
  }

  onSelectFile(event) {
    // const file = (event.target as HTMLInputElement).files[0];
    // this.companyForm.patchValue({
    //   photo: file
    // });
    // this.companyForm.get('photo').updateValueAndValidity()
    this.file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    let pattern = /image-*/;
    if (this.file) {
      if (!this.file.type.match(pattern)) {
        this.toastr.error('Please select an image file.', 'File not valid!');
        return;
      } else {
        this.selectedFile= this.file;
        // let reader = new FileReader();
        // reader.readAsDataURL(this.file);
        // reader.onloadend = () => {
        //   const base64String = (<string>reader.result).replace("data:", "").replace(/^.+,/, "");
        //    this.companyForm.controls.photo.setValue("data:image/jpeg;base64," + base64String.toString())
        // };
      }
    }
  }
  addCompany() {
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }

    let formData: any = new FormData();
    Object.keys(this.companyForm.value).forEach(fieldName => {
      formData.append(fieldName, this.companyForm.value[fieldName]);
    });

    formData.append("photo", this.selectedFile, this.selectedFile.name); console.log(formData);
    
    
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

    
      this.submitted = true;
      let formData: any = new FormData();
      Object.keys(this.companyForm.value).forEach(fieldName => {
        formData.append(fieldName, this.companyForm.value[fieldName]);
      });
      formData.append("photo", this.selectedFile, this.selectedFile.name); 
      this.companyService.updateCompanyDataByid(formData, this.companyid).subscribe((response: any) => {
        this.toastr.success('Company succesfully updated.', 'Company updated !');
        this.hide();
        this.ngOnInit();
      }, (error) => {
      })
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