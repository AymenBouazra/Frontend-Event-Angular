import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { SelectModule } from 'ng-select';
import { SearchPipe } from './pipes/search.pipe';
// import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    EventsComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SelectModule,
    // NgSelectModule 
   ],
  providers: [DatePipe],
})
export class EventsModule { }
