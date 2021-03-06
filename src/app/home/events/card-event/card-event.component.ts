import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.css']
})
export class CardEventComponent implements OnInit {
  listEvents: any;

  constructor(private toastr: ToastrService, private eventService:  HomeService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((response) => {
      this.listEvents = response
      
    }, (error) => {
      console.log(error);

    })
  
  }

}
