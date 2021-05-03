import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { EventsComponent } from './events/events.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './navbar/navbar.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch : 'full'
  },
  {
    path:'',component:HomeComponent, children:[
      {
        path:'index' , component:IndexComponent
      },
      {
        path: 'about', component:AboutComponent
      },
      {
        path: 'events', component:EventsComponent
      },
      {
        path: 'contact',component:ContactComponent
      },
    ]
  },
  {
    path:'navbar',component:NavbarComponent
  },
  {
    path: 'footer',component:FooterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
