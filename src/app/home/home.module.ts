import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { EventsComponent } from './events/events.component';
import { ContactComponent } from './contact/contact.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardEventComponent } from './events/card-event/card-event.component';
import { EventInfoComponent } from './events/event-info/event-info.component';
import { ReservationComponent } from './events/reservation/reservation.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    EventsComponent,
    ContactComponent,
    IndexComponent,
    HomeComponent,
    CardEventComponent,
    EventInfoComponent,
    ReservationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
