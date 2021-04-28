import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { ListCompanyComponent } from './components/list-company/list-company.component';
import { UpdateCompanyComponent } from './components/update-company/update-company.component';

const routes: Routes = [
  {
    path: '', 
    data: {
      title: 'Company'
    },
    children: [
      {
        path: '',
        component: CompanyComponent,
      }
      ,
      {
        
        path: 'add-company',
        component: AddCompanyComponent,
        data: {
          title: 'Add'
        }
      },
      {
        path: 'update-company/:id',
        component: UpdateCompanyComponent,
        data: {
          title: 'Update'
        }
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
