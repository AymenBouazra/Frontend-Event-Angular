import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  Count:any
  eventCount:any;
  tagCount:any;
  companyCount:any;
  reservationCount:any;
  constructor (private dashboard:DashboardService){}

  ngOnInit(): void {
    this.dashboard.dashboardCharts().subscribe((response)=>{
      this.Count = response;
    })
  }
  
}
