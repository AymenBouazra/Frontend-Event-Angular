import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { SearchPipe } from './pipes/search.pipe';



@NgModule({
  declarations: [
    CompanyComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    ModalModule.forRoot(),
  ]
})
export class CompanyModule { }
