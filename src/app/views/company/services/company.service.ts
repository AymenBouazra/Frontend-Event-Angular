import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  updateCompanyDataByid(updatecompanyData: any, id: any) {
    return this.http.put("http://localhost:3000/company/"+id,updatecompanyData)
  }
  DeleteCompanyById(i: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }
  postCompany(companyData:any)
  {
   return this.http.post("http://localhost:3000/company",companyData)
  }
  getcompanyByid(id:number){
    return this.http.get("http://localhost:3000/company/"+id)
  };
  getAllCompnanies(){
    return this.http.get("http://localhost:3000/company")
  };
  deleteCompanyById(id:number){
    return this.http.delete("http://localhost:3000/company/"+id)
  };
}
