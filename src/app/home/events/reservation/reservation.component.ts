import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  submitted = false;
  reservationForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tickets: new FormArray([])
  });
  reservId:any;
  reserv:any;
  constructor(private route: ActivatedRoute, private reservService:  HomeService) { }

  ngOnInit(): void {
    this.reservId = this.route.snapshot.params['id'],
    this.reservService.getEventById(this.reservId).subscribe((response)=>{
      this.reserv = response
    },(error)=>{
      console.log(error);
      
    })
  }
  get getTickets(): FormArray{
    return this.reservationForm.get('tickets') as FormArray
  }
  addRow(){
    this.getTickets.push(new FormGroup({
      reservedfName: new FormControl('',[Validators.required]),
      reservedlName: new FormControl('',[Validators.required]),
      reservedEmail: new FormControl('',[Validators.required, Validators.email])
    }))
  }
  removeRow(i: number){
    this.getTickets.removeAt(i)
  }
  checkOut(){
    this.submitted = true;
    if (this.reservationForm.invalid) {
      return;
    }
  }
}
