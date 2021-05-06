import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl:string=environment.baseUrl
  constructor(private http: HttpClient) { }
  postCompany(companyData: any) {
    return this.http.post(`${this.baseUrl}/company`, companyData)
  }
  getcompanyByid(id: number) {
    return this.http.get(`${this.baseUrl}/company` + id)
  };
  getAllCompnanies() {
    return this.http.get(`${this.baseUrl}/company`)
  };
  updateCompanyDataById(updatecompanyData: any, id: any) {
    return this.http.put(`${this.baseUrl}/company` + id, updatecompanyData)
  }
  deleteCompanyById(id: number) {
    return this.http.delete(`${this.baseUrl}/company` + id)
  };
}
