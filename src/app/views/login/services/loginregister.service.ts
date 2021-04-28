import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginregisterService {
  baseUrl:string=environment.baseUrl
  constructor(private http:HttpClient) { }
  registerCompany(companyData:any)
  {
   return this.http.post(`${this.baseUrl}/register`,companyData)
  }
  getCompanyById(id:number){
    return this.http.get(`${this.baseUrl}/register`+id)
  };
  loginCompany(companyData:any)
  {
   return this.http.post(`${this.baseUrl}/login`,companyData)
  }
  forgotPassoword(email:any){
    return this.http.post(`${this.baseUrl}/forgot-password`,email)
  }

}
