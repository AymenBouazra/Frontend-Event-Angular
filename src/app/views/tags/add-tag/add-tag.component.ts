import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {
  submitted=false
  tagForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
  });
  constructor(private tag:TagService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  addTag() {
    this.submitted = true
    if (this.tagForm.invalid) {
      return;
    }
    this.tag.tags(this.tagForm.value).subscribe((response: any) => {
      this.toastr.success( 'New tag succesfully added.','Tag added !');
      
    },
      (error) => {
        console.log(error);
        this.toastr.error(this.tagForm.value.title+'  alreay exists, please enter an other tag.','Add failed !');
      })
  }
}
