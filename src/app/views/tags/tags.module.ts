import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchPipe } from './pipes/search.pipe';




@NgModule({
  declarations: [
    TagsComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ]
})
export class TagsModule { }
