import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl:string=environment.baseUrl
  constructor(private http:HttpClient) { }
  getEvents(){
    return this.http.get(`${this.baseUrl}/all-events`)
  }
  getEventById(id:number){
    return this.http.get(`${this.baseUrl}/event-detail/${id}`)
  }
}
