import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from './services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  currentDate= new Date;
  searchText:any;
  company:any;
  
  constructor(private router: Router, private companyService: CompanyService) { }

  ngOnInit(): void {
     this.companyService.getAllCompnanies().subscribe(response => {
       this.company = response ;
     });
  }
  deletecompany(i:number){

    this.companyService.deleteCompanyById(i).subscribe(response => {
     this.ngOnInit();
    });
    
    
  }
  

}