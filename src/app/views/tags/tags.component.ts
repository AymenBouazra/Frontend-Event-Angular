import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TagService } from './services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  searchText:string;
  listTagsTodo: any;
  currentDate= new Date;
  toDoId:any;
  
  addSubmitted=false
  tagAddForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required])
  });

  updateSubmitted=false
  tagUpdateForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required])
  });

  constructor(private tag:TagService , private router:Router, private route:ActivatedRoute, private toastr:ToastrService) { } 
  
  ngOnInit(): void { 
    this.tag.getAllTags().subscribe((response)=>{
    this.listTagsTodo=response
    
  },(error)=>{
    console.log(error);
  })
  this.toDoId=this.route.snapshot.params['id']; 
  this.showData()
  }
  addTag() {
    this.addSubmitted = true
    if (this.tagAddForm.invalid) {
      return;
    }
    this.tag.tags(this.tagAddForm.value).subscribe((response: any) => {
      this.toastr.success( 'New tag succesfully added.','Tag added !');
      this.ngOnInit()
    },
      (error) => {
        console.log(error);
        this.toastr.error(this.tagAddForm.value.title+'  already exists, please enter an other tag.','Add failed !');
      })
  }

  delete(id:number){    
    this.tag.deleteTagById(id).subscribe((response:any)=>{this.ngOnInit()},(error)=>{})
    console.log(id);
    
  }
  showData() {
    // this.tag.getTagsById(this.toDoId).subscribe((response:any)=>{this.tagUpdateForm.patchValue(response),this.ngOnInit()},(error)=>{})
    
  }
  updateTag(){
    this.updateSubmitted=true;
    // this.tag.updateTagsDataById(this.tagUpdateForm.value,this.toDoId).subscribe((response:any)=>{},(error)=>{})

  }
  
}
