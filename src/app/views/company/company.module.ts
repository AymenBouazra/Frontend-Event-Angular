import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AngularFileUploaderModule } from "angular-file-uploader";



@NgModule({
  declarations: [
    CompanyComponent, 
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    ModalModule.forRoot(),
  ]
})
export class CompanyModule { }
