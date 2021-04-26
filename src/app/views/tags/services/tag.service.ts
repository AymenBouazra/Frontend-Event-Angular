import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor( private http:HttpClient) { }
  tags(tagData){
    return this.http.post("http://localhost:3000/tags",tagData)
  }
}
