import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginregisterService {

  constructor(private http:HttpClient) { }
  registerCompany(companyData:any)
  {
   return this.http.post("http://localhost:3000/register",companyData)
  }
  getCompanyById(id:number){
    return this.http.get("http://localhost:3000/register"+id)
  };
  loginCompany(companyData:any)
  {
   return this.http.post("http://localhost:3000/login",companyData)
  }

}
