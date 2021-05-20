import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from './services/events.service';
import { IOption } from 'ng-select';
import Swal from 'sweetalert2';
import { SweetAlertService } from '../../providers/sweet-alert.service';

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
  eventForm: FormGroup
  file:any;

  // DatePicker
  minStartDate = new Date();
  minEndDate = new Date();
  startValue: Date = new Date();
  endValue: Date = new Date();
  minStartTime : Date = new Date();
  minEndTime = new Date();

  // TimePicker
  public hstep: number = 1;
  public mstep: number = 1;
  public ismeridian: boolean = false;
  public isEnabled: boolean = true;
  startTime: Date = new Date();
  endTime: Date = new Date();

  public tags: Array<IOption> = [];

  constructor(
    private eventService: EventsService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private sweetAlert:SweetAlertService) {
  }
  imageSrc: string = '';

  ngOnInit(): void {
    this.eventForm= new FormGroup({
      eventName: new FormControl('', [Validators.required]),
      eventDescription: new FormControl('', [Validators.required]),
      eventType: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      availableTicketNumber: new FormControl('', [Validators.required, Validators.min(1)]),
      price: new FormControl('', []),
      startDate: new FormControl(new Date(), [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endDate: new FormControl(new Date(), [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      photo: new FormControl('',Validators.required),
      tags: new FormControl('')
    });
    this.eventService.getAllEvents().subscribe((response) => {
      this.listEvents = response 
    }, (error) => {
      console.log(error);
    })
    this.eventService.getAllTags().subscribe((response: any)=>{
      this.tags = response;
    },(error)=>{})
    this.eventForm.controls.eventType.valueChanges.subscribe(newvalue => {
      if (newvalue == 'Paid') {
        this.eventForm.controls.price.setValidators([Validators.required, Validators.min(1)])
      } else {
        this.eventForm.controls.price.setValidators([]);
        this.eventForm.controls.price.reset();
      }
    });
    this.eventForm.controls.startDate.valueChanges.subscribe(newvalue => {
      if (newvalue != null) {
        const newStartTime = new Date(this.eventForm.value.startTime);
        newStartTime.setDate(newvalue.getDate());
        newStartTime.setMonth(newvalue.getMonth());
        newStartTime.setFullYear(newvalue.getFullYear());
        this.minStartTime.setDate(newvalue.getDate());
        this.minStartTime.setMonth(newvalue.getMonth());
        this.minStartTime.setFullYear(newvalue.getFullYear());
        this.eventForm.controls.startTime.setValue(newStartTime)
        
        this.endValue = newvalue;
        this.minEndDate = newvalue;
        
        // compare with  current Date
        const startDateEvent: string = this.datePipe.transform(newvalue, 'MM/dd/yyyy');
        const currentDate : string = this.datePipe.transform(new Date, 'MM/dd/yyyy');
        // const currentTime : string = this.datePipe.transform(new Date, 'HH:mm')
        if (startDateEvent == currentDate) {
          this.minStartTime.setHours(new Date().getHours())
          this.minStartTime.setMinutes(new Date().getMinutes())
        }else{
          this.minStartTime.setHours(0o0)
          this.minStartTime.setMinutes(0o0)
        }
        // console.log(this.minStartTime);SS
        
      }
    })
    this.eventForm.controls.endDate.valueChanges.subscribe(newvalue =>{
      if (newvalue != null) {
        const newEndTime = new Date(this.eventForm.value.endTime);
        newEndTime.setDate(newvalue.getDate());
        newEndTime.setMonth(newvalue.getMonth());
        newEndTime.setFullYear(newvalue.getFullYear());
        this.eventForm.controls.endTime.setValue(newEndTime)
      }
    })
  }

  onFileSelect(event) {
    this.file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    let pattern = /image-*/;
    if (this.file) {
      if (!this.file.type.match(pattern)) {
        this.toastr.error('Please select an iamge file.', 'File not valid!');
        return;
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onloadend = () => {
          const base64String = (<string>reader.result).replace("data:", "").replace(/^.+,/, "");
          this.eventForm.controls.photo.setValue("data:image/jpeg;base64," + base64String.toString())
        };
      }
    }
  }

  addEvent() {
    this.submitted = true
    if (this.eventForm.invalid) {
      this.toastr.warning('Please complete event information.', 'Event not added!');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.eventForm.get('photo').value);
    this.eventService.events(this.eventForm.value).subscribe((response: any) => {
      this.toastr.success('New event successfully added. ', 'Event added!');
      this.hide();
      this.ngOnInit();
    }, (error) => {
      console.log(error);
    })
  }
  deleteEvent(id: number) {
    this.sweetAlert.deleteConfirmation('event').then((result) => {
      if (result.value) {
        this.eventService.deleteEventById(id).subscribe((response: any) => {
          this.toastr.error('Event deleted susccessfully. ', 'Event deleted!');
          this.ngOnInit()
        }, (error) => {
          console.log(error);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Event is not deleted',
          'error'
        )
      }
    }) 
  }

  showAdd() {
    this.modalTitle="Add event"
    this.ngOnInit()
    this.modal.show();
    this.showUpdateButton = false;
  }

  showUpdate(id: number) {
    this.showUpdateButton = true;
    this.modalTitle = 'Update event';
    this.eventId = id;
    this.modal.show();
    this.eventService.getEventById(id).subscribe((response: any) => {
      const startDateEvent = this.datePipe.transform(response.startDate, 'MM/dd/yyyy');
      const endDateEvent = this.datePipe.transform(response.endDate, 'MM/dd/yyyy');
      const startTimeEvent = this.datePipe.transform(response.startTime, 'HH:mm');
      const endTimeEvent = this.datePipe.transform(response.endTime, 'HH:mm');
      response.endDate = endDateEvent
      response.startDate = startDateEvent
      response.startTime = startTimeEvent
      response.endTime = endTimeEvent;
      this.imageSrc = response.photo
      this.eventForm.patchValue(response);
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
    if (this.eventForm.invalid) {
      this.toastr.warning('Please complete event information. ', 'Event not updated!');
      return;
    }
    this.eventService.updateEventsDataById(this.eventForm.value, this.eventId).subscribe((response: any) => {
      this.toastr.success('Event updated successfully. ', 'Event updated!');
      this.hide();
      this.ngOnInit();
    }, (error) => { })
  }
}
