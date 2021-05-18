import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl:string=environment.baseUrl
  constructor( private http : HttpClient) { }

  dashboardCharts() {
    return this.http.get(`${this.baseUrl}/dashboard`)
  }

}
