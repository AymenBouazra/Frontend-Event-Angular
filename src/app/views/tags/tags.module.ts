import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';
import { AddTagComponent } from './add-tag/add-tag.component';
import { UpdateTagComponent } from './update-tag/update-tag.component';


@NgModule({
  declarations: [
    TagsComponent,
    AddTagComponent,
    UpdateTagComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule
  ]
})
export class TagsModule { }