import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl:string=environment.baseUrl
  constructor(private http :HttpClient) { }
  contacts(contactData){
    return this.http.post(`${this.baseUrl}/contact`,contactData)
  }
}
