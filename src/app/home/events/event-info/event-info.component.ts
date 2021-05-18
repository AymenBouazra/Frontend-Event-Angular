import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {
  detailId:any;
  details:any

  constructor(private route: ActivatedRoute, private eventService:  HomeService) { }

  ngOnInit(): void {
    this.detailId = this.route.snapshot.params['id'];
    this.eventService.getEventById(this.detailId).subscribe((response)=>{
      this.details = response
      
    },(error) => {
      console.log(error);

    })
    
  }

}
