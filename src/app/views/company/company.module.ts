import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { UpdateCompanyComponent } from './components/update-company/update-company.component';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AngularFileUploaderModule } from "angular-file-uploader";



@NgModule({
  declarations: [
    CompanyComponent,
    AddCompanyComponent,
    UpdateCompanyComponent
    
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFileUploaderModule
  ]
})
export class CompanyModule { }
