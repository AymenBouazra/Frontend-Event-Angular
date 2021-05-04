import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  baseUrl:string=environment.baseUrl

  constructor(private http:HttpClient) { }
  events(eventData){
    return this.http.post(`${this.baseUrl}/events`,eventData)
  }
  getAllEvents(){
    return this.http.get(`${this.baseUrl}/events`)
  }
  getEventById(id:number){
    return this.http.get(`${this.baseUrl}/events/${id}`)
  }
  updateEventsDataById(updateEventData:any,id:number){
    return this.http.put(`${this.baseUrl}/events/${id}`,updateEventData)
  }
  deleteEventById(id:number){
    return this.http.delete(`${this.baseUrl}/events/${id}`)
  }
  getAllTags()
  {
   return this.http.get(`${this.baseUrl}/tags`)
  }
}
