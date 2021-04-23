import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTagComponent } from './add-tag/add-tag.component';
import { TagsComponent } from './tags.component';
import { UpdateTagComponent } from './update-tag/update-tag.component';

const routes: Routes = [
  { 
    path: '',
    data:{
      title: 'Tags'
    },
    children:[
      {
        path:'',
        component: TagsComponent
      },
      {
        path: 'AddTag',
        component: AddTagComponent,
        data:{
          title: 'Add Tag'
        }
      },
      {
        path: 'UpdateTag',
        component: UpdateTagComponent,
        data:{
          title: 'Update Tag'
        }
      }
    ]
     }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
