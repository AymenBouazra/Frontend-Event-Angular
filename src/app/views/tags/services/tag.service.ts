import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor( private http:HttpClient) { }
  // isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  tags(tagData){
    return this.http.post("http://localhost:3000/tags",tagData)
  }
  getAllTags()
  {
   return this.http.get("http://localhost:3000/tags")
  }

  getTagsById(id:number){
    return this.http.get("http://localhost:3000/tags/"+id)
  }

  updateTagsDataById(updateTagData:any,id:number)
  {
    return this.http.put("http://localhost:3000/tags/"+id,updateTagData)
  }

 
  deleteTagById(id:number)
  {
    return this.http.delete("http://localhost:3000/tags/"+id)
  }
}
