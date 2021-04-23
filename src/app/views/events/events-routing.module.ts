import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { EventsComponent } from './events.component';
import { UpdateEventComponent } from './update-event/update-event.component';

const routes: Routes = [
  { 
    path: '', 
    data:{
      title: 'Events'
    },
    children:[
      {
        path: '',
        component: EventsComponent,
      },
      {
        path: 'AddEvent',
        component: AddEventComponent,
        data:{
          title: 'Add Event'
        }
      },
      {
        path: 'UpdateEvent',
        component: UpdateEventComponent,
        data:{
          title: 'Update Event'
        }
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
