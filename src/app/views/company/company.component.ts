import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from './services/company.service';
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2'
import { SweetAlertService } from '../../providers/sweet-alert.service';
import { LoginregisterService } from '../login/services/loginregister.service';

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
    photo: new FormControl('', [Validators.required]),
  });
  companyid: number;
  file: any;
  selectedFile: any;
  connectedCompanyId: any;
  connectedCompanyRole: any;
  

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private sweetAlert: SweetAlertService,
    private loginService: LoginregisterService,
  ) { }

  ngOnInit(): void {
    this.companyService.getAllCompnanies().subscribe(response => {
      this.company = response;
    });
    const token = localStorage.getItem('token');
    let decoded: any = jwt_decode(token);
    this.connectedCompanyId = decoded.companyId;
    this.connectedCompanyRole = decoded.companyRole;
    // console.log(this.connectedCompanyRole);
    
  }

  onSelectFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.companyForm.patchValue({
      photo: file
    });
    this.companyForm.get('photo').updateValueAndValidity()
    this.file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    let pattern = /image-*/;
    if (this.file) {
      if (!this.file.type.match(pattern)) {
        this.toastr.error('Please select an image file.', 'File not valid!');
        return;
      } else {
        this.selectedFile = this.file;
        let reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onloadend = () => {
          const base64String = (<string>reader.result).replace("data:", "").replace(/^.+,/, "");
          this.companyForm.controls.photo.setValue("data:image/jpeg;base64," + base64String.toString())
        };
      }
    }
  }

  addCompany=()=> {
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }
    const companyModalForm = this.companyForm.value;
    delete companyModalForm.photo
    let formData: any = new FormData();
    Object.keys(companyModalForm).forEach(fieldName => {
      formData.append(fieldName, companyModalForm[fieldName]);
    });
    formData.append("photo", this.selectedFile, this.selectedFile.name);
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
    this.sweetAlert.deleteConfirmation('company').then((result) => {
      if (result.value) {
        this.companyService.deleteCompanyById(i).subscribe((response: any) => {
          this.toastr.success('Company succesfully deleted.', 'Company deleted !');;
          this.ngOnInit()
        }, (error) => {
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Company is not deleted',
          'error'
        )
      }
    })
  }

  updateCompany() {
    this.submitted = true;
    const companyModalForm = this.companyForm.value;
    delete companyModalForm.photo
    let formData: any = new FormData();
    Object.keys(companyModalForm).forEach(fieldName => {
      formData.append(fieldName, companyModalForm[fieldName]);
    });
    formData.append("photo", this.selectedFile, this.selectedFile.name);
    this.companyService.updateCompanyDataById(formData, this.companyid).subscribe((response: any) => {
      this.loginService.setAvatar(response.photo);
      localStorage.setItem('avatar',response.photo)
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