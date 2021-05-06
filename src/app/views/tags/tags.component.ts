import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
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
  showUpdateButton = false;
  submitted=false;
  modalTitle:string='Add tag'
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
  }
  addTag() {
    this.submitted = true
    if (this.tagForm.invalid) {
      this.toastr.warning( 'Please complete tag informations.','Tag not added!');
      return;
    }
    this.tag.tags(this.tagForm.value).subscribe((response: any) => {
      this.toastr.success( 'New tag succesfully added.','Tag added !');
      this.hide();
      this.ngOnInit();
    },
      (error) => {
        console.log(error);
        this.toastr.error(this.tagForm.value.title+'  already exists, please enter an other tag.','Add failed !');
      })
  }

  delete(id:number){    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this tag!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#f00',
      cancelButtonColor:'#D8D8D8',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.tag.deleteTagById(id).subscribe((response:any)=>{
          this.toastr.error( 'Tag succesfully deleted.','Tag deleted !');;
          this.ngOnInit()},(error)=>{})
        console.log(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Tag is not deleted',
          'error'
        )
      }
    })
  }
  showAdd(){
    this.modal.show()
    this.showUpdateButton = false;
  }
  showUpdate(id:number) {
    this.showUpdateButton = true;
    this.modalTitle='Update tag'
    this.tagId=id
    this.modal.show()
    this.tag.getTagsById(id).subscribe((response:any)=>{
      this.tagForm.patchValue(response);
      this.ngOnInit()
    },(error)=>{

    })
  }
  hide(){
    this.modal.hide();
    this.modalTitle='Add tag'
    this.tagForm.reset()
    this.submitted= false;
  }
  updateTag(){
    this.submitted=true;
    if(this.tagForm.invalid){
      this.toastr.warning( 'Please complete tag information.','Tag not updated!');
      return;
    }
    this.tag.updateTagsDataById(this.tagForm.value,this.tagId).subscribe((response:any)=>{
      this.toastr.success( 'Tag succesfully updated.','Tag updated !');
      this.hide();
      this.ngOnInit();
    },(error)=>{

    })
  }
}
