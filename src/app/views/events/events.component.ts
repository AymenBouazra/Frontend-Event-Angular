import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from './services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css',
    '../../../scss/vendors/bs-datepicker/bs-datepicker.scss',
    '../../../scss/vendors/ng-select/ng-select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @ViewChild('dp') public dp: BsDatepickerModule;
  searchText: string;
  listEvents: any;
  eventId: any;
  showUpdateButton = false;
  submitted = false;
  modalTitle: string = 'Add event'
  eventForm: FormGroup = new FormGroup({
    eventName: new FormControl('', [Validators.required]),
    eventDescription: new FormControl('', [Validators.required]),
    eventType: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    availableTicketNumber: new FormControl('', [Validators.required, Validators.min(1)]),
    price: new FormControl('', []),
    starDateTime: new FormControl(new Date(), [Validators.required]),
    endDateTime: new FormControl(new Date(), [Validators.required]),
  });
  minStartDate = new Date();
  minEndDate = new Date();
  startValue: Date = new Date();
  endValue: Date = new Date();

  constructor(
    private eventService: EventsService,
    private toastr: ToastrService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {


    this.eventService.getAllEvents().subscribe((response) => {
      this.listEvents = response
    }, (error) => {
      console.log(error);

    })

    this.eventForm.controls.eventType.valueChanges.subscribe(newvalue => {
      if (newvalue == 'Paid') {
        this.eventForm.controls.price.setValidators([Validators.required, Validators.min(1)])
      } else {
        this.eventForm.controls.price.setValidators([]);
        this.eventForm.controls.price.reset();
      }
    });
    this.eventForm.controls.starDateTime.valueChanges.subscribe(newvalue => {
      this.endValue = newvalue;
      this.minEndDate = newvalue;
    })
  }
  addEvent() {
    this.submitted = true
    if (this.eventForm.invalid) {
      return;
    }
    this.eventService.events(this.eventForm.value).subscribe((response: any) => {
      this.toastr.success('New event succesfully added.', 'Event added !');
      this.hide();
      this.ngOnInit();
    }, (error) => {
      console.log(error);
    })
  }
  deleteEvent(id: number) {
    this.eventService.deleteEventById(id).subscribe((response: any) => {
      this.ngOnInit()
    }, (error) => {
      console.log(error);

    })
  }
  showAdd() {
    this.modal.show();
    this.showUpdateButton = false;
  }
  showUpdate(id: number) {
    this.showUpdateButton = true;
    this.modalTitle = 'Update event';
    this.eventId = id;
    this.modal.show();
    this.eventService.getEventById(id).subscribe((response: any) => {
      const startEvent: string = this.datePipe.transform(response.starDateTime, 'MM/dd/yyyy');
      const endEvent: string = this.datePipe.transform(response.endDateTime, 'MM/dd/yyyy');
      response.endDateTime = endEvent
      response.starDateTime = startEvent
      this.eventForm.patchValue(response);
      this.ngOnInit();
    }, (error) => { })
  }
  hide() {
    this.modal.hide();
    this.modalTitle = 'Add event';
    this.eventForm.reset();
    this.submitted = false;
  }
  updateEvent() {
    this.submitted = true;
    this.eventService.updateEventsDataById(this.eventForm.value, this.eventId).subscribe((response: any) => {
      this.hide();
      this.ngOnInit();
    }, (error) => { })
  }
}
