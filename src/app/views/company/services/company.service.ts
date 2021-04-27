import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }
  postCompany(companyData:any)
  {
   return this.http.post("http://localhost:3000/register",companyData)
  }
  getCompanyById(id:number){
    return this.http.get("http://localhost:3000/register"+id)
  };
  getAllCompnanies(){
    return this.http.get("http://localhost:3000/register")
  };
}
