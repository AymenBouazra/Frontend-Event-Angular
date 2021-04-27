import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { TagService } from './services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})

export class TagsComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  searchText:string;
  listTagsTodo: any;
  tagId:any;
  
  submitted=false
  tagForm: FormGroup = new FormGroup({
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
  this.tagId=this.route.snapshot.params['id']; 
  }
  addTag() {
    this.submitted = true
    if (this.tagForm.invalid) {
      return;
    }
    this.tag.tags(this.tagForm.value).subscribe((response: any) => {
      this.toastr.success( 'New tag succesfully added.','Tag added !');
      this.ngOnInit()
    },
      (error) => {
        console.log(error);
        this.toastr.error(this.tagForm.value.title+'  already exists, please enter an other tag.','Add failed !');
      })
  }

  delete(id:number){    
    this.tag.deleteTagById(id).subscribe((response:any)=>{this.ngOnInit()},(error)=>{})
    console.log(id);
    
  }
  show(id:number) {
    this.modal.show()
    this.tag.getTagsById(id).subscribe((response:any)=>{this.tagForm.patchValue(response),this.ngOnInit()},(error)=>{})
    
  }
  hide(){
    this.modal.hide()
  }
  updateTag(){
    this.submitted=true;
    // this.tag.updateTagsDataById(this.tagUpdateForm.value,this.toDoId).subscribe((response:any)=>{},(error)=>{})

  }
  
}
