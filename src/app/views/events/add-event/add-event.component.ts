import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  submitted = false;
  eventForm: FormGroup = new FormGroup({
    eventName: new FormControl('', [Validators.required]),
    eventDescription: new FormControl('', [Validators.required]),
    eventType: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    availableTicketNumber: new FormControl('', [Validators.required,Validators.min(1)]),
    price: new FormControl('',[]),
    // starDateTime: new FormControl('',[Validators.required]),
    // endDateTime: new FormControl('',[Validators.required]),
  });
  minDate = new Date();
  bsValue: Date = new Date();
  // bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
  constructor() { }

  ngOnInit(): void {
    this.eventForm.controls.eventType.valueChanges.subscribe(newvalue =>{
      if (newvalue == 'Paid'){
        this.eventForm.controls.price.setValidators([Validators.required,Validators.min(1)])
      }else{
        this.eventForm.controls.price.setValidators([]);
        this.eventForm.controls.price.reset();
      }
    });
    
  }

  AddEvent(){
    this.submitted = true;
    if (this.eventForm.invalid) {
      return;
    }
    console.log(this.eventForm.value);
  }

}
