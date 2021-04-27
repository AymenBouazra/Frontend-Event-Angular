import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TagService {
baseUrl:string=environment.baseUrl
  constructor( private http:HttpClient) { }
  // isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  tags(tagData){
    return this.http.post(this.baseUrl+"/tags", tagData)
  }
  getAllTags()
  {
   return this.http.get(`${this.baseUrl}/tags`)
  }

  getTagsById(id:number){
    return this.http.get(`${this.baseUrl}/tags/${id}`)
  }

  updateTagsDataById(updateTagData:any,id:number)
  {
    return this.http.put(`${this.baseUrl}/tags/${id}`, updateTagData)
  }

 
  deleteTagById(id:number)
  {
    return this.http.delete(`${this.baseUrl}/tags/${id}`)
  }
}
