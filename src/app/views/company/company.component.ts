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
  constructor(private router: Router, private CompanyService: CompanyService) { }

  ngOnInit(): void {
    this.company= this.company.getAllCompnanies();
  }

  deletecompany(i){

    this.company.DeleteCompanyById(i);
    this.company= this.company.getAllCompnanies();
    
  }
  

}